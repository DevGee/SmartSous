
import psycopg2
import json

def dbPopulate():
    try:
        conn = psycopg2.connect("dbname='smartsous' user='ss' password='devg' host='localhost'")
        cur = conn.cursor()
        #print("connected okay")
    except psycopg2.Error as e:
        print ("Unable to connect to the database")
        print (e.pgerror)
        return e.pgerror

    with open('../../scraper/recipe-data-test.json') as outfile:
        data = json.load(outfile)
        outfile.close() 

    #print(data)
   
    for recipe in data:
        #cur.execute("""insert into recipe (rec_name, cook_time, ingred, instr, pic_url, servings) values (%s, %s, %s, %s, %s, %s);""", (data[0]['title'], data[0]['time'], data[0]['ingred'], data[0]['instr'], data[0]['picurl'], data[0]['servings']))
        #cur.execute("""insert into recipe (rec_name, cook_time, ingred, instr, pic_url, servings) values (%s, %s, %s, %s, %s, %s);""", (recipe['title'], recipe['time'], recipe['ingred'], recipe['instr'], recipe['picurl'], recipe['servings']))

    conn.commit()
    
    
    
    #print(query_str.format(data[0]['title'], data[0]['time'], data[0]['ingred'], data[0]['instr'], data[0]['picurl'], data[0]['servings']))
        #print(recipe['title'])



if __name__ == "__main__":
    dbPopulate()


