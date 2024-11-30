# Products Service

## AddMultiple

url: ***/products/add-multiple***

Запрос

```
{
	"products": [{
		"price": 51,
		"rating": 1.1,
		"number_reviews": 1,
		"link": "https://ozone.com/12",
		"cat_id": 1,
		"name": "test1",
		"description": "decription1"
	},
							{
		"price": 52,
		"rating": 1.2,
		"number_reviews": 2,
		"link": "https://ozone.com/12",
		"cat_id": 2,
		"name": "test2",
		"description": "decription2"
	},
							{
		"price": 53,
		"rating": 1.3,
		"number_reviews": 3,
		"link": "https://ozone.com/12",
		"cat_id": 3,
		"name": "test3",
		"description": "decription3"
	}]
}
```

Ответ

```
{
	"is_success": true,
	"error": ""
}
```
