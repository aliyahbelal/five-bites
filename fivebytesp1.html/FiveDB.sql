CREATE DATABASE FiveDB;
GO
USE FiveDB;
GO
CREATE TABLE customer 
(
  customer_ID INT not null PRIMARY KEY ,
  firstname varchar(30)  null ,
  lastname  varchar(30)  null , 
  password  varchar(100) not null ,
  phone     varchar(20)   null    ,
  email     varchar(100)  not null 
)

 ALTER TABLE customer
ADD CONSTRAINT CHK_CustomerPassword_Length CHECK (LEN(password) >= 8);
GO


CREATE TABLE carts
(
carts_ID INT not null PRIMARY KEY ,
created_at DATETIME not null ,
customer_ID INT not null , 
Foreign KEY(customer_ID) references customer(customer_ID)
 ) 
 
CREATE TABLE category
(
category_ID INT not null PRIMARY KEY ,
name varchar(30) not null ,
image_url varchar(30)  null ,
description varchar(30)  null ,

)




CREATE TABLE  menuitem
(
menuitem_ID INT not null PRIMARY KEY ,
Name varchar(30) not null ,
Price varchar(30) not null ,
Description varchar(30)  null ,
Image_url varchar(30)  null ,
category_ID INT not null , 
Foreign KEY(category_ID) REFERENCES category(category_ID)
);

ALTER TABLE menuitem
DROP COLUMN Image_url;


CREATE TABLE cartsitem
(
cartsitem_ID INT not null PRIMARY KEY ,
quantity INT not null ,
total_price decimal(10,2) not null ,
menuitem_ID INT not null ,
carts_ID INT not null ,
Foreign KEY(menuitem_ID) references menuitem(menuitem_ID) ,
Foreign KEY(carts_ID) references carts(carts_ID) 

)






CREATE TABLE customer_phone
(

phone INT not null ,
customer_ID INT not null ,
PRIMARY KEY(customer_ID, phone), 
Foreign KEY(customer_ID) references customer(customer_ID)

)

ALTER TABLE customer_phone
ALTER COLUMN phone INT NOT NULL;




  CREATE TABLE restaurant 
  (
  restaurant_ID INT not null PRIMARY KEY, 
  name varchar(30) not null ,
  cityaddress varchar(20) not null  ,
  streetaddress varchar(100) not null,
  phone varchar(20)  not null    ,
  email varchar(100)   null ,
  opening_time time not null ,
  close_time time not null , 
  delivery_fee INT not null Default 0
  )





  
  CREATE TABLE restaurant_phone 
  (
  restaurant_ID INT not null ,
  phone INT not null ,
  customer_ID INT not null ,
  PRIMARY KEY(customer_ID, phone), 
  Foreign KEY(customer_ID) references customer(customer_ID)

  
  )
  
  
  
  
  
  CREATE TABLE coupon 
  (
  coupon_ID INT not null PRIMARY KEY ,
  code varchar(50) not null ,
  discount_value decimal(10,2) null , 
  discount_type varchar(20) null , 
  expiry_data DATE null ,
  max_uses INT null 
  
  )
  
  CREATE TABLE deliveryperson
  (
  deliveryperson_ID INT not null PRIMARY KEY ,
  firstname varchar(30)  null ,
  lastname  varchar(30)  null ,
  phone     varchar(20) not null 
  )
  
  


  
  CREATE TABLE orders 
(
  orders_ID INT not null PRIMARY KEY ,
  restaurant_ID INT not null  , 
  customer_ID INT not null   ,
  coupon_ID INT not null   ,
  cityaddress varchar(30) not null ,
  streetaddress varchar(30) not null , 
  order_Data  varchar(100) not null ,
  status     varchar(20)   null    ,
  Foreign KEY (restaurant_ID) references restaurant(restaurant_ID),
  Foreign KEY (customer_ID) references customer(customer_ID),
  Foreign KEY (coupon_ID) references coupon(coupon_ID),
  
)



  CREATE TABLE delivery
  (
  delivery_ID INT not null PRIMARY KEY ,
  status NVARCHAR(30) not null ,
  time_started DATETIME null ,
  time_delivered DATETIME null ,
  cityaddress NVARCHAR(30) not null ,
  streetaddress NVARCHAR(100) ,
  fees DECIMAL(10,2) not null ,
  orders_ID INT not null , 
  deliveryperson_ID INT not null ,
  FOREIGN KEY (deliveryperson_ID) REFERENCES deliveryperson(deliveryperson_ID) ,
  FOREIGN KEY (orders_ID) REFERENCES orders(orders_ID)
  
  )
  
  ALTER TABLE delivery
  ADD CONSTRAINT CHK_DeliveryFees_Positive 
  
CHECK (fees > 0);

CREATE TABLE deliveryperson_phone 
 (
 deliveryperson_ID INT not null ,
 phone varchar(20) not null , 
 PRIMARY KEY(deliveryperson_ID,phone) ,
 FOREIGN KEY (deliveryperson_ID) REFERENCES deliveryperson(deliveryperson_ID)
 
 )
  
  DROP TABLE deliveryperson_phone;

CREATE TABLE order_item
(

    orders_ID INT not null ,
    product_ID INT not null ,
    quantity INT not null ,
    price DECIMAL(10, 2) not null ,
    PRIMARY KEY (orders_ID, product_ID), 
    FOREIGN KEY (orders_ID) REFERENCES orders(orders_ID),
    
);

CREATE TABLE payment
(
    Payment_ID INT not null PRIMARY KEY,
    
    orders_ID INT not null,
    Amount DECIMAL(10, 2) not null,  
    Payment_Method NVARCHAR(30) not null, 
    Payment_Status VARCHAR(20) not null, 
    Payment_Gateway VARCHAR(50) null,     
    Transaction_ID VARCHAR(100) null,          
    FOREIGN KEY (orders_ID) REFERENCES orders(orders_ID)
);








CREATE TABLE serves 
  (
  UniquelID INT not null PRIMARY KEY ,
  restaurant_ID INT not null ,
  category_ID INT not null ,
  Foreign KEY (restaurant_ID) references restaurant(restaurant_ID),
  Foreign KEY (category_ID) references category(category_ID),
  )