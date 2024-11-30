package domain

import "github.com/pgvector/pgvector-go"

type Product struct {
	Id            int             `json:"id" db:"id"`
	CreatedAt     string          `json:"created_at" db:"created_at"`
	UpdatedAt     string          `json:"updated_at" db:"updated_at"`
	Price         int             `json:"price" db:"price"  validate:"required"`
	Rating        float64         `json:"rating" db:"rating"  validate:"required"`
	NumberReviews int             `json:"number_reviews" db:"number_reviews"  validate:"required"`
	Link          string          `json:"link" db:"link"  validate:"required,url"`
	CatId         int             `json:"cat_id" db:"cat_id"  validate:"required"`
	Name          string          `json:"name" db:"name"  validate:"required"`
	Description   string          `json:"description" db:"description"  validate:"required"`
	Embedding     pgvector.Vector `json:"embedding" db:"embedding"`
}
