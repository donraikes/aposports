select c.product_category_id as category_id,
	c.category as category,
	c.short_desc as category_description,
	c.image as image
from product_categories c
order by product_category_id;
