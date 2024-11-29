package di

import (
	"hakaton/internal/domain"
)

type IProductsService interface {
	AddMultiple(products []domain.Product) error
}

type IProductsRepository interface {
	AddMultiple(products []domain.Product) error
}
