package products

import (
	"fmt"
	"hakaton/internal/domain"
	"hakaton/pkg/db"
	"strings"
)

type Repository struct {
	DB *db.DB
}

func NewRepository(database *db.DB) *Repository {
	return &Repository{
		DB: database,
	}
}

func (repo *Repository) AddMultiple(products []domain.Product) error {
	var valueStrings []string
	var valueArgs []interface{}
	for i, product := range products {
		valueStrings = append(valueStrings, fmt.Sprintf("($%d, $%d, $%d, $%d, $%d, $%d, $%d)",
			i*7+1, i*7+2, i*7+3, i*7+4, i*7+5, i*7+6, i*7+7))

		valueArgs = append(valueArgs, product.Price, product.Rating, product.NumberReviews,
			product.Link, product.CatId, product.Name, product.Description)
	}

	query := fmt.Sprintf(`
		INSERT INTO products (price, rating, number_reviews, link, cat_id, name, description) 
		VALUES %s`, strings.Join(valueStrings, ", "))

	_, err := repo.DB.Exec(query, valueArgs...)
	return err
}
