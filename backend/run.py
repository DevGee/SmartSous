from flask import Flask
from routes import test_get
import psycopg2

app = Flask(__name__)


def dbQuery(num):
    try:
        conn = psycopg2.connect("dbname='smartsous' user='ss' password='devg' host='localhost'")
        print("connected okay")
    except:
        print ("Unable to connect to the database")

    try:
        cur = conn.cursor()
        if num is 1:
            cur.execute("select rec_name from recipe inner join fridge_recipe on recipe.rec_id = fridge_recipe.rec_id inner join comm on comm.fr_id = fridge_recipe.fr_id where comm.fr_id = 1;")
        elif num is 2:
            cur.execute("select cook_time from recipe inner join fridge_recipe on recipe.rec_id = fridge_recipe.rec_id inner join comm on comm.fr_id = fridge_recipe.fr_id where comm.fr_id = 1;")
        else :
            cur.execute("select * from usr;")

        rows = cur.fetchall()
        #print (rows)
        cur.close()
        conn.close()
        return str(rows)
    except:
        conn.close()
        print ("cannot select")


@app.route('/')
def hello_world():
    """docstring for hello_world"""
    return 'Server is running'

#@app.route('/api/test/<num>', methods=['GET'])
@app.route('/api/test/<int:num>')
def get_string(num):
    #dbQuery()
    return dbQuery(num)


