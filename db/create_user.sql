insert into users
(user_name, email, picture, auth_id)
values
($1,$2,$3,$4)
returning *;