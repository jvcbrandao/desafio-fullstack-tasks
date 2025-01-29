
CREATE TABLE Task (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL
);
