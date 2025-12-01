CREATE TABLE customer (
  customer_ID INT NOT NULL PRIMARY KEY,
  firstname VARCHAR(30) NULL,
  lastname VARCHAR(30) NULL,
  `password` VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NULL,
  email VARCHAR(100) NOT NULL,
  CONSTRAINT CHK_CustomerPassword_Length CHECK (LENGTH(`password`) >= 8)
);

CREATE TABLE carts (
  carts_ID INT NOT NULL PRIMARY KEY,
  created_at DATETIME NOT NULL,
  customer_ID INT NOT NULL,
  FOREIGN KEY(customer_ID) REFERENCES customer(customer_ID)
);

CREATE TABLE category (
  category_ID INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(30) NOT NULL,
  image_url VARCHAR(255),
  `description` VARCHAR(255)
);

CREATE TABLE menuitem (
  menuitem_ID INT NOT NULL PRIMARY KEY,
  `Name` VARCHAR(30) NOT NULL,
  Price VARCHAR(30) NOT NULL,
  `Description` VARCHAR(255),
  category_ID INT NOT NULL,
  FOREIGN KEY(category_ID) REFERENCES category(category_ID)
);

CREATE TABLE cartsitem (
  cartsitem_ID INT NOT NULL PRIMARY KEY,
  quantity INT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  menuitem_ID INT NOT NULL,
  carts_ID INT NOT NULL,
  FOREIGN KEY(menuitem_ID) REFERENCES menuitem(menuitem_ID),
  FOREIGN KEY(carts_ID) REFERENCES carts(carts_ID)
);

CREATE TABLE customer_phone (
  phone VARCHAR(20) NOT NULL,
  customer_ID INT NOT NULL,
  PRIMARY KEY(customer_ID, phone),
  FOREIGN KEY(customer_ID) REFERENCES customer(customer_ID)
);

CREATE TABLE restaurant (
  restaurant_ID INT NOT NULL PRIMARY KEY,
  `name` VARCHAR(30) NOT NULL,
  cityaddress VARCHAR(20) NOT NULL,
  streetaddress VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NULL,
  opening_time TIME NOT NULL,
  close_time TIME NOT NULL,
  delivery_fee INT NOT NULL DEFAULT 0
);

CREATE TABLE restaurant_phone (
  restaurant_ID INT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  -- Removed customer_ID and PRIMARY KEY that seemed incorrect for this table
  PRIMARY KEY(restaurant_ID, phone),
  FOREIGN KEY(restaurant_ID) REFERENCES restaurant(restaurant_ID)
);

CREATE TABLE coupon (
  coupon_ID INT NOT NULL PRIMARY KEY,
  code VARCHAR(50) NOT NULL,
  discount_value DECIMAL(10,2) NULL,
  discount_type VARCHAR(20) NULL,
  expiry_data DATE NULL,
  max_uses INT NULL
);

CREATE TABLE deliveryperson (
  deliveryperson_ID INT NOT NULL PRIMARY KEY,
  firstname VARCHAR(30) NULL,
  lastname VARCHAR(30) NULL,
  phone VARCHAR(20) NOT NULL
);

CREATE TABLE orders (
  orders_ID INT NOT NULL PRIMARY KEY,
  restaurant_ID INT NOT NULL,
  customer_ID INT NOT NULL,
  coupon_ID INT NULL, -- Made nullable as not every order has a coupon
  cityaddress VARCHAR(30) NOT NULL,
  streetaddress VARCHAR(100) NOT NULL,
  order_Data DATETIME NOT NULL, -- Changed from varchar
  `status` VARCHAR(20) NULL,
  FOREIGN KEY (restaurant_ID) REFERENCES restaurant(restaurant_ID),
  FOREIGN KEY (customer_ID) REFERENCES customer(customer_ID),
  FOREIGN KEY (coupon_ID) REFERENCES coupon(coupon_ID)
);

CREATE TABLE delivery (
  delivery_ID INT NOT NULL PRIMARY KEY,
  `status` VARCHAR(30) NOT NULL,
  time_started DATETIME NULL,
  time_delivered DATETIME NULL,
  fees DECIMAL(10,2) NOT NULL,
  orders_ID INT NOT NULL,
  deliveryperson_ID INT NOT NULL,
  FOREIGN KEY (deliveryperson_ID) REFERENCES deliveryperson(deliveryperson_ID),
  FOREIGN KEY (orders_ID) REFERENCES orders(orders_ID),
  CONSTRAINT CHK_DeliveryFees_Positive CHECK (fees >= 0) -- Allow 0 fees
);

CREATE TABLE order_item (
  orders_ID INT NOT NULL,
  product_ID INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (orders_ID, product_ID),
  FOREIGN KEY (orders_ID) REFERENCES orders(orders_ID)
  -- Assuming product_ID refers to menuitem_ID
  -- FOREIGN KEY (product_ID) REFERENCES menuitem(menuitem_ID) -- This might be needed
);

CREATE TABLE payment (
  Payment_ID INT NOT NULL PRIMARY KEY,
  orders_ID INT NOT NULL,
  Amount DECIMAL(10, 2) NOT NULL,
  Payment_Method VARCHAR(30) NOT NULL, 
  Payment_Status VARCHAR(20) NOT NULL, 
  Payment_Gateway VARCHAR(50) NULL,     
  Transaction_ID VARCHAR(100) NULL,          
  FOREIGN KEY (orders_ID) REFERENCES orders(orders_ID)
);

CREATE TABLE serves (
  UniquelID INT NOT NULL PRIMARY KEY,
  restaurant_ID INT NOT NULL,
  category_ID INT NOT NULL,
  FOREIGN KEY (restaurant_ID) REFERENCES restaurant(restaurant_ID),
  FOREIGN KEY (category_ID) REFERENCES category(category_ID)
);
