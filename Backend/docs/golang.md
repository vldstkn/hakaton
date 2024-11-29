# Account service

## **Register**

url: ***/auth/register***

Запрос:

```
{
	"email": "test@gmail.com", 
	"password": "123456",
	"name": "vlad"
}
```

Ответ:
```
{
	"id": 27,
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzI4OTY4NjksImlhdCI6MTczMjg4OTY2OSwiSWQiOjI3fQ.PNg0DFegSIieqNsbmVJsZ7HFCWWxwxVOxOH8OJW7l0U",
	"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzMxNDg4NjksImlhdCI6MTczMjg4OTY2OSwiSWQiOjI3fQ.vnDTERbpATXwnX9Sn3gDXFZv9f-tc1fpsK0gsUXv6yw"
}
```

## **Login**

url: ***/auth/register***


Запрос:

```
{
	"email": "test@gmail.com",
	"password": "123456"
}
```

Ответ:

```
{
	"id": 27,
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzI4OTcwMjAsImlhdCI6MTczMjg4OTgyMCwiSWQiOjI3fQ.rgu8DeQgir1dmY22IN0ebVDf32Y5owpywdD62doHUkM",
	"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzMxNDkwMjAsImlhdCI6MTczMjg4OTgyMCwiSWQiOjI3fQ.3GlZq_9cf9Ig_iKssg2XYMRfO1-WeUL-IQ-_wBX8KUc"
}
```

## **GetNewTokens**

url: ***/auth/login/access-token***

Запрос:

```
{
	"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzMxNDkwMjAsImlhdCI6MTczMjg4OTgyMCwiSWQiOjI3fQ.3GlZq_9cf9Ig_iKssg2XYMRfO1-WeUL-IQ-_wBX8KUc"
}
```

Ответ:

```
{
	"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzMxNDkxMjIsImlhdCI6MTczMjg4OTkyMiwiSWQiOjI3fQ.g65tF9SGsktNvEZMh0jNUNTcPdErVK_L8Zn0Tua68I4",
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzI4OTcxMjIsImlhdCI6MTczMjg4OTkyMiwiSWQiOjI3fQ.rjVF6pRuBHYgIRMpmvvhmdoUrx1yXLUwPxliqrWBx-I"
}
```

## **GetProfile**

url: ***/account/profile***

Запрос:

```
{
	"id": 27
}
```

Ответ:

```
{
	"id": 27,
	"email": "test@gmail.com",
	"name": "vlad"
}
```
