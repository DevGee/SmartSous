#!/usr/bin/python3

from recipe_scrapers import scrape_me
import json
import time


#http://stackabuse.com/reading-and-writing-json-to-a-file-in-python/
#https://github.com/hhursev/recipe-scraper

# give the url as a string, it can be url from any site listed below
#scrape_me = scrape_me('http://allrecipes.com/recipe/12141/moms-pumpkin-pie/')
#scrape_me = scrape_me('http://allrecipes.com/recipe/162760/fluffy-pancakes/')
#scrape_me = scrape_me('http://allrecipes.com/recipe/246274/')

#print(scrape_me)
#print(scrape_me.title())
#print(scrape_me.total_time())
#print(scrape_me.ingredients())
#print(scrape_me.instructions())

load_data = {}
load_data['recipe'] = []

#data[scrape_me.title()] = []
#data[scrape_me.title()].append({ 

#with open('recipe-data-test.json') as outfile:
#    load_data = json.load(outfile)
#    outfile.close()

#for i in range(0,50):
for i in range(0,1):
    #scrape_me = scrape_me('http://allrecipes.com/recipe/162760/fluffy-pancakes/')
    #url = ''
    #url = str('http://allrecipes.com/recipe/' + str(7000 + i) + '/')
    #print(url)
    #urlnum = str(25950 + i)
    urlnum = str(235000 + i)
    try:
        recipe = scrape_me(str('http://allrecipes.com/recipe/' + urlnum + '/'))
        load_data['recipe'].append({
            'title': recipe.title(),
            'time': recipe.total_time(),
            'ingred': recipe.ingredients(),
            'instr': recipe.instructions(),
            'servings': recipe.serving_size(),
            'picurl': recipe.photo_url()
        })
        #print(recipe.title())
    except:
        #print('could not access recipe ' + i)
        pass
    
    time.sleep(5)


#with open('recipe-data.json', 'a') as outfile:
with open('recipe-data-test.json', 'w') as outfile2:
    #load_data = json.load(outfile)
    #load_data['recipe'].append
    outfile2.write(json.dumps(load_data))
    outfile2.close()
    #json.dump(data, file)
