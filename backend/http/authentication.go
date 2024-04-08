package http

import (
	"context"
	"encoding/json"
	"net/http"
	types "pc3r/http/httpTypes"
	"pc3r/jwt"
	prisma "pc3r/prisma"
	db "pc3r/prisma/db"
)




func login(res http.ResponseWriter, req *http.Request) {
	var body types.LoginSchema
	// decoder le body
	err := json.NewDecoder(req.Body).Decode(&body)
	if (err != nil) || (body.Email == "" || body.Password == "") {
		res.WriteHeader(http.StatusBadRequest)
		message := "Veuillez vérifier l'émail et le mot de passe."
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}

	prisma, ctx := prisma.GetPrisma()
	
	// vérifier que l'utilisateur existe
	user, err := prisma.User.FindFirst(
		db.User.Email.Equals(body.Email),
	).With(
		db.User.Chats.Fetch(),
	).Exec(ctx)
	if err != nil {
		res.WriteHeader(http.StatusUnauthorized)
		message := "l'utilisateur avec ce mail n'existe pas !"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}
	user_password, _ := user.Password()
	// vérifier que le password match
	if user_password != body.Password {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Invalid password"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}
	// l'utilisateur est bien connecté, lui envoyer les jettons de connections
	userStruct := types.UserRes{
		UserModel: user,
		Chats:     user.Chats(),
	}
	accesToken, _, _ := jwt.CreateToken(user.ID)
	tokens := types.AuthTokens{
		Access: accesToken,
	}
	// Construire la réponse JSON
	response := types.LoginRes{
		User:   userStruct, // Assigner la structure User à response.User
		Tokens: tokens,
	}
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(response)

}



func signup(res http.ResponseWriter, req *http.Request) {
	var body types.SignupSchema
	err := json.NewDecoder(req.Body).Decode(&body)
	if (err != nil) || (body.Email == "" || body.Password == "" || body.Name == "") {
		res.WriteHeader(http.StatusBadRequest)
		message := "Veuillez vérifier l'émail et le mot de passe."
		json.NewEncoder(res).Encode(types.MakeError(message, types.INPUT_ERROR))
		return
	}
	prisma, ctx := prisma.GetPrisma()

	_, err = prisma.User.FindFirst(
		db.User.Email.Equals(body.Email),
	).Exec(ctx)

	if err == nil {
		res.WriteHeader(http.StatusUnauthorized)
		message := "Ce utilisateur déjà existe."
		json.NewEncoder(res).Encode(types.MakeError(message, types.UNAUTHORIZED))
		return
	}

	new_user, err := prisma.User.CreateOne(
		db.User.Name.Set(body.Name),
		db.User.Email.Set(body.Email),
		db.User.Password.Set(body.Password),
	).Exec(ctx)

	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		message := "Internal server error"
		json.NewEncoder(res).Encode(types.MakeError(message, types.INTERNAL_SERVER_ERROR))
		return
	}

	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(types.SignupRes{Message: "User Created", Success: true, Id: new_user.ID})

}

// Authentication using Sockets
func AuthSocketMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		tokenString := req.URL.Query().Get("Authorization")
		req.Header.Set("Authorization", tokenString)
		AuthGate(next).ServeHTTP(res, req)
	})
}

func AuthGate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		tokenString := req.Header.Get("Authorization")
		
		if tokenString == "" {
			res.WriteHeader(http.StatusUnauthorized)
			message := "Unauthorized, You need a token"
			json.NewEncoder(res).Encode(types.MakeError(message, types.UNAUTHORIZED))
			return
		}
		tokenString = tokenString[len("Bearer "):]
		if tokenString == "" {
			res.WriteHeader(http.StatusUnauthorized)
			message := "Unauthorized, You need a JSON Web Token"
			json.NewEncoder(res).Encode(types.MakeError(message, types.UNAUTHORIZED))
			return
		}
		claims, valid := jwt.VerifyToken(tokenString)
		if !valid {
			res.WriteHeader(http.StatusUnauthorized)
			message := "Unauthorized, You have an invalid JSON Web Token"
			json.NewEncoder(res).Encode(types.MakeError(message, types.UNAUTHORIZED))
			return
		}
		id := claims["id"].(string)
		prisma, ctx := prisma.GetPrisma()
		user, err := prisma.User.FindFirst(
			db.User.ID.Equals(id),
		).With(
			db.User.Chats.Fetch(),
		).Exec(ctx)
		if err != nil {
			res.WriteHeader(http.StatusNotFound)
			message := "User Not Found"
			json.NewEncoder(res).Encode(types.MakeError(message, types.NOT_FOUND))
			return
		}
		ctx_req := req.Context()
		ctx_req = context.WithValue(ctx_req, types.CtxAuthKey{}, user)
		req = req.WithContext(ctx_req)

		next.ServeHTTP(res, req)
	})
}
