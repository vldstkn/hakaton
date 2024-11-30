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

func (repo *Repository) GetRecom(id, catId int) ([]domain.Product, error) {
	var products []domain.Product
	err := repo.DB.Select(&products,
		`SELECT p.id, p.created_at, p.updated_at, p.price, p.rating, p.rating, 
       						 p.number_reviews, p.link, p.cat_id, p.name, p.description
						FROM products p
						CROSS JOIN (
						    SELECT embedding
						    FROM products
						    WHERE id = $1
						) tp
						WHERE p.id != $1 AND p.cat_id = $2
						ORDER BY p.embedding <=> tp.embedding ASC, p.price DESC, p.rating ASC
						LIMIT 10`, id, catId)
	if err != nil {
		return []domain.Product{}, err
	}
	return products, nil
}

func (repo *Repository) GetAll() []domain.Product {
	var products []domain.Product
	err := repo.DB.Select(&products, `SELECT p.id, p.created_at, p.updated_at, p.price, p.rating, p.rating, 
       						 p.number_reviews, p.link, p.cat_id, p.name, p.description FROM products p LIMIT $1`, 50)
	if err != nil {
		return []domain.Product{}
	}
	return products
}

func (repo *Repository) GetById(id int) *domain.Product {
	var product domain.Product
	err := repo.DB.Get(&product, "SELECT * FROM products WHERE id=$1", id)
	if err != nil {
		return nil
	}
	return &product
}
