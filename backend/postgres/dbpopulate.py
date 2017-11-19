
import psycopg2
import json

def dbPopulate():
    try:
        conn = psycopg2.connect("dbname='smartsous' user='ss' password='devg' host='localhost'")
        cur = conn.cursor()
        #print("connected okay")
    except psycopg2.Error as e:
        #print ("Unable to connect to the database")
        #print (e.pgerror)
        return e.pgerror

    with open('recipe-data-test.json') as outfile:
        data = json.load(outfile)
        outfile.close() 

    print(data)


if __name__ == "__main__":
    dbPopulate()


