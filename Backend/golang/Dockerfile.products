FROM golang:alpine

#Рабочая деректория внутри Docker
WORKDIR /app

COPY go.mod .

RUN go mod download

COPY . .

RUN go build -o products cmd/products/products.go

#EXPOSE 5051

CMD ["./products"]