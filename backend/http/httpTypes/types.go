package httpTypes

import (
	db "pc3r/prisma/db"
)

// Ce découpage été inspiré par Tabellout Yanis.

type Error string

const (
	BAD_REQUEST           Error = "BAD_REQUEST"
	UNAUTHORIZED                = "UNAUTHORIZED"
	NOT_FOUND                   = "NOT_FOUND"
	INPUT_ERROR                 = "INPUT_ERROR"
	INTERNAL_SERVER_ERROR       = "INTERNAL_SERVER_ERROR"
)

type HTTPError struct {
	Message string `json:"message"`
	Code    Error  `json:"code"`
}
type HTTPErrorRes struct {
	Error HTTPError `json:"error"`
}

func MakeError(message string, code Error) HTTPErrorRes {
	e := HTTPError{
		Message: message, Code: code,
	}
	return HTTPErrorRes{
		Error: e,
	}

}

type LoginSchema struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
type LoginRes struct {
	User   UserRes    `json:"user"`
	Tokens AuthTokens `json:"tokens"`
}

type UserRes struct {
	*db.UserModel
	Chats []db.ChatModel `json:"chats"`
}

type SignupSchema struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
}
type SignupRes struct {
	Success bool   `json:"success"`
	Id      string `json:"id"`
	Message string `json:"message"`
}

type MessageResponse struct {
	Message string `json:"message"`
}

type AuthTokens struct {
	Access string `json:"access"`
}

type CtxAuthKey struct{}