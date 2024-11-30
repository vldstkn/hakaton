package products

import (
	"bytes"
	"encoding/json"
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
	Db             *db.DB
	Config         *configs.Config
	Logger         *slog.Logger
	Service        di.IProductsService
	ProductsClient *http.Client
}

type HandlerDeps struct {
	Db             *db.DB
	Config         *configs.Config
	Logger         *slog.Logger
	Service        di.IProductsService
	ProductsClient *http.Client
}

func NewHandler(router *chi.Mux, deps *HandlerDeps) {
	handler := &Handler{
		Db:             deps.Db,
		Logger:         deps.Logger,
		Config:         deps.Config,
		Service:        deps.Service,
		ProductsClient: deps.ProductsClient,
	}
	router.Route("/products", func(router chi.Router) {
		router.Post("/add-multiple", handler.AddMultiple())
		router.Post("/recom", handler.GetRecommendation())
	})
}

func (handler *Handler) AddMultiple() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := req.HandleBody[AddMultiplyRequest](&w, r)
		if err != nil {
			handler.Logger.Error("req.HandleBody", slog.String("err", err.Error()))
			res.Json(w, AddMultiplyResponse{
				IsSuccess: false,
				Error:     err.Error(),
			}, http.StatusInternalServerError)
			return
		}

		data, err := json.Marshal(GetVectorsRequest{
			Products: body.Products,
		})

		if err != nil {
			handler.Logger.Error("json.Marshal", slog.String("err", err.Error()))
			res.Json(w, AddMultiplyResponse{
				IsSuccess: false,
				Error:     err.Error(),
			}, http.StatusInternalServerError)
			return
		}

		request, err := http.NewRequest("GET", "http://"+handler.Config.MLAddress+"/rec", bytes.NewBuffer(data))

		if err != nil {
			handler.Logger.Error("http.NewRequest", slog.String("err", err.Error()))
			res.Json(w, AddMultiplyResponse{
				IsSuccess: false,
				Error:     err.Error(),
			}, http.StatusInternalServerError)
			return
		}

		r.Header.Set("Content-Type", "application/json")

		resp, err := handler.ProductsClient.Do(request)

		if err != nil {
			handler.Logger.Error("handler.ProductsClient.Do", slog.String("err", err.Error()))
			res.Json(w, AddMultiplyResponse{
				IsSuccess: false,
				Error:     err.Error(),
			}, http.StatusInternalServerError)
			return
		}
		defer resp.Body.Close()

		var bodyVectors GetVectorsResponse

		err = json.NewDecoder(resp.Body).Decode(&bodyVectors)

		if err != nil {
			handler.Logger.Error("json.NewDecoder", slog.String("err", err.Error()))
			res.Json(w, AddMultiplyResponse{
				IsSuccess: false,
				Error:     err.Error(),
			}, http.StatusBadRequest)
			return
		}

		if len(bodyVectors.Vectors) != len(body.Products) {
			handler.Logger.Error("AddMultiple error len", slog.String("err", "vector and products have different lengths"))
			res.Json(w, AddMultiplyResponse{
				IsSuccess: false,
				Error:     "vector and products have different lengths",
			}, http.StatusBadRequest)
			return
		}
		err = handler.Service.AddMultiple(body.Products, bodyVectors.Vectors)
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

func (handler *Handler) GetRecommendation() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := req.HandleBody[GetRecomRequest](&w, r)
		if err != nil {
			handler.Logger.Error("req.HandleBody", slog.String("err", err.Error()))
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}
		_ = body
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
