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
## GetRecom

url: ***/products/recom***

Запрос

```
{
    "user_id": 1
}
```

Ответ

```
{
	"products": [
		{
			"id": 221,
			"created_at": "2024-11-30T16:26:20.225007Z",
			"updated_at": "2024-11-30T16:26:20.225007Z",
			"price": 120,
			"rating": 3.9,
			"number_reviews": 448,
			"link": "https://ozone.com/product5",
			"cat_id": 0,
			"name": "Шорты модель 5 - долговечные",
			"description": "Стильные шорты для дома. Изготовлены из дышащей ткани. Идеальны для активного образа жизни.",
			"embedding": null
		},
		...,
	]
}
```

## SetFavorite

url: ***/products/favorite***

Запрос

```
{
	"user_id": 1,
	"product_id": 119
}
```

Ответ

```
{
	"is_success": true
}
```
## GetByUserId

url: ***/products/user***

Запрос

```
{
	"id": 1
}
```

Ответ

```
{
	"products": [
		{
			"id": 117,
			"created_at": "2024-11-30T15:55:44.727198Z",
			"updated_at": "2024-11-30T15:55:44.727198Z",
			"price": 135,
			"rating": 3.2,
			"number_reviews": 490,
			"link": "https://ozone.com/product1",
			"cat_id": 0,
			"name": "Носки модель 1 - стильные",
			"description": "Качественные носки для дома. Изготовлены из высококачественного хлопка. Идеальны для подарка.",
			"embedding": null
		},
		... ,
	]
}
```

## GetBySearch

url: ***/products/search***

Запрос

```
{
	"search": "стильные"
}
```

Ответ

```
{
	"products": [
		{
			"id": 117,
			"created_at": "2024-11-30T15:55:44.727198Z",
			"updated_at": "2024-11-30T15:55:44.727198Z",
			"price": 135,
			"rating": 3.2,
			"number_reviews": 490,
		}, 
		... ,
	]
}
```

## GetAll

url: ***/products/all***

Запрос

*отсутствует

Ответ

```
{
	"products": [
		{
			"id": 117,
			"created_at": "2024-11-30T15:55:44.727198Z",
			"updated_at": "2024-11-30T15:55:44.727198Z",
			"price": 135,
			"rating": 3.2,
			"number_reviews": 490,
		}, 
		... ,
	]
}
```

