package products

import (
	"github.com/pgvector/pgvector-go"
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

func (service *Service) AddMultiple(products []domain.Product, vectors [][]float32) error {
	var productsWithVectors []domain.Product

	for i, vector := range vectors {
		productsWithVectors = append(productsWithVectors, domain.Product{
			Id:            products[i].Id,
			CreatedAt:     products[i].CreatedAt,
			UpdatedAt:     products[i].UpdatedAt,
			Name:          products[i].Name,
			Description:   products[i].Description,
			Price:         products[i].Price,
			Link:          products[i].Link,
			NumberReviews: products[i].NumberReviews,
			Rating:        products[i].Rating,
			Embedding:     pgvector.NewVector(vector),
		})
	}

	err := service.Repository.AddMultiple(productsWithVectors)
	return err
}
