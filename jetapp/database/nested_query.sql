select 
	c.product_category_id as category_id,
	c.category as category,
	c.short_desc as short_desc,
cursor(select 
	p.product_id as product_id,
	p.name as name,
p.short_desc as short_desc,
p.price as unit_price,
p.quantity as quantity
from products p
where p.product_category_id = c.product_category_id) as products
from product_categories c
