from fastapi import FastAPI
from pydantic import BaseModel
from transformers import BertTokenizer, BertModel
import torch
import numpy as np

# Загрузка модели и токенизатора
model_name = "cointegrated/rubert-tiny"
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertModel.from_pretrained(model_name)

app = FastAPI()


class Product(BaseModel):
    name: str
    description: str


class RequestData(BaseModel):
    products: list[Product]


# Функция для перевода описания в вектор
def word2vec(name: str, description: str):
    text = name + " " + description
    encoded_input = tokenizer(text, return_tensors='pt')
    with torch.no_grad():
        output = model(**encoded_input)
    vector = output.last_hidden_state[:, 0, :].cpu().numpy()  # Перемещение тензора на CPU и преобразование в numpy
    vector = np.float32(vector)
    return np.squeeze(vector).tolist()  # Преобразование в JSON-совместимый формат


# Endpoint для API
@app.get("/rec")
async def get_word2vec_endpoint(data: RequestData):
    vectors = []
    for product in data.products:
        vector = word2vec(product.name, product.description)
        vectors.append(vector)
    return {"vectors": vectors}