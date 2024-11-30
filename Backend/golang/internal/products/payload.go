package products

import "hakaton/internal/domain"

type Vector struct {
}

type AddMultiplyRequest struct {
	Products []domain.Product `json:"products" validate:"required"`
}

type AddMultiplyResponse struct {
	IsSuccess bool   `json:"is_success"`
	Error     string `json:"error"`
}

type GetVectorsRequest struct {
	Products []domain.Product `json:"products"`
}

type GetVectorsResponse struct {
	Vectors [][]float32 `json:"vectors"`
}

type GetRecomRequest struct {
	Id    int `json:"id"`
	CatId int `json:"cat_id"`
}

type GetRecomResponse struct {
	Products []domain.Product `json:"products"`
}
