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
        elif mode is 2:
            data = request.data.decode('utf-8')
            #print("trying to update server")
            print(data)
            print(type(data))
            
            jdata = json.loads(data)
            print(type(jdata))
            print(jdata['title'])
            item_name = jdata['title']

            cur.execute("select inv from fridge where fr_id = (select fr_id from usr where usr_id=" + str(num) + ");")
            rows = cur.fetchone()
            rows = rows[0]
            #rows = json.dumps(rows)
            print(rows)
            print(type(rows))
            #rows = json.loads(rows)

        
            for item in rows:
                #print(item)
                #print('item[title]: ' + item['title'])
                #print('item_name: ' + item_name)
                if item['title'] == item_name:
                    #print('qty before' + str(item['qty']))
                    item['qty'] = jdata['qty']
                    #print('qty after' + str(item['qty']))

            print(rows)
            print(jdata['userID'])
            query = "update fridge set inv = \'" + str(json.dumps(rows)) + "\' where fr_id = (select fr_id from usr where fb_id = \'" + str(jdata['userID']) + "\');" 
            print(query)
            cur.execute(query)
            conn.commit()
        
            #print(type(rows))
            #print(data['title'])
            #for item in data:
            #    print(item.title)
            
            
            
            # Do this Tuesday when Ash can meet,
            # need to rework structure of data
            # passed through requests

            return data

        # Post request to create community
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

        # Post request to add item to inventory using barcode
        elif mode is 7:
            data = request.data.decode('utf-8')
            #print("trying to update server")
            print(data)
            print(type(data))
            
            data = json.loads(data)
            print(type(data))
            fbid = data['userID']
            itemname = data['name']

            print(fbid)
            print(itemname)

            # Pass in usr_id, name of item, ?qty?
            # First check if item already exists in fridge
            query = "select inv from fridge where fr_id = (select fr_id from usr where fb_id = " + "\'" + fbid + "\');"
            cur.execute(query)

            fridge_data = cur.fetchone()
            fridge_data = fridge_data[0]
            
            print(type(fridge_data))

            item_exists = False
            for item in fridge_data:
                if item['title'] == itemname:
                    item_exists = True
                    cur_qty = item['qty']
                    item['qty'] = cur_qty + 1

            if (not item_exists):
                #add item to the fridge with qty 1
                new_item = {}
                new_item['title'] = itemname
                new_item['qty'] = 1
                #json_data = json.dumps(new_item)
                json_data = new_item
                print(json_data)
                fridge_data.append(json_data)

            query = "update fridge set inv = \'" + str(json.dumps(fridge_data)) + "\' where fr_id = (select fr_id from usr where fb_id = \'" + str(fbid) + "\');" 
            print(query)
            cur.execute(query)
            conn.commit()
            #fridge_data = json.dumps(rows)
            #fridge_data = jsonify fridgedata

            #if KEY in fridge_data
            #    then increment quantity
            #else add new item in fridge
            #    then add item to fridge

            return itemname
    

        ## Post request to add item to inventory using name and qty
        elif mode is 8:
            data = request.data.decode('utf-8')
            data = json.loads(data)

            print(type(data))
            print(data)

            fbid = data['userID']
            itemname = data['title']
            quantity = data['qty']

            print(fbid)
            
            query = "select inv from fridge where fr_id = (select fr_id from usr where fb_id = \'" + str(fbid) + "\');"
            print(query)
            cur.execute(query)
            rows = cur.fetchone()
            rows = rows[0]

            print(rows)

            newitem = {}
            newitem['title'] = itemname
            newitem['qty'] = quantity

            print(newitem)

            rows.append(newitem)
            print('just before updating inv')

            query = "update fridge set inv = \'" + str(json.dumps(rows)) + "\' where fr_id = (select fr_id from usr where fb_id = \'" + str(fbid) + "\');" 
            print(query)
            cur.execute(query)
            conn.commit()

            return itemname

        elif mode is 9:
            data = request.data.decode('utf-8')
            data = json.loads(data)

            print(type(data))
            print(data)

            fbid = data['userID']
            itemname = data['title']

            print(fbid)
            
            query = "select inv from fridge where fr_id = (select fr_id from usr where fb_id = \'" + str(fbid) + "\');"
            print(query)
            cur.execute(query)
            rows = cur.fetchone()
            rows = rows[0]

            print(rows)

            print('just before updating inv')

            rows[:] = [item for item in rows if item.get('title') != itemname]
            query = "update fridge set inv = \'" + str(json.dumps(rows)) + "\' where fr_id = (select fr_id from usr where fb_id = \'" + str(fbid) + "\');" 
            print(query)
            cur.execute(query)
            conn.commit()

            return itemname



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

@app.route('/api/barcode/', methods=['POST'])
def barcode():
    return dbQuery(0, 7)

@app.route('/api/fridge_add/', methods=['POST'])
def fridge_add():
    return dbQuery(0, 8)

@app.route('/api/fridge_delete/', methods=['PUT'])
def fridge_delete():
    return dbQuery(0, 9)

@app.route('/')
def hello_world():
    """docstring for hello_world"""
    return 'Server is running'

@app.route('/api/fridge/<int:usr_id>', methods=['GET', 'POST', 'PUT'])
def fridge(usr_id):
    if (request.method == 'GET'):
        #fr_dbQuery()
        #return fr_dbQuery(usr_id)
        return dbQuery(usr_id, 1)
    else:
        return dbQuery(usr_id, 2)


