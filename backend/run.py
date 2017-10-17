from flask import Flask
from routes import test_get
import psycopg2

app = Flask(__name__)

@app.route('/')
def hello_world():
    """docstring for hello_world"""
    return 'Server is running'

@app.route('/api/test', methods=['GET'])
def get_string():
    dbQuery()
    return 'testing api GET'


def dbQuery():
    try:
        conn = psycopg2.connect("dbname='smartsous' user='postgres' host='localhost'")
        print("connected okay")

    except:
        print ("Unable to connect to the database")
        
    cur = conn.cursor()
    try:
        cur.execute("select rec_name, cook_time from recipe inner join fridge_recipe on recipe.rec_id = fridge_recipe.rec_id inner join comm on comm.fr_id = fridge_recipe.fr_id where comm.fr_id = 1;")
    except:
        print ("cannot select")


    rows = cur.fetchall()

    for row in rows:
        print ("  ", row[0])







