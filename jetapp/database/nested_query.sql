select 
	c.category_id as category_id,
	c.category as category,
	c.short_desc as short_desc,
cursor(select 
	p.product_id as product_id,
	p.name as name,
p.short_desc as short_desc,
p.price as unit_price,
p.quantity as quantity
from products p
where p.category_id = c.category_id
order by c.category_id,p.product_id
) as products
from categories c
order by c.category_id
