from flask import Flask
from routes import test_get
import psycopg2

app = Flask(__name__)

def dbQuery():
    try:
        conn = psycopg2.connect("dbname='smartsous' user='ss' password='devg' host='localhost'")
        print("connected okay")
    except:
        print ("Unable to connect to the database")
        
    try:
        cur = conn.cursor()
        cur.execute("select rec_name, cook_time from recipe inner join fridge_recipe on recipe.rec_id = fridge_recipe.rec_id inner join comm on comm.fr_id = fridge_recipe.fr_id where comm.fr_id = 1;")
        rows = cur.fetchall()
        #print (rows)
        return str(rows)
    except:
        print ("cannot select")




@app.route('/')
def hello_world():
    """docstring for hello_world"""
    return 'Server is running'

@app.route('/api/test', methods=['GET'])
def get_string():
    #dbQuery()
    return dbQuery()


