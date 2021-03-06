package main

import (
	"github.com/rg-km/final-project-engineering-13/config"
	"github.com/rg-km/final-project-engineering-13/handler"
	"github.com/rg-km/final-project-engineering-13/repository"
	"github.com/rg-km/final-project-engineering-13/route"
	"github.com/rg-km/final-project-engineering-13/service"
)

func main() {
	db, err := config.GetConnection()
	if err != nil {
		panic(err)
	}

	defer db.Close()

	router := route.Newrouter(
		handler.NewAuthHandler(service.NewAuthService(repository.NewUserRepo(db))),
		handler.NewUserHandler(service.NewUserService(repository.NewUserRepo(db))),
		handler.NewEventHandler(service.NewEventService(repository.NewEventRepository(db), repository.NewCategoriesEventRepository(db), repository.NewTypeEventRepository(db), repository.NewModelRepository(db))),
	)
	router.Run(":8090")
}
