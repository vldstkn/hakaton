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
	config := &configs.Config{
		// host=host.docker.internal
		Dsn:             "host=host.docker.internal port=5445 user=postgres dbname=hakaton password=123456 sslmode=disable",
		AccountAddress:  "0.0.0.0:5051",
		ProductsAddress: "0.0.0.0:5052",
		MLAddress:       "host.docker.internal:5053",
		JWTSecret:       "dfngsijfgidufdbdfiovdfvdio0mviodvdf",
	}

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
