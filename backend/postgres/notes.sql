https://www.commandprompt.com/blog/a_better_backup_with_postgresql_using_pg_dump/


CREATE TYPE food_itm AS (
  name text,
  count integer,
  price numeric
);


=================================

CREATE TABLE fridge (
  fr_id serial PRIMARY KEY,
  fr_inv text[][],
  tr_price numeric NOT NULL DEFAULT 0
);

CREATE TABLE usr (
  usr_id serial PRIMARY KEY,
  firstname text NOT NULL,
  lastname text NOT NULL,
  usrname text NOT NULL,
  email text,
  fr_id int references fridge(fr_id)
);

CREATE TABLE comm (
  comm_id serial PRIMARY KEY,
  comm_name text NOT NULL,
  fr_id int references fridge(fr_id)
);

CREATE TABLE usr_comm (
  usr_id int references usr(usr_id) ON UPDATE CASCADE ON DELETE CASCADE,
  comm_id int references comm(comm_id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT usr_comm_pkey PRIMARY KEY (usr_id, comm_id)
);

CREATE TABLE recipe (
  rec_id serial PRIMARY KEY,
  rec_name text NOT NULL,
  cook_time int,
  servings int,
  ingred text[][],
  instr text[]
  pic_url text
);

CREATE TABLE fridge_recipe (
  fr_id int references fridge(fr_id) ON UPDATE CASCADE ON DELETE CASCADE,
  rec_id int references recipe(rec_id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fridge_recipe_pkey PRIMARY KEY (fr_id, rec_id)
);


insert into usr (firstname, lastname, usrname) values ('Andrew', 'Law', 'andrew');
insert into usr (firstname, lastname, usrname) values ('Steven', 'Shih', 'steven');
insert into usr (firstname, lastname, usrname) values ('Ash', 'Tan', 'ash');



insert into comm (comm_name) values ('devG')



INSERT INTO my_table DEFAULT VALUES;

insert into usr_comm (usr_id, comm_id) values (1, 1);
insert into usr_comm (usr_id, comm_id) values (2, 1);
insert into usr_comm (usr_id, comm_id) values (3, 1);

insert into fridge_recipe (fr_id, rec_id) values (1, 4);
insert into fridge_recipe (fr_id, rec_id) values (1, 5);


insert into fridge (inv) values ('{{"4", "Ham"},{"2", "Bread"}, {"1", "Pizza"}}');

select *
from usr
inner join usr_comm
on usr.usr_id = usr_comm.usr_id
where usr_comm.comm_id = 1;

select firstname
from usr
inner join usr_comm
on usr.usr_id = usr_comm.usr_id
where usr_comm.comm_id = 1;

select * 
from fridge
inner join comm
on fridge.fr_id = comm.fr_id;

-- Get recipes that belong to community-id 1
select rec_name, cook_time
from recipe
inner join fridge_recipe
on recipe.rec_id = fridge_recipe.rec_id
inner join comm
on comm.fr_id = fridge_recipe.fr_id
where comm.fr_id = 1;

-- Get recipes that belong Ash
select rec_name, cook_time
from recipe
inner join fridge_recipe
on recipe.rec_id = fridge_recipe.rec_id
inner join usr
on usr.fr_id = fridge_recipe.fr_id
where usr.fr_id = 3; -- Select recipes that belong to Ash


alter table recipe
add column pic_url text;

 alter table recipe
alter ingred type text[][];

	
ALTER TABLE table_name RENAME COLUMN column_name TO new_column_name;

-- http://allrecipes.com/recipe/239414
insert into recipe (rec_name, cook_time, servings, ingred, instr, pic_url)
values ('Salt and Pepper Ribeye',
    30,
    1,
    '{"8 ounce ribeye",
    "1 tablespoon butter",
    "vegetable oil",
    "1/2 teaspoon ground black pepper"}',

    '{"Two days before cooking, salt both sides of each steak with 1/2 teaspoon Diamond Crystal(R) Kosher Salt per steak. Place steaks in an airtight container and refrigerate until ready to cook.",
    "Remove the steaks from the refrigerator about 30 minutes prior to cooking. Sprinkle both sides of steak with black pepper.",
    "Heat cast iron pan over medium-high heat until very hot. Add vegetable oil and heat until oil shimmers.",
    "Carefully place steaks in pan. Cook until brown and hard-seared on one side, 4 to 5 minutes.",
    "Turn steaks and top with one teaspoon butter. Cook for 3 to 4 more minutes or to desired doneness. You may need to cook the steaks in batches depending on the size of your cast iron pan. Keep the cooked steaks in a 170 degree F oven until ready to serve."}',
    'http://images.media-allrecipes.com/userphotos/70x70/1730860.jpg'
);

