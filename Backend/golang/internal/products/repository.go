package products

import (
	"bytes"
	"fmt"
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

func (repo *Repository) AddMultiple(products []domain.Product) error {
	//var valueStrings []string
	//var valueArgs []interface{}
	//FIXME:
	vector := make([]float64, 312)
	vecStr := vectorToString(vector)

	query := `INSERT INTO products (embedding) VALUES ($1)`
	_, err := repo.DB.Exec(query, vecStr)

	return err

	//for i, product := range products {
	//	valueStrings = append(valueStrings, fmt.Sprintf("($%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d)",
	//		i*8+1, i*8+2, i*8+3, i*8+4, i*8+5, i*8+6, i*8+7, i*8+8))
	//
	//	valueArgs = append(valueArgs, product.Price, product.Rating, product.NumberReviews,
	//		product.Link, product.CatId, product.Name, product.Description, vecStr)
	//}
	//
	//query := fmt.Sprintf(`
	//	INSERT INTO products (price, rating, number_reviews, link, cat_id, name, description, embedding)
	//	VALUES %s`, strings.Join(valueStrings, ", "))
	//
	//fmt.Println(valueArgs...)
	//
	//_, err := repo.DB.Exec(query, valueArgs...)
	//return err
}

func vectorToString(vector []float64) string {
	var buf bytes.Buffer
	buf.WriteString("{")
	for i, v := range vector {
		if i > 0 {
			buf.WriteString(",")
		}
		buf.WriteString(fmt.Sprintf("%f", v))
	}
	buf.WriteString("}")
	return buf.String()
}
