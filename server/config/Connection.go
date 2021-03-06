package config

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func GetConnection() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", Configuration.DB_PATH)
	if err != nil {
		return nil, err
	}

	db.SetMaxIdleConns(Configuration.DB_MAX_IDLE_CONNECTIONS)
	db.SetMaxOpenConns(Configuration.DB_MAX_CONNECTIONS)
	db.SetConnMaxIdleTime(Configuration.DB_MAX_IDLE_TIME)
	db.SetConnMaxLifetime(Configuration.DB_MAX_LIFE_TIME)

	_, err = db.Exec(`
            CREATE TABLE IF NOT EXISTS users (
            id integer not null primary key AUTOINCREMENT,
            username varchar(255) not null,
            first_name varchar(255) not null,
            last_name varchar(255) not null,
            email varchar(255) not null,
            password varchar(255) not null,
            contact varchar(255),
            photo varchar(255),
            created_at varchar(255) not null,
            updated_at varchar(255) not null
        );
		CREATE TABLE IF NOT EXISTS events (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			author_id INTEGER,
			title VARCHAR(255) not null,
			banner_img VARCHAR(255),
			content TEXT not null,
			category_id INTEGER,
			start_time_event DATETIME,
			start_date_event DATE,
			contact VARCHAR(255),
			price INTEGER DEFAULT 0,
			type_event_id INTEGER,
			model_id INTEGER NOT NULL,
			location_details VARCHAR(255),
			register_url VARCHAR(255),
			created_at TIMESTAMP,
			updated_at TIMESTAMP,

			FOREIGN KEY (author_id) REFERENCES users(id),
			FOREIGN KEY (category_id) REFERENCES categories_event(id),
			FOREIGN KEY (type_event_id) REFERENCES type_events(id),
			FOREIGN KEY (model_id) REFERENCES models(id)
			);

		CREATE TABLE IF NOT EXISTS categories_event (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(255)
			);

		CREATE TABLE IF NOT EXISTS type_event (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(255)
			);

		CREATE TABLE IF NOT EXISTS models (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name VARCHAR(50) NOT NULL
			);

			`,
	)

	if err != nil {
		panic(err)
	}

	return db, nil
}
