# ML Service
 url: -
 
## GetVectors

Запрос

```
{
    "products": [
        {
            "title": "title1",
            "description": "desc1"
        },
        {
            "title": "title2",
            "description": "desc2"
        },
        {
            "title": "title3",
            "description": "desc3"
        },
    ]
}
```

Ответ

```
{
    "vectors": [
        [0.5,..., 0.81],
        [0.7,..., 0.3],
        [0.1,..., 0.7]
    ]
}
```

## GetRecommendations

url: ***-***

Запрос

```
{
    "product": {
        "vector": [0.5, ..., 0.02],
        "cat_id": 1
    }
}
```

Ответ

```
{
    "products_id": [2, 54, 23, 76, 8]
}
```