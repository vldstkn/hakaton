package di

import (
	"hakaton/internal/domain"
)

type IProductsService interface {
	AddMultiple(products []domain.Product, vectors [][]float32) error
	GetRecom(id, catId int) ([]domain.Product, error)
	GetAll() []domain.Product
}

type IProductsRepository interface {
	AddMultiple(products []domain.Product) error
	GetRecom(id, catId int) ([]domain.Product, error)
	GetById(id int) *domain.Product
	GetAll() []domain.Product
}
