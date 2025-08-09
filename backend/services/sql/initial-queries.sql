-- Drop tables only if needed (optional for development)
DROP TABLE IF EXISTS 
  payment,
  order_item_services,
  order_items,
  orders,
  price,
  category,
  service,
  testimonial,
  gallery,
  user;

-- User table
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE DEFAULT NULL,
    phone VARCHAR(20) UNIQUE DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL DEFAULT NULL
);


-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL
);

-- Testimonial table
CREATE TABLE IF NOT EXISTS testimonial (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    rating TINYINT CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Service table
CREATE TABLE IF NOT EXISTS service (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(100) NOT NULL
);

-- Category table
CREATE TABLE IF NOT EXISTS category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    weight DECIMAL(5,2) NOT NULL
);

-- Price table
CREATE TABLE IF NOT EXISTS price (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    slaughter_price DECIMAL(10,2),
    cutting_price DECIMAL(10,2),
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

-- Orders table
-- Orders: One per user
-- CREATE TABLE IF NOT EXISTS orders (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   user_id INT NOT NULL,
--   payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
--   status ENUM('pending', 'accepted', 'rejected', 'in_progress', 'completed') DEFAULT 'pending',
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
-- );

-- -- Order Items: One per animal type (goat, sheep, etc.)
-- CREATE TABLE IF NOT EXISTS order_items (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   order_id INT NOT NULL,
--   category_id INT NOT NULL,
--   quantity INT DEFAULT 1,
--   amount DECIMAL(10,2) NOT NULL,
--   FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
--   FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
-- );

-- -- Order Item Services: slaughter, cutting per item
-- CREATE TABLE IF NOT EXISTS order_item_services (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   order_item_id INT NOT NULL,
--   service_id INT NOT NULL,
--   FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE CASCADE,
--   FOREIGN KEY (service_id) REFERENCES service(id) ON DELETE CASCADE
-- );

-- -- Payments: Support for quarter/full payment
-- CREATE TABLE IF NOT EXISTS payment (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   user_id INT NOT NULL,
--   order_id INT NOT NULL,
--   amount DECIMAL(10,2) NOT NULL,
--   date DATETIME DEFAULT CURRENT_TIMESTAMP,
--   status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
--   payment_type ENUM('full', 'quarter') DEFAULT 'full',
--   FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
--   FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
-- );


CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  animal VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  size VARCHAR(50),
  selected_date DATE,
  reservation_fee DECIMAL(10,2),
  status ENUM('pending','accepted','rejected','in_progress','completed') DEFAULT 'pending',
  payment_status ENUM('unpaid','paid') DEFAULT 'unpaid',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



