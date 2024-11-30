package products

import "hakaton/internal/domain"

type AddMultiplyRequest struct {
	Products []domain.Product `json:"products" validate:"required"`
}

type AddMultiplyResponse struct {
	IsSuccess bool   `json:"is_success"`
	Error     string `json:"error"`
}
