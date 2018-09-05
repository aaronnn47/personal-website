create table users(
    id serial primary key,
    user_name varchar(180),
    email varchar(180),
    picture text,
    auth_id text
);

create table transactions(
    id serial primary key,
    transaction integer
)

create table categories(
    id serial primary key,
    category text
)

create table shirts
(id serial primary key,
price integer,
description text,
image text,
category_id integer, foreign key(category_id) references categories(id))

insert into shirts
(price, description, image, category_id)
values
(20, 'shirt', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-2b9a1929_1500x.jpg?v=1501498201', 1),
(24, 'shirt', 'https://cdn.shopify.com/s/files/1/1170/3026/products/will_work_for_btc_no_qr_code_8cf7f20a-ea62-46e6-8fa1-0bd63e775b8b_1500x.jpg?v=1503247432', 1),
(20, 'shirt', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-ff295f1e_1500x.jpg?v=1503247379', 1),
(20, 'shirt', 'https://cdn.shopify.com/s/files/1/1170/3026/products/bc_official_royal_blue_lemon_3469fa06-3730-40fc-bfd0-bf93052ebd0c_1500x.png?v=1501492486', 1),
(30, 'shirt', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-d18d42d3_1500x.jpg?v=1508212475', 1),
(25, 'shirt', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-bb2b2126_1000x.jpg?v=1501495069', 1),
(20, 'shirt', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-d00fa017_1500x.jpg?v=1501494777', 1),

(25, 'accept bitcoin tanktop', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-ecb924aa_1500x.jpg?v=1501491176', 2),
(20, 'bitcoin tank-top', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-cabe51b6_1500x.jpg?v=1501498425', 2),
(22, 'symbol tank', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-12ed0b27_1500x.jpg?v=1503247503', 2),
(23, 'rocket tank top', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-2aaf9367_1500x.jpg?v=1503246277', 2),
(28, 'i heart bitcoin', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-dd6223ef_1500x.jpg?v=1501494877', 2),

(22, 'b is for bitcoin ', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-98983cdb_1500x.jpg?v=1501491419', 3),
(21, 'binary baby', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-429dd6e4_1500x.jpg?v=1501491675', 3),
(25, 'baby university', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-d54f4c3e_1500x.jpg?v=1501492358', 3),
(22, 'baby onsie', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-0b3778d9_1500x.jpg?v=1501495782', 3),
(25, 'coin gecko', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-3ad96eff_1500x.jpg?v=1501492968', 3)


create table hats
(id serial primary key, price integer, description text, image text, category_id integer, foreign key(category_id) references categories(id))

insert into hats
(price, description, image, category_id)
values 
(20, 'ethereum snapback', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-2325297e_1500x.jpg?v=1501494024', 5),
(15, 'dash snapback', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-80c5faed_1500x.jpg?v=1501493393', 5),
(20, 'make bitcoin great', 'https://cdn.shopify.com/s/files/1/1170/3026/products/mockup-c17e7ea7_1500x.jpg?v=1501495501', 5),
(20, 'bitcoin snapback', 'https://cdn.shopify.com/s/files/1/1170/3026/products/bitcoin_hats_final_1500x.jpg?v=1498905906', 5),

create table accessories 
(id serial primary key, price integer, description text, image text, category_id integer, foreign key(category_id) references categories(id))

insert into accessories
(price, description, image, category_id)
values
(5, 'bitcoin keychain','https://cdn.shopify.com/s/files/1/1170/3026/products/94-thickbox_default_1500x.jpg?v=1504199043', 4),
(5,'decentralized keychain','https://cdn.shopify.com/s/files/1/1170/3026/products/23x44-Key-BTC_1500x.jpg?v=1501499163',4),
(5,'bitsoap','https://cdn.shopify.com/s/files/1/1170/3026/products/bitcoin_soap_200x.jpg?v=1498905317',4),
(5,'ethersoap','https://cdn.shopify.com/s/files/1/1170/3026/products/eth_single_large_1500x.jpg?v=1503244847',4),
(15,'phone case','https://cdn.shopify.com/s/files/1/1170/3026/products/personalized_mockup_Back_iPhone-6-Plus6s-Plus_5cae32fb-e827-46ea-86bf-a4d70979b1ab_1500x.jpg?v=1503246158',4)

insert into hats
(price, description, )




select p. 
from cart ca
join categories c on c.id = ca.category_id
join products p on p.id = ca.product_id 

create table shippingInfo
(id serial primary key, firstname text, lastname text, address text, city text, st text, zip text, 
user_id integer, foreign key(user_id) references users(id) )

create table cart
(
cart_id serial primary key,
user_id integer, foreign key(user_id) references users(id),
product_id integer, foreign key(product_id) references products(id)
)