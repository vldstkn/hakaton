package products

import (
	"hakaton/internal/di"
	"hakaton/internal/domain"
)

type Service struct {
	Repository di.IProductsRepository
}

type ServiceDeps struct {
	Repository di.IProductsRepository
}

func NewService(deps *ServiceDeps) *Service {
	return &Service{
		Repository: deps.Repository,
	}
}

func (service *Service) AddMultiple(products []domain.Product) error {
	err := service.Repository.AddMultiple(products)
	return err
}
