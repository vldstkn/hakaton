package configs

import (
	"github.com/joho/godotenv"
	"os"
)

type Config struct {
	ApiAddress     string
	AccountAddress string
	ProductAddress string
	Dsn            string
	JWTSecret      string
}

func LoadConfig() *Config {
	err := godotenv.Load("../.env")
	if err != nil {
		panic(err)
	}

	return &Config{
		Dsn:            os.Getenv("DSN"),
		ApiAddress:     os.Getenv("ApiAddress"),
		AccountAddress: os.Getenv("AccountAddress"),
		ProductAddress: os.Getenv("ProductAddress"),
		JWTSecret:      os.Getenv("JWTSecret"),
	}
}
