FROM golang:alpine

#Рабочая деректория внутри Docker
WORKDIR /app

COPY go.mod .

RUN go mod download

COPY . .

RUN go build -o account cmd/account/account.go

#EXPOSE 5051

CMD ["./account"]