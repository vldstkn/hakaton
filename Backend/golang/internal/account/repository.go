package account

import (
	"hakaton/internal/domain"
	"hakaton/pkg/db"
)

type Repository struct {
	DB *db.DB
}

func NewRepository(database *db.DB) *Repository {
	return &Repository{
		DB: database,
	}
}

func (repo *Repository) FindByEmail(email string) *domain.User {
	var user domain.User
	err := repo.DB.Get(&user, "SELECT * FROM Users WHERE email=$1", email)
	if err != nil {
		return nil
	}
	return &user
}
func (repo *Repository) Create(user *domain.User) (int, error) {
	var id int
	err := repo.DB.QueryRow("INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id",
		user.Email, user.Password, user.Name).Scan(&id)

	if err != nil {
		return -1, err
	}

	return id, nil
}

func (repo *Repository) GetProfileById(id int) *domain.User {
	var user domain.User
	err := repo.DB.Get(&user, "SELECT id, created_at, updated_at, email, name FROM Users WHERE id=$1", id)
	if err != nil {
		return nil
	}
	return &user
}
