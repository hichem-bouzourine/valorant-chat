package httpTypes

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

type MessageResponse struct {
	Message string `json:"message"`
}

type AuthTokens struct {
	Access string `json:"access"`
}

type CtxAuthKey struct{}