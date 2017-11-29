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
        # get request for all recipe data
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

        # Get request for condensed recipe data
        elif mode is 3:
            cur.execute("select rec_id, rec_name, cook_time, servings, pic_url from recipe;")

            rows = cur.fetchall()
            datalist = []

            for r in rows:
                data = {"rec_id": r[0],
                        "title": r[1],
                        "cooktime": r[2],
                        "servings": r[3],
                        "pic_url": r[4]
                        }
                datalist.append(data)

            json_data = json.dumps(datalist)
            cur.close()
            conn.close()
            return json_data
        
        # Get recipe data for single recipe
        elif mode is 4:
            cur.execute("select rec_id, rec_name, cook_time, servings, ingred, instr, pic_url from recipe where rec_id =" + str(num) + ";")

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

        # Get fridge data for a user
        # NEW FORMAT:
        # [{"title": "ham", "qty", 5}, {"title": "pizza", "qty", 2}]
        elif mode is 1:
            cur.execute("select inv from fridge where fr_id = (select fr_id from usr where usr_id=" + str(num) + ");")

            rows = cur.fetchone()
            rows = rows[0]
            rows = json.dumps(rows)
            #rows = rows[0]
            #datalist = []



            print(rows)
            print(type(rows))

            #for r in rows:
            #    data = {"title": r[1], "qty": int(r[0])}
            #    datalist.append(data)

            #print(datalist)
            #json_data = json.dumps(datalist)

            #print (json_data)
            cur.close()
            conn.close()
            #return json_data
            return rows


        # Post request for fridge data
        #elif mode is 2:
        #    data = request.data
        #    #print("trying to update server")
        #    #print(data)
        #    
        #    # Do this Tuesday when Ash can meet,
        #    # need to rework structure of data
        #    # passed through requests

        #    return data

        ## Post request to create community
        #elif mode is 5:
        #    creator_id = num
        #    name = request.data[0]
        #    pass = request.data[1]
        #    #insert into comm (comm_name, passwd) values (name, pass) returning comm_id;
        #    #new_comm_id = cursor.fetchone()[0]
        #    return new_comm_id

        ## Post request to join community
        #elif mode is 6:
        #    #Pass in unique id and password
        #    #Need to check password
        #    unique_comm_id = passed in id
        #    attempted_pass = passed in pw
        #    #select passwd from comm where comm_id = unique_comm_id;
        #    truepw = cursor.fetchone()[0]
        #    if attempted_pass is truepw
        #        #Add current user to the new community
        #        #update comm set member_ids = array_append(member_ids, current_usr_id);
        #        return 'successfully joined community' + comm_id
        #    else
        #        #Reject request
        #        return 'failed to join community' + comm_id

        ## Post request to add item to inventory using barcode
        #elif mode is 7:
        #    # Pass in usr_id, name of item, ?qty?
        #    # First check if item already exists in fridge
        #    # Select * from fridge where fr_id = (select fr_id from usr where usr_id = CURRENT_USR_ID);
        #    fridge_data = cursor.fetchall()???
        #    fridge_data = jsonify fridgedata

        #    if KEY in fridge_data
        #        then increment quantity
        #    else add new item in fridge
        #        then add item to fridge


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

@app.route('/api/rec_names/short/', methods=['GET'])
def get_rec_names_short():
    return dbQuery(0, 3)

@app.route('/api/rec_data/<int:rec_id>', methods=['GET'])
def get_rec_data(rec_id):
    return dbQuery(rec_id, 4)

@app.route('/api/create_comm/<int:usr_id>', methods=['POST'])
def create_community(rec_id):
    return dbQuery(rec_id, 5)

@app.route('/')
def hello_world():
    """docstring for hello_world"""
    return 'Server is running'

@app.route('/api/fridge/<int:usr_id>', methods=['GET', 'POST'])
def fridge(usr_id):
    if (request.method == 'GET'):
        #fr_dbQuery()
        #return fr_dbQuery(usr_id)
        return dbQuery(usr_id, 1)
    else:
        return dbQuery(usr_id, 2)


