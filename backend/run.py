from flask import Flask
from routes import test_get
import psycopg2
import json

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
        elif num is 3:
            cur.execute("select inv from fridge where fr_id = (select fr_id from usr where usr_id=3);")
        else :
            cur.execute("select * from usr;")

        rows = cur.fetchall()
        rows = rows[0][0]
        #rows = cur.fetchone()

        #data = {"title": rows[0][0][1], "qty": int(rows[0][0][0])}

        #json_data = json.dumps(data)

        print (type(rows))
        print (rows)
        cur.close()
        conn.close()
        return str(rows)
    except:
        conn.close()
        print ("cannot select")


def fr_dbQuery(u_id):
    try:
        conn = psycopg2.connect("dbname='smartsous' user='ss' password='devg' host='localhost'")
        print("connected okay")
    except:
        print ("Unable to connect to the database")

    try:
        cur = conn.cursor()
        cur.execute("select inv from fridge where fr_id = (select fr_id from usr where usr_id=" + str(u_id) + ");")

        #rows = cur.fetchall()
        rows = cur.fetchone()
        rows = rows[0]

        datalist = []

        for r in rows:
            data = {"title": r[1], "qty": int(r[0])}
            datalist.append(data)

        print(datalist)
        json_data = json.dumps(datalist)

        #print (rows)
        #print (type(rows[0][0][1]))
        #print (rows[0][0][1])
        print (json_data)
        cur.close()
        conn.close()
        return json_data
        #return "test"
        #return str(rows)
    except:
        conn.close()
        print ("cannot select")
        #return "no fridge data for user_id: " + str(u_id)
        return ""


@app.route('/')
def hello_world():
    """docstring for hello_world"""
    return 'Server is running'

#@app.route('/api/test/<num>', methods=['GET'])
@app.route('/api/test/<int:num>')
def get_string(num):
    #dbQuery()
    return dbQuery(num)

@app.route('/api/fridge/<int:usr_id>')
def get_fridge(usr_id):
    #fr_dbQuery()
    return fr_dbQuery(usr_id)




