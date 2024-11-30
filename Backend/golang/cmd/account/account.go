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
	config := &configs.Config{
		Dsn:             "host=host.docker.internal port=5445 user=postgres dbname=hakaton password=123456 sslmode=disable",
		AccountAddress:  "0.0.0.0:5051",
		ProductsAddress: "localhost:5052",
		JWTSecret:       "dfngsijfgidufdbdfiovdfvdio0mviodvdf",
	}
	database := db.NewDb(config.Dsn)
	logger := logger.NewLogger(os.Stdout)
	app := account.NewApp(account.AppDeps{
		Config: config,
		DB:     database,
		Logger: logger})
	logger.Info("Server Account run", slog.String("Address", config.AccountAddress))
	server := http.Server{
		Addr:    config.AccountAddress,
		Handler: app.Run(),
	}
	err := server.ListenAndServe()
	if err != nil {
		panic(err)
	}
}