insert into recipe (rec_name, cook_time, servings, ingred, instr, pic_url)
values ('Baked Teriyaki Chicken', 60, 6,
    '{
    "1 tablespoon cornstarch" ,
    "1 tablespoon cold water",
    "1/2 cup white sugar",
    "1/2 cup soy sauce",
    "1/4 cup cider vinegar",
    "1 clove garlic, minced",
    "1/2 teaspoon ground ginger",
    "1/4 teaspoon ground black pepper",
    "12 skinless chicken thighs"
    }',
    '{
    "In a small saucepan over low heat, combine the cornstarch, cold water, sugar, soy sauce, vinegar, garlic, ginger and ground black pepper. Let simmer, stirring frequently, until sauce thickens and bubbles.",
    "Preheat oven to 425 degrees F (220 degrees C).",
    "Place chicken pieces in a lightly greased 9x13 inch baking dish. Brush chicken with the sauce. Turn pieces over, and brush again.",
    "Bake in the preheated oven for 30 minutes. Turn pieces over, and bake for another 30 minutes, until no longer pink and juices run clear. Brush with sauce every 10 minutes during cooking."
    }',
    'http://images.media-allrecipes.com/userphotos/70x70/4569917.jpg'
);


insert into recipe (rec_name, cook_time, servings, ingred, instr, pic_url)
values ('Oven Scrambled Eggs', 35, 12,
    '{
    "1/2 cup butter or margarine, melted", "24 eggs", "2 1/4 teaspoons salt", "2 1/2 cups milk"
    }',
    '{
    "Preheat the oven to 350 degrees F (175 degrees C).",
    "Pour melted butter into a glass 9x13 inch baking dish. In a large bowl, whisk together eggs and salt until well blended. Gradually whisk in milk. Pour egg mixture into the baking dish.",
    "Bake uncovered for 10 minutes, then stir, and bake an additional 10 to 15 minutes, or until eggs are set. Serve immediately."
    }',
    'http://images.media-allrecipes.com/userphotos/70x70/642809.jpg'
);



insert into recipe (rec_name, cook_time, servings, ingred, instr, pic_url)
values ('Miso Soup', 30, 4,
    '{
    "4 cups water",
    "1/2 cup bonito flakes",
    "1 (4 inch) piece dashi kombu (dried kelp)",
    "1/2 (12 ounce) package tofu, cut into chunks",
    "1 teaspoon dried wakame",
    "3 tablespoons miso paste",
    "1/4 cup chopped green onions"
    }',
    '{

    "Heat water in a large pot over low heat. Add kombu and cook until the mixture just begins to simmer. Stir bonito flakes into kombu mixture until combined. Remove pot from the heat and let dashi sit, uncovered, for 5 minutes. Strain and set aside.",
    "Heat 3 1/2 cups dashi in a pot over medium heat. Add tofu and wakame; stir to combine. Remove 1 cup warmed dashi to a small bowl and whisk in miso paste. Pour miso mixture back into the pot with remaining dashi. Stir until warmed through. Serve garnished with chopped green onions."
    }',
    'http://images.media-allrecipes.com/userphotos/70x70/1115077.jpg'
);

-- http://allrecipes.com/recipe/9189
insert into recipe (rec_name, cook_time, servings, ingred, instr, pic_url)
values ('Pumpkin Pie',
    60,
    8,
    '{
    "1 egg",
    "1 tablespoon all-purpose flour",
    "3/4 cup white sugar",
    "1/2 teaspoon salt",
    "1 1/2 cups pumpkin puree",
    "1 1/2 cups evaporated milk",
    "1/2 teaspoon ground cinnamon",
    "1/2 teaspoon ground ginger",
    "1/4 teaspoon ground nutmeg",
    "2 tablespoons light corn syrup",
    "1 recipe pastry for a 9 inch single crust pie"
    }',
    
    '{
    "Preheat oven to 450 degrees F (230 degrees C).",
    "Add the sugar gradually to the pumpkin puree. Beat well an stir in the flour, salt and spices. Stir in the corn syrup and beat well. Stir in the slightly beaten egg, then slowly add the evaporated milk, mixing until well blended. Pour the batter into the unbaked pie shell.",
    "Bake at 450 degrees F (230 degrees C) for 10 minutes then reduce the oven temperature to 325 degrees F (165 degrees F) and continue baking pie for an additional 30 minutes or until a knife inserted into the mixture comes out clean."  
    }',

    'http://images.media-allrecipes.com/userphotos/70x70/547410.jpg'
);


-- Getting fridge info
select * from fridge where fr_id = (select fr_id from usr where usr_id=3);


