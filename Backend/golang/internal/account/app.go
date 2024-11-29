package account

import (
	"github.com/go-chi/chi/v5"
	configs "hakaton/internal/config"
	"hakaton/pkg/db"
	"log/slog"
)

type App struct {
	DB     *db.DB
	Config *configs.Config
	Logger *slog.Logger
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
	}
}

func (app *App) Run() *chi.Mux {
	router := chi.NewRouter()
	repository := NewRepository(app.DB)
	service := NewService(&ServiceDeps{
		Repository: repository,
	})
	NewHandler(router, &HandlerDeps{
		Service: service,
		Config:  app.Config,
		Logger:  app.Logger,
	})

	return router
}
