package main

import (
	configs "hakaton/internal/config"
	"hakaton/internal/products"
	"hakaton/pkg/db"
	"hakaton/pkg/logger"
	"log/slog"
	"net/http"
	"os"
)

func main() {
	config := configs.LoadConfig()
	database := db.NewDb(config.Dsn)
	logger := logger.NewLogger(os.Stdout)
	app := products.NewApp(products.AppDeps{
		Config: config,
		DB:     database,
		Logger: logger,
	})
	logger.Info("Server Products run", slog.String("Address", config.ProductsAddress))
	server := http.Server{
		Addr:    config.ProductsAddress,
		Handler: app.Run(),
	}
	err := server.ListenAndServe()
	if err != nil {
		panic(err)
	}
}
