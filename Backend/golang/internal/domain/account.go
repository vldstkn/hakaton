package domain

type User struct {
	Id        int    `json:"id" db:"id"`
	CreatedAt string `json:"created_at" db:"created_at"`
	UpdatedAt string `json:"updated_at" db:"updated_at"`
	Email     string `json:"email" db:"email"`
	Password  string `json:"password,omitempty" db:"password"`
	Name      string `json:"name" db:"name"`
}
