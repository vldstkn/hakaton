package products

import (
	"fmt"
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
	Db       *db.DB
	Config   *configs.Config
	Logger   *slog.Logger
	Service  di.IProductsService
	MLClient *http.Client
}

type HandlerDeps struct {
	Db       *db.DB
	Config   *configs.Config
	Logger   *slog.Logger
	Service  di.IProductsService
	MLClient *http.Client
}

func NewHandler(router *chi.Mux, deps *HandlerDeps) {
	handler := &Handler{
		Db:       deps.Db,
		Logger:   deps.Logger,
		Config:   deps.Config,
		Service:  deps.Service,
		MLClient: deps.MLClient,
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
		fmt.Println(r.Body)

		//req, err := http.NewRequest("GET", "http://10.199.181.103:8000/rec",http.)

		if err != nil {
			handler.Logger.Error("AddMultiple HandleBody", slog.String("err", err.Error()))
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}

		//resp, err := handler.MLClient.Do(req)
		if err != nil {
			fmt.Println("Ошибка выполнения запроса:", err)
			return
		}
		//defer resp.Body.Close() // Закрываем тело ответа в конце

		// Читаем тело ответа
		//bodyML, err := io.ReadAll(resp.Body)

		//fmt.Println("bodyML11", bodyML)

		if err != nil {
			handler.Logger.Error("AddMultiple HandleBody", slog.String("err", err.Error()))
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}

		return

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
