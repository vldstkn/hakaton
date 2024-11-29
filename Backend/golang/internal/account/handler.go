package account

import (
	"github.com/go-chi/chi/v5"
	configs "hakaton/internal/config"
	"hakaton/internal/di"
	"hakaton/pkg/jwt"
	"hakaton/pkg/req"
	"hakaton/pkg/res"
	"log/slog"
	"net/http"
	"time"
)

type Handler struct {
	Service di.IAccountService
	Config  *configs.Config
	Logger  *slog.Logger
}

type HandlerDeps struct {
	Service di.IAccountService
	Config  *configs.Config
	Logger  *slog.Logger
}

func NewHandler(router *chi.Mux, deps *HandlerDeps) {
	handler := &Handler{
		Service: deps.Service,
		Config:  deps.Config,
		Logger:  deps.Logger,
	}
	router.Route("/auth", func(router chi.Router) {
		router.Post("/register", handler.Register())
		router.Post("/login", handler.Login())
		router.Get("/login/access-token", handler.GetNewTokens())
	})
	router.Route("/account", func(router chi.Router) {
		router.Get("/profile", handler.GetProfile())
	})
}

func (handler *Handler) Register() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := req.HandleBody[RegisterRequest](&w, r)
		if err != nil {
			handler.Logger.Error("Account Register decode body", slog.String("err", err.Error()))
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}
		id, err := handler.Service.Register(body.Email, body.Name, body.Password)
		if err != nil {
			handler.Logger.Error("Account Register Service.Register", slog.String("err", err.Error()))
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		timeNow := time.Now()
		accessToken, refreshToken, err := handler.Service.IssueTokens(handler.Config.JWTSecret,
			jwt.JWTData{
				Id: id,
			},
			timeNow.Add(time.Hour*2),
			timeNow.AddDate(0, 0, 3))
		if err != nil {
			handler.Logger.Error("Account Register Service.IssueTokens", slog.String("err", err.Error()))
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			return
		}

		res.Json(w, RegisterResponse{
			Id:           id,
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		}, 201)
	}
}

func (handler *Handler) Login() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := req.HandleBody[LoginRequest](&w, r)
		if err != nil {
			handler.Logger.Error("Account Login HandleBody", slog.String("err", err.Error()))
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}
		id, err := handler.Service.Login(body.Email, body.Password)
		if err != nil {
			handler.Logger.Error("Account Login Service.Login", slog.String("err", err.Error()))
			http.Error(w, "invalid email or password", http.StatusBadRequest)
			return
		}

		timeNow := time.Now()
		accessToken, refreshToken, err := handler.Service.IssueTokens(handler.Config.JWTSecret,
			jwt.JWTData{
				Id: id,
			},
			timeNow.Add(time.Hour*2),
			timeNow.AddDate(0, 0, 3))
		if err != nil {
			handler.Logger.Error("Account Login Create Token", slog.String("err", err.Error()))
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			return
		}

		res.Json(w, LoginResponse{
			Id:           id,
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		}, 200)
	}
}

func (handler *Handler) GetNewTokens() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := req.HandleBody[GetNewTokensRequest](&w, r)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}
		isValid, data := jwt.NewJWT(handler.Config.JWTSecret).Parse(body.RefreshToken)
		if !isValid {
			http.Error(w, "token is not valid", http.StatusUnauthorized)
			return
		}
		timeNow := time.Now()
		accessToken, refreshToken, err := handler.Service.IssueTokens(handler.Config.JWTSecret, *data,
			timeNow.Add(time.Hour*2),
			timeNow.AddDate(0, 0, 3))

		if err != nil {
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			return
		}

		res.Json(w, GetNewTokensResponse{
			RefreshToken: refreshToken,
			AccessToken:  accessToken,
		}, 200)
	}
}

func (handler *Handler) GetProfile() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := req.HandleBody[GetProfileByIdRequest](&w, r)
		if err != nil {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}
		profile := handler.Service.GetProfileById(body.Id)
		if profile == nil {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}
		res.Json(w, GetProfileByIdResponse{
			Id:    profile.Id,
			Name:  profile.Name,
			Email: profile.Email,
		}, 200)
	}
}
