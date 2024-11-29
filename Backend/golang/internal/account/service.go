package account

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
	"hakaton/internal/di"
	"hakaton/internal/domain"
	"hakaton/pkg/jwt"
	"net/http"
	"time"
)

type Service struct {
	Repository di.IAccountRepository
}

type ServiceDeps struct {
	Repository di.IAccountRepository
}

func NewService(deps *ServiceDeps) *Service {
	return &Service{
		Repository: deps.Repository,
	}
}

func (service *Service) Register(email, name, password string) (int, error) {
	existsUser := service.Repository.FindByEmail(email)
	if existsUser != nil {
		return -1, errors.New("the user already exists")
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return -1, errors.New(http.StatusText(http.StatusInternalServerError))
	}
	user := &domain.User{
		Email:    email,
		Name:     name,
		Password: string(hashedPassword),
	}

	id, err := service.Repository.Create(user)
	if err != nil {
		return -1, errors.New(http.StatusText(http.StatusInternalServerError))
	}
	return id, nil
}

func (service *Service) Login(email, password string) (int, error) {
	user := service.Repository.FindByEmail(email)
	if user == nil {
		return -1, errors.New("user not exists")
	}
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return -1, errors.New("invalid email or password")
	}
	return user.Id, nil
}

func (service *Service) IssueTokens(secret string, data jwt.JWTData,
	expirationTimeA, expirationTimeR time.Time) (string, string, error) {

	j := jwt.NewJWT(secret)
	accessToken, err := j.Create(data, expirationTimeA)
	if err != nil {
		return "", "", errors.New(http.StatusText(http.StatusInternalServerError))
	}
	refreshToken, err := j.Create(data, expirationTimeR)
	if err != nil {
		return "", "", errors.New(http.StatusText(http.StatusInternalServerError))
	}
	return accessToken, refreshToken, nil
}

func (service *Service) GetProfileById(id int) *domain.User {
	user := service.Repository.GetProfileById(id)
	return user
}
