insert into transactions
(transaction)
values
($1)
returning *;