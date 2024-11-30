package products

import (
	"errors"
	"github.com/pgvector/pgvector-go"
	"hakaton/internal/di"
	"hakaton/internal/domain"
	"strings"
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

func (service *Service) GetRecom(id, cat_id int) ([]domain.Product, error) {
	product := service.Repository.GetById(id)
	if product == nil {
		return []domain.Product{}, errors.New("product not exists")
	}
	products, err := service.Repository.GetRecom(id, cat_id)
	return products, err
}

func (service *Service) GetAll() []domain.Product {
	products := service.Repository.GetAll()
	return products
}

func (service *Service) GetFavoriteByUserId(id int) ([]domain.Product, error) {
	products := service.Repository.GetFavoriteByUserId(id)
	return products, nil
}

func (service *Service) SetFavorite(userId, prodId int) (bool, error) {
	var isSuccess bool
	var err error
	isExist := service.Repository.FindFavorite(userId, prodId)
	if isExist {
		isSuccess, err = service.Repository.RemoveFavorite(userId, prodId)
	} else {
		isSuccess, err = service.Repository.AddFavorite(userId, prodId)
	}
	return isSuccess, err
}

func (service *Service) GetBySearch(search string) []domain.Product {
	search = strings.ToLower(search)
	words := strings.Split(search, " ")
	products := service.Repository.GetBySearch(words)
	return products
}
