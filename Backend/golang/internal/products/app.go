package products

import (
	"github.com/go-chi/chi/v5"
	configs "hakaton/internal/config"
	"hakaton/pkg/db"
	"log/slog"
	"net/http"
	"time"
)

type App struct {
	DB             *db.DB
	Config         *configs.Config
	Logger         *slog.Logger
	ProductsClient *http.Client
}

type AppDeps struct {
	DB     *db.DB
	Config *configs.Config
	Logger *slog.Logger
}

func NewApp(deps AppDeps) *App {
	return &App{
		DB:     deps.DB,
		Config: deps.Config,
		Logger: deps.Logger,
		ProductsClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

func (app *App) Run() *chi.Mux {
	router := chi.NewRouter()
	repository := NewRepository(app.DB)
	service := NewService(&ServiceDeps{
		Repository: repository,
	})
	NewHandler(router, &HandlerDeps{
		Service:        service,
		Config:         app.Config,
		Logger:         app.Logger,
		ProductsClient: app.ProductsClient,
	})

	return router
}
