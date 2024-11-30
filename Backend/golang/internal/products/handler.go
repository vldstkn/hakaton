package products

import (
	"github.com/go-chi/chi/v5"
	configs "hakaton/internal/config"
	"hakaton/internal/di"
	"hakaton/pkg/db"
	"hakaton/pkg/req"
	"hakaton/pkg/res"
	"log/slog"
	"net/http"
)

type Handler struct {
	Db      *db.DB
	Config  *configs.Config
	Logger  *slog.Logger
	Service di.IProductsService
}

type HandlerDeps struct {
	Db      *db.DB
	Config  *configs.Config
	Logger  *slog.Logger
	Service di.IProductsService
}

func NewHandler(router *chi.Mux, deps *HandlerDeps) {
	handler := &Handler{
		Db:      deps.Db,
		Logger:  deps.Logger,
		Config:  deps.Config,
		Service: deps.Service,
	}
	router.Route("/products", func(router chi.Router) {
		router.Post("/add-multiple", handler.AddMultiple())
	})
}

func (handler *Handler) AddMultiple() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := req.HandleBody[AddMultiplyRequest](&w, r)
		if err != nil {
			handler.Logger.Error("AddMultiple HandleBody", slog.String("err", err.Error()))
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}
		vectors := make([][]float32, 3)
		if len(vectors) != len(body.Products) {
			handler.Logger.Error("AddMultiple error len", slog.String("err", "vector and products have different lengths"))
			res.Json(w, AddMultiplyResponse{
				IsSuccess: false,
				Error:     "vector and products have different lengths",
			}, http.StatusBadRequest)
			return
		}
		err = handler.Service.AddMultiple(body.Products, vectors)
		if err != nil {
			handler.Logger.Error("AddMultiple Service.AddMultiple", slog.String("err", err.Error()))
			res.Json(w, AddMultiplyResponse{
				IsSuccess: false,
				Error:     err.Error(),
			}, http.StatusBadRequest)
			return
		}
		res.Json(w, AddMultiplyResponse{
			IsSuccess: true,
			Error:     "",
		}, http.StatusCreated)
	}
}

func (handler *Handler) UpdateMultiple() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}

func (handler *Handler) UpdateById() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}

func (handler *Handler) GetById() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}

func (handler *Handler) GetByUserId() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}

func (handler *Handler) GetRecommendation() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

	}
}
