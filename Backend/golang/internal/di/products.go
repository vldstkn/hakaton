package di

import (
	"hakaton/internal/domain"
)

type IProductsService interface {
	AddMultiple(products []domain.Product, vectors [][]float32) error
	GetRecom(userId int) ([]domain.Product, error)
	GetAll() []domain.Product
	GetFavoriteByUserId(id int) ([]domain.Product, error)
	SetFavorite(userId, prodId int) (bool, error)
	GetBySearch(search string) []domain.Product
}

type IProductsRepository interface {
	AddMultiple(products []domain.Product) error
	GetRecom(inputProducts []domain.Product) ([]domain.Product, error)
	GetById(id int) *domain.Product
	GetAll() []domain.Product
	GetFavoriteByUserId(id int) []domain.Product
	AddFavorite(userId, prodId int) (bool, error)
	RemoveFavorite(userId, prodId int) (bool, error)
	FindFavorite(userId, prodId int) bool
	GetBySearch(words []string) []domain.Product
}
