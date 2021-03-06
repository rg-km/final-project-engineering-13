package service

import (
	"errors"

	"github.com/dgrijalva/jwt-go"
	"github.com/rg-km/final-project-engineering-13/config"
	"github.com/rg-km/final-project-engineering-13/entity"
	"github.com/rg-km/final-project-engineering-13/payloads"
	"github.com/rg-km/final-project-engineering-13/repository"
)

type EventServiceImpl struct {
	eventRepo      repository.EventRepoInterface
	categoriesRepo repository.CategoryEventRepoInterface
	typeEventRepo  repository.TypeEventRepoInterface
	modelEventRepo repository.ModelRepoInterface
}

func NewEventService(eventRepo repository.EventRepoInterface, categoriesRepo repository.CategoryEventRepoInterface, typeEventRepo repository.TypeEventRepoInterface, modelEventRepo repository.ModelRepoInterface) *EventServiceImpl {
	return &EventServiceImpl{eventRepo, categoriesRepo, typeEventRepo, modelEventRepo}
}

func (e *EventServiceImpl) Validate(event payloads.EventRequest) error {

	if event.Title == "" || event.Content == "" || event.CategoryID == 0 || event.TypeEventID == 0 || event.ModelID == 0 {
		return errors.New("INVALID_DATA")
	}

	_, err := e.categoriesRepo.GetCategoryByID(int(event.CategoryID))
	if err != nil {
		return errors.New("CATEGORY_NOT_FOUND")
	}

	_, err = e.typeEventRepo.GetTypeByID(int(event.TypeEventID))
	if err != nil {
		return errors.New("TYPE_EVENT_NOT_FOUND")
	}

	_, err = e.modelEventRepo.GetModelByID(int(event.ModelID))
	if err != nil {
		return errors.New("MODEL_NOT_FOUND")
	}

	return nil
}

func (e *EventServiceImpl) Create(event payloads.EventRequest) error {
	err := e.Validate(event)
	if err != nil {
		return errors.New("EVENT_NOT_VALID")
	}

	err = e.eventRepo.Create(&event)
	if err != nil {
		return errors.New("EVENT_CREATE_FAILED")
	}

	return nil
}

func (e *EventServiceImpl) Update(event payloads.EventUpdateRequest) error {
	var eventData payloads.EventRequest
	id := event.ID

	eventData = payloads.EventRequest{
		Title:           event.Title,
		BannerImg:       event.BannerImg,
		Content:         event.Content,
		CategoryID:      event.CategoryID,
		StartTimeEvent:  event.StartTimeEvent,
		Contact:         event.Contact,
		Price:           event.Price,
		TypeEventID:     event.TypeEventID,
		ModelID:         event.ModelID,
		LocationDetails: event.LocationDetails,
		RegisterUrl:     event.RegisterUrl,
	}

	err := e.Validate(eventData)
	if err != nil {
		return err
	}

	err = e.eventRepo.Update(id, &event)
	if err != nil {
		return errors.New("EVENT_UPDATE_FAILED")
	}

	return nil
}

func (e *EventServiceImpl) Delete(eventId int64) error {
	data, err := e.eventRepo.ById(eventId)
	if err != nil || data.ID != eventId {
		return errors.New("EVENT_NOT_FOUND")
	}

	err = e.eventRepo.Delete(eventId)
	if err != nil {
		return errors.New("EVENT_DELETE_FAILED")
	}

	return nil
}

func (e *EventServiceImpl) GetAuthorID(token string) (int, error) {
	claims := &payloads.UserDetailClaims{}
	tkn, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(config.Configuration.JWT_SECRET), nil
	})
	if err != nil {
		return 0, err
	}

	authorData, ok := tkn.Claims.(*payloads.UserDetailClaims)
	if !ok {
		return 0, err
	}
	return authorData.ID, nil
}

func (e *EventServiceImpl) GetAll() ([]*entity.ListEvent, error) {
	result, err := e.eventRepo.GetAll()
	if err != nil {
		return nil, errors.New("NOT_FOUND")
	}

	return result, nil
}

func (e *EventServiceImpl) GetByCategory(category_id int64) ([]*entity.ListEvent, error) {
	result, err := e.eventRepo.GetByCategory(category_id)
	if err != nil {
		return nil, errors.New("NOT_FOUND")
	}

	return result, nil
}

func (e *EventServiceImpl) GetByModel(model_id int64) ([]*entity.ListEvent, error) {
	result, err := e.eventRepo.GetByModel(model_id)
	if err != nil {
		return nil, errors.New("NOT_FOUND")
	}

	return result, nil
}

func (e *EventServiceImpl) GetByAuthor(authorId int64) ([]*entity.ListEvent, error) {
	result, err := e.eventRepo.GetByAuthor(authorId)
	if err != nil {
		return nil, errors.New("EVENT_NOT_FOUND")
	}

	return result, nil
}

func (e *EventServiceImpl) GetByID(id int64) (*entity.ListEvent, error) {
	result, err := e.eventRepo.GetByID(id)
	if err != nil {
		return nil, errors.New("EVENT_NOT_FOUND")
	}

	return result, nil
}

func (e *EventServiceImpl) GetAllCategory() ([]entity.Category_Event, error) {
	result, err := e.categoriesRepo.GetCategory()
	if err != nil {
		return nil, errors.New("CATEGORIES_NOT_FOUND")
	}

	return result, nil
}

func (e *EventServiceImpl) GetAllTypeEvent() ([]entity.Type_Event, error) {
	result, err := e.typeEventRepo.GetTypes()
	if err != nil {
		return nil, errors.New("TYPE_EVENT_NOT_FOUND")
	}

	return result, nil
}

func (e *EventServiceImpl) GetAllModel() ([]entity.Model, error) {
	result, err := e.modelEventRepo.GetModels()
	if err != nil {
		return nil, errors.New("MODELS_NOT_FOUND")
	}

	return result, nil
}

func (e *EventServiceImpl) Search(keyword string) ([]*entity.ListEvent, error) {
	result, err := e.eventRepo.Search(keyword)
	if err != nil {
		return nil, errors.New("EVENT_NOT_FOUND")
	}

	return result, nil
}
