package products

import (
	"fmt"
	"hakaton/internal/domain"
	"hakaton/pkg/db"
	"strings"
)

type Repository struct {
	DB *db.DB
}

func NewRepository(database *db.DB) *Repository {
	return &Repository{
		DB: database,
	}
}

func (repo *Repository) AddMultiple(products []domain.Product) error {
	var valueStrings []string
	var valueArgs []interface{}

	for i, product := range products {
		valueStrings = append(valueStrings, fmt.Sprintf("($%d, $%d, $%d, $%d, $%d, $%d, $%d, $%d)",
			i*8+1, i*8+2, i*8+3, i*8+4, i*8+5, i*8+6, i*8+7, i*8+8))

		valueArgs = append(valueArgs, product.Price, product.Rating, product.NumberReviews,
			product.Link, product.CatId, product.Name, product.Description, product.Embedding)
	}

	query := fmt.Sprintf(`
		INSERT INTO products (price, rating, number_reviews, link, cat_id, name, description, embedding)
		VALUES %s`, strings.Join(valueStrings, ", "))

	_, err := repo.DB.Exec(query, valueArgs...)
	return err
}

func (repo *Repository) GetRecom(inputProducts []domain.Product) ([]domain.Product, error) {
	var resProducts []domain.Product
	for _, inputProduct := range inputProducts {
		var products []domain.Product
		err := repo.DB.Select(&products,
			`SELECT p.id, p.created_at, p.updated_at, p.price, p.rating, p.rating, 
       						 p.number_reviews, p.link, p.cat_id, p.name, p.description
						FROM products p
						CROSS JOIN (
						    SELECT embedding
						    FROM products
						    WHERE id = $1
						) tp
						WHERE p.id != $1
						ORDER BY p.embedding <=> tp.embedding ASC, p.price DESC, p.rating ASC
						LIMIT 3`, inputProduct.Id)
		if err != nil {
			continue
		}
		resProducts = append(resProducts, products...)

	}
	return resProducts, nil
}

func (repo *Repository) GetAll() []domain.Product {
	var products []domain.Product
	err := repo.DB.Select(&products, `SELECT p.id, p.created_at, p.updated_at, p.price, p.rating, p.rating, 
       						 p.number_reviews, p.link, p.cat_id, p.name, p.description FROM products p LIMIT $1`, 50)
	if err != nil {
		return []domain.Product{}
	}
	return products
}

func (repo *Repository) GetById(id int) (domain.Product, error) {
	var product domain.Product
	err := repo.DB.Get(&product,
		`SELECT  p.id, p.created_at, p.updated_at, p.price, p.rating, p.rating,
        			p.number_reviews, p.link, p.cat_id, p.name, p.description 
            FROM products p WHERE id=$1`, id)
	if err != nil {
		return domain.Product{}, err
	}
	return product, nil
}

func (repo *Repository) GetFavoriteByUserId(id int) []domain.Product {
	var products []domain.Product
	err := repo.DB.Select(&products,
		`SELECT p.id, p.created_at, p.updated_at, p.price, p.rating, p.rating, 
       						 p.number_reviews, p.link, p.cat_id, p.name, p.description 
						FROM users u 
						LEFT JOIN favorite_products fp on u.id = fp.user_id
						JOIN products p on p.id = fp.product_id
						WHERE u.id=$1
						ORDER BY p.updated_at`, id)

	if err != nil {
		return []domain.Product{}
	}
	return products
}

func (repo *Repository) AddFavorite(userId, prodId int) (bool, error) {
	_, err := repo.DB.Exec("INSERT INTO favorite_products (user_id, product_id) VALUES ($1, $2)", userId, prodId)
	if err != nil {
		return false, err
	}
	return true, nil
}

func (repo *Repository) RemoveFavorite(userId, prodId int) (bool, error) {
	_, err := repo.DB.Exec("DELETE FROM favorite_products WHERE user_id=$1 AND product_id=$2", userId, prodId)
	if err != nil {
		return false, err
	}
	return true, nil
}

func (repo *Repository) FindFavorite(userId, prodId int) bool {
	var id int
	err := repo.DB.Get(&id, "SELECT user_id FROM favorite_products WHERE user_id=$1 AND product_id=$2", userId, prodId)
	if err != nil {
		return false
	}
	return true
}

func (repo *Repository) GetBySearch(words []string) []domain.Product {
	var products []domain.Product
	wordsSql := strings.Join(words, " | ")

	err := repo.DB.Select(&products,
		`SELECT p.id, p.created_at, p.updated_at, p.price, p.rating, p.rating,
       						 p.number_reviews, p.link, p.cat_id, p.name, p.description 
						FROM products p
					  WHERE to_tsvector('russian', p.name) @@ to_tsquery('russian', $1)
					  ORDER BY ts_rank(to_tsvector('russian', p.name), to_tsquery('russian', $1)) DESC`, wordsSql)

	if err != nil {
		return []domain.Product{}
	}
	return products
}
