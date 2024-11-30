FROM golang:alpine

#Рабочая деректория внутри Docker
WORKDIR /app

#Копируем файлы зависимостей
COPY go.mod .

#агрузка зависимостей
RUN go mod download

#Скопировать код + зависимости
COPY . .

#Собрать приложение и полочить .exe файл
RUN go build -o main cmd/account/account.go

#Port
EXPOSE 5051

#Запуск приложения
CMD ["./main"]