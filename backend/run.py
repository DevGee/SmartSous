from flask import Flask
from flask import request
import psycopg2
import json

app = Flask(__name__)


# Yet to use SQLAlchemy instead of psycopg2 to eliminate raw SQL strings

def dbQuery(num, mode):
    try:
        conn = psycopg2.connect("dbname='smartsous' user='ss' password='devg' host='localhost'")
        cur = conn.cursor()
        #print("connected okay")
    except psycopg2.Error as e:
        #print ("Unable to connect to the database")
        #print (e.pgerror)
        return e.pgerror

    try:
        if mode is 0:
            cur.execute("select rec_id, rec_name, cook_time, servings, ingred, instr, pic_url from recipe;")

            rows = cur.fetchall()
            datalist = []

            for r in rows:
                data = {"rec_id": r[0],
                        "title": r[1],
                        "cooktime": r[2],
                        "servings": r[3],
                        "ingr": r[4],
                        "instr": r[5],
                        "pic_url": r[6]
                        }
                datalist.append(data)

            json_data = json.dumps(datalist)
            cur.close()
            conn.close()
            return json_data

        elif mode is 1:
            cur.execute("select inv from fridge where fr_id = (select fr_id from usr where usr_id=" + str(num) + ");")

            rows = cur.fetchone()
            rows = rows[0]
            datalist = []

            for r in rows:
                data = {"title": r[1], "qty": int(r[0])}
                datalist.append(data)

            #print(datalist)
            json_data = json.dumps(datalist)

            #print (json_data)
            cur.close()
            conn.close()
            return json_data
        elif mode is 2:
            data = request.data.decode("utf-8")
            #print("trying to update server")
            print(data)
            return data

        else:
            return 'unknown mode'

    except psycopg2.Error as e:
        conn.close()
        #print ("cannot select")
        #print (e.pgerror)
        return e.pgerror



@app.route('/api/rec_names/', methods=['GET'])
def get_rec_names():
    return dbQuery(0, 0)

@app.route('/')
def hello_world():
    """docstring for hello_world"""
    return 'Server is running'

@app.route('/api/fridge/<int:usr_id>', methods=['GET', 'POST'])
def get_fridge(usr_id):
    if (request.method == 'GET'):
        #fr_dbQuery()
        #return fr_dbQuery(usr_id)
        return dbQuery(usr_id, 1)
    else:
        return dbQuery(usr_id, 2)


