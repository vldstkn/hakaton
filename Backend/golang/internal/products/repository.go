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
		valueStrings = append(valueStrings, fmt.Sprintf("($%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d)",
			i*8+1, i*8+2, i*8+3, i*8+4, i*8+5, i*8+6, i*8+7, i*8+8))

		valueArgs = append(valueArgs, product.Price, product.Rating, product.NumberReviews,
			product.Link, product.CatId, product.Name, product.Description, product.Embedding)
	}

	query := fmt.Sprintf(`
		INSERT INTO products (price, rating, number_reviews, link, cat_id, name, description, embedding)
		VALUES %s`, strings.Join(valueStrings, ", "))

	_, err := repo.DB.Exec(query, valueArgs...)
	return err
}
