package payloads

type CreateRequest struct {
	Username  string `json:"username"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Contact   string `json:"contact"`
	Photo     string `json:"photo"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// type UserDetail struct {
// 	ID        string `json:"id"`
// 	Username  string `json:"username"`
// 	Authorize string `json:"authorized"`
// }