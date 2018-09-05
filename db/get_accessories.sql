select p.price, p.description, p.image, p.id
from products p
join categories c on p.category_id = c.id
where category_id = 4