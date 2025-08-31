CREATE DATABASE ajio;
USE ajio;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    image TEXT,
    price DECIMAL(10,2),
    category VARCHAR(100)
);

CREATE TABLE banners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image TEXT
);
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  address TEXT,
  payment VARCHAR(50),
  products TEXT,
  order_date DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE orders ADD COLUMN status VARCHAR(50) DEFAULT 'Pending';
ALTER TABLE products ADD COLUMN category VARCHAR(100);
ALTER TABLE orders ADD COLUMN payment_details VARCHAR(255);

ALTER TABLE orders 
  MODIFY COLUMN status VARCHAR(50) DEFAULT 'pending',
  MODIFY COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
  
INSERT INTO products (name, description, price, image, category)
VALUES ('Men\'s T-Shirt', 'Cotton round neck tee', 499, 'mens-shirt.jpg', 'Men');




