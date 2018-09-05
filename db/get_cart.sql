select p.image, p.description, p.price, p.id, c.cart_id, u.user_name
from cart c
join products p on p.id = c.product_id
join users u on u.id = c.user_id