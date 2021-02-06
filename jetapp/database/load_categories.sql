-- 	File: load_categories.sql
--	Author:	Donald Raikes
--	Date Created: 02/02/2021
--	Last modified:	2021-02-03
--
--	changed the name of the table and id column.
-- ---------------------
insert into categories (category_id,category,short_desc,image)
values (1,'Baseball','Equipment we carry for baseball players','css/images/product_images/baseball.jpg,');
insert into categories (category_id,category,short_desc,image)
values(2,'Bicycling','Products we carry for biking enthusiasts','css/images/product_images/gpbike.jpg');
insert into categories (category_id,category,short_desc,image)
values (3,'Skiing','Equipment we carry for skiing enthusiasts','css/images/product_images/aceboot.jpg');
insert into categories (category_id,category,short_desc,image)
values (4,'Soccer','Equipment we carry for soccer players','css/images/product_images/jrsoccerball.jpg');
