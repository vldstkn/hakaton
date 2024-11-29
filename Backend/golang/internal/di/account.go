package di

import (
	"hakaton/internal/domain"
	"hakaton/pkg/jwt"
	"time"
)

type IAccountService interface {
	Register(email, password, name string) (int, error)
	Login(email, password string) (int, error)
	IssueTokens(secret string, data jwt.JWTData,
		expirationTimeA, expirationTimeR time.Time) (string, string, error)
	GetProfileById(id int) *domain.User
}

type IAccountRepository interface {
	Create(user *domain.User) (int, error)
	FindByEmail(email string) *domain.User
	GetProfileById(id int) *domain.User
}
