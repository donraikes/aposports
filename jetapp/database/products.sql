select c.category_id as category_id,
trim(c.category) as category,
trim(c.short_desc) as short_desc,
trim(c.image) as image,
cursor(select p.product_id as product_id,
trim(p.name) as name,
trim(p.short_desc) as short_desc,
trim(p.image) as image
from products p
where p.category_id = c.category_id
order by p.category_id,p.product_id) as products
from categories c
order by c.category_id
/
