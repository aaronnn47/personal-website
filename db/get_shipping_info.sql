select s.firstname, s.lastname, s.address, s.city, s.st, s.zip,s.user_id
from shippingInfo s
join users u on s.user_id = u.id
where user_id = $1