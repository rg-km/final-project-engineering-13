package repository

import (
	"database/sql"
	"errors"
	"time"

	"github.com/rg-km/final-project-engineering-13/entity"
	"github.com/rg-km/final-project-engineering-13/payloads"
)

type UserRepo struct {
	db *sql.DB
}

func NewUserRepo(db *sql.DB) UserRepository {
	return &UserRepo{db}
}

func (u *UserRepo) GetUser() ([]entity.User, error) {
	return nil, nil
}

func (u *UserRepo) GetUserByID(id int) (entity.User, error) {
	user := entity.User{}
	row := u.db.QueryRow("SELECT id, username, first_name, last_name, email, password, contact, photo FROM users WHERE id = ?", id)
	err := row.Scan(
		&user.ID,
		&user.Username,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.Contact,
		&user.Photo)
	if err != nil {
		return user, err
	}

	return user, nil
}

func (u *UserRepo) GetUserByUsername(username string) (entity.User, error) {
	user := entity.User{}
	row := u.db.QueryRow("SELECT id, username, first_name, last_name, email, password, contact, photo FROM users WHERE username = ?", username)
	err := row.Scan(
		&user.ID,
		&user.Username,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.Contact,
		&user.Photo)
	if err != nil {
		return user, err
	}

	return user, nil
}

func (u *UserRepo) GetUserByEmail(email string) (entity.User, error) {
	user := entity.User{}
	row := u.db.QueryRow("SELECT id, username, first_name, last_name, email, password, contact, photo FROM users WHERE email = ?", email)
	err := row.Scan(
		&user.ID,
		&user.Username,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.Contact,
		&user.Photo)
	if err != nil {
		return user, err
	}

	return user, nil
}

func (u *UserRepo) CreateUser(user payloads.CreateRequest) error {
	_, err := u.db.Exec("INSERT INTO users (username, first_name, last_name, email, password, contact, photo, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
		user.Username,
		user.FirstName,
		user.LastName,
		user.Email,
		user.Password,
		"",
		"",
		time.Now(),
		time.Now())
	if err != nil {
		return err
	}

	return nil
}

func (u *UserRepo) UpdateUser(user payloads.UpdateRequest, idUser int) error {
	_, err := u.db.Exec("UPDATE users SET username = ?, first_name = ?, last_name = ?, email = ?, contact = ?, updated_at = ? WHERE id = ?",
		user.Username,
		user.FirstName,
		user.LastName,
		user.Email,
		user.Contact,
		time.Now(),
		idUser)
	if err != nil {
		return errors.New("Error updating user" + err.Error())
	}

	return nil
}

func (u *UserRepo) UpdatePassword(id int, passwordReq string) error {
	_, err := u.db.Exec("UPDATE users SET password = ? WHERE id = ?", passwordReq, id)
	if err != nil {
		return errors.New("Error updating password" + err.Error())
	}

	return nil
}

func (u *UserRepo) UpdatePhoto(id int, photo string) error {
	_, err := u.db.Exec("UPDATE users SET photo = ? WHERE id = ?", photo, id)
	if err != nil {
		return errors.New("Error updating photo, " + err.Error())
	}

	return nil
}

func (u *UserRepo) DeleteUser(id int) error {
	_, err := u.db.Exec("DELETE FROM users WHERE id = ?", id)
	if err != nil {
		return err
	}

	return nil
}
