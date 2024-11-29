package main

import (
	"hakaton/internal/account"
	configs "hakaton/internal/config"
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
	app := account.NewApp(account.AppDeps{
		Config: config,
		DB:     database,
		Logger: logger,
	})
	logger.Info("Server run", slog.String("Address", config.AccountAddress))
	server := http.Server{
		Addr:    config.AccountAddress,
		Handler: app.Run(),
	}
	server.ListenAndServe()
}
