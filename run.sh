cd backend
go mod tidy 
go get github.com/steebchen/prisma-client-go
go run github.com/steebchen/prisma-client-go generate 
go install github.com/cosmtrek/air@latest
go get 
air &

cd ../frontend
npm install
npm run dev
