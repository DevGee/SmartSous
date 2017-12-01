from flask import Flask

from flask import request
import psycopg2
import json

app = Flask(__name__)


# Yet to use SQLAlchemy instead of psycopg2 to eliminate raw SQL strings

def dbQuery(num, mode, comm):
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
             
            query = "select fb_id from usr;" 
            cur.execute(query)
            raw_fb_ids = cur.fetchall()
            fb_ids = []

            for id in raw_fb_ids:
                fb_ids.append(str(id[0]))
            
            #print(fb_ids)
            #print(str(num))

            if str(num) not in fb_ids:

                query = "insert into fridge (inv) values (\'[]\') returning fr_id"
                #print(query)
                cur.execute(query)
                conn.commit()
                new_fr_id = cur.fetchone()[0]

                query = "insert into usr (fr_id, fb_id) values ({}, \'{}\')".format(new_fr_id, num)
                cur.execute(query)
                conn.commit()

            if comm is 0:
                query = "select inv from fridge where fr_id = (select fr_id from usr where fb_id = \'{}\');".format(num)
            else:
                query = "select inv from fridge where fr_id = (select fr_id from comm where comm_id = (select comm_id from usr where fb_id = \'{}\'));".format(num)
           
            #print(query)
            cur.execute(query)

            rows = cur.fetchone()
            rows = rows[0]
            rows = json.dumps(rows)
            #rows = rows[0]
            #datalist = []

            #print(rows)
            #print(type(rows))

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
            #print(data)
            #print(type(data))
            
            jdata = json.loads(data)
            #print(type(jdata))
            #print(jdata['title'])
            item_name = jdata['title']

            if comm is 0:
                query = "select inv from fridge where fr_id = (select fr_id from usr where fb_id = \'{}\');".format(num)
            else:
                query = "select inv from fridge where fr_id = (select fr_id from comm where comm_id = (select comm_id from usr where fb_id = \'{}\'));".format(num)

            #print(query)
            cur.execute(query)

            rows = cur.fetchone()
            rows = rows[0]
            #rows = json.dumps(rows)
            #print(rows)
            #print(type(rows))
            #rows = json.loads(rows)

        
            for item in rows:
                #print(item)
                #print('item[title]: ' + item['title'])
                #print('item_name: ' + item_name)
                if item['title'] == item_name:
                    #print('qty before' + str(item['qty']))
                    item['qty'] = jdata['qty']
                    #print('qty after' + str(item['qty']))

            #print(rows)
            #print(jdata['userID'])
            if comm is 0:
                query = "update fridge set inv = \'{}\' where fr_id = (select fr_id from usr where fb_id = \'{}\');".format(str(json.dumps(rows)), str(jdata['userID']))
            else:
                query = "update fridge set inv = \'{}\' where fr_id = (select fr_id from comm where comm_id = (select comm_id from usr where fb_id = \'{}\'));".format(str(json.dumps(rows)), str(jdata['userID']))

            #print(query)
            cur.execute(query)
            conn.commit()
        
            #print(type(rows))
            #print(data['title'])
            #for item in data:
            #print(item.title)
            
            
            
            # Do this Tuesday when Ash can meet,
            # need to rework structure of data
            # passed through requests

            return data

        # Post request to create community
        elif mode is 5:
            data = request.data.decode('utf-8')
            data = json.loads(data)

            #print(type(data))
            #print(data)

            creator_fbid = data['userID']
            name = data['name']
            passwd = data['password']

            # First leave current community
            query = "update comm set member_ids = array_remove(member_ids, \'{}\');".format(creator_fbid)
            #print(query)
            cur.execute(query)
            query = "update usr set comm_id = null where fb_id = \'{}\';".format(creator_fbid)
            #print(query)
            cur.execute(query)
            conn.commit()

            #query = "update usr set comm_id = {} where fb_id = \'{}\';".format(key, creator_fbid)
            query = "insert into fridge (inv) values (\'[]\') returning fr_id"
            #print(query)
            cur.execute(query)
            conn.commit()
            new_fr_id = cur.fetchone()[0]

            query = "insert into comm (comm_name, passwd, fr_id) values (\'{}\', \'{}\', \'{}\') returning comm_id;".format(name, passwd, new_fr_id)
            #print(query)
            cur.execute(query)
            conn.commit()
            key = cur.fetchone()[0]

            query = "update comm set member_ids = array_append(member_ids, \'{}\') where comm_id = {};".format(creator_fbid, key)
            #print(query)
            cur.execute(query)
            conn.commit()

            query = "update usr set comm_id = {} where fb_id = \'{}\';".format(key, creator_fbid)
            #print(query)
            cur.execute(query)
            conn.commit()


              

            #print(key)

            #insert into comm (comm_name, passwd) values (name, pass) returning comm_id;
            #new_comm_id = cursor.fetchone()[0]
            return str(key)

        # Post request to join community
        elif mode is 6:
            data = request.data.decode('utf-8')
            data = json.loads(data)

            #print(type(data))
            #print(data)

            fbid = data['userID']
            commid = data['commID']
            passwd = data['password']

            query = "select passwd from comm where comm_id = {};".format(commid)
            #print(query)
            cur.execute(query)
            actual_pw = str(cur.fetchone()[0])

            if passwd == actual_pw:
                #success
                # First leave current community
                query = "update comm set member_ids = array_remove(member_ids, \'{}\');".format(fbid)
                #print(query)
                cur.execute(query)
                query = "update usr set comm_id = null where fb_id = \'{}\';".format(fbid)
                #print(query)
                cur.execute(query)
                conn.commit()

                query = "select comm_id from usr where fb_id = \'{}\';".format(fbid)
                #print(query)
                cur.execute(query)
                cur_comm_id = cur.fetchone()[0]

                if cur_comm_id == commid:
                    return str(0)
                else: 
                    query = "update comm set member_ids = array_append(member_ids, \'{}\') where comm_id = {};".format(fbid, commid)
                    #print(query)
                    cur.execute(query)
                    conn.commit()

                    query = "update usr set comm_id = {} where fb_id = \'{}\';".format(commid, fbid)
                    #print(query)
                    cur.execute(query)
                    conn.commit()

                return str(1);
            else:
                #fail
                return str(0);

            #Pass in unique id and password
            #Need to check password
            #unique_comm_id = passed in id
            #attempted_pass = passed in pw
            ##select passwd from comm where comm_id = unique_comm_id;
            #truepw = cursor.fetchone()[0]
            #if attempted_pass is truepw
            #    #Add current user to the new community
            #    #update comm set member_ids = array_append(member_ids, current_usr_id);
            #    return 'successfully joined community' + comm_id
            #else
            #    #Reject request
            #    return 'failed to join community' + comm_id

        # Post request to add item to inventory using barcode
        elif mode is 7:
            data = request.data.decode('utf-8')
            #print("trying to update server")
            #print(data)
            #print(type(data))
            
            data = json.loads(data)
            #print(type(data))
            fbid = data['userID']
            itemname = data['name']

            #print(fbid)
            #print(itemname)

            # Pass in usr_id, name of item, ?qty?
            # First check if item already exists in fridge
            query = "select inv from fridge where fr_id = (select fr_id from usr where fb_id = " + "\'" + fbid + "\');"
            cur.execute(query)

            fridge_data = cur.fetchone()
            fridge_data = fridge_data[0]
            
            #print(type(fridge_data))

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
                #print(json_data)
                fridge_data.append(json_data)

            query = "update fridge set inv = \'" + str(json.dumps(fridge_data)) + "\' where fr_id = (select fr_id from usr where fb_id = \'" + str(fbid) + "\');" 
            #print(query)
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

            #print(type(data))
            #print(data)

            fbid = data['userID']
            itemname = data['title']
            quantity = data['qty']

            #print(fbid)
            #print(comm)
            
            if comm is 0:
                query = "select inv from fridge where fr_id = (select fr_id from usr where fb_id = \'{}\');".format(str(fbid))
            else:
                query = "select inv from fridge where fr_id = (select fr_id from comm where comm_id = (select comm_id from usr where fb_id = \'{}\'));".format(fbid)

            #print(query)
            cur.execute(query)
            rows = cur.fetchone()
            rows = rows[0]

            #print(rows)

            newitem = {}
            newitem['title'] = itemname
            newitem['qty'] = quantity

            #print(newitem)

            rows.append(newitem)
            #print('just before updating inv')

            if comm is 0:
                query = "update fridge set inv = \'{}\' where fr_id = (select fr_id from usr where fb_id = \'{}\');".format(str(json.dumps(rows)), fbid)
            else:
                query = "update fridge set inv = \'{}\' where fr_id = (select fr_id from comm where comm_id = (select comm_id from usr where fb_id = \'{}\'));".format(str(json.dumps(rows)), fbid)

            #print(query)
            cur.execute(query)
            conn.commit()

            return itemname

        elif mode is 9:
            data = request.data.decode('utf-8')
            data = json.loads(data)

            #print(type(data))
            #print(data)

            fbid = data['userID']
            itemname = data['title']

            #print(fbid)
           
            if comm is 0:
                query = "select inv from fridge where fr_id = (select fr_id from usr where fb_id = \'{}\');".format(str(fbid))
            else:
                query = "select inv from fridge where fr_id = (select fr_id from comm where comm_id = (select comm_id from usr where fb_id = \'{}\'));".format(fbid)

            #print(query)
            cur.execute(query)
            rows = cur.fetchone()
            rows = rows[0]

            #print(rows)
            #print('just before updating inv')

            rows[:] = [item for item in rows if item.get('title') != itemname]

            if comm is 0:
                query = "update fridge set inv = \'{}\' where fr_id = (select fr_id from usr where fb_id = \'{}\');".format(str(json.dumps(rows)), fbid)
            else:
                query = "update fridge set inv = \'{}\' where fr_id = (select fr_id from comm where comm_id = (select comm_id from usr where fb_id = \'{}\'));".format(str(json.dumps(rows)), fbid)

            #print(query)
            cur.execute(query)
            conn.commit()

            return itemname

        elif mode is 10:
            # Get info about user
            # Community name
            # Number of different items in the fridge?
            # Number of people in the community?
            query = "select comm_id from usr where fb_id = \'{}\';".format(num)
            #print(query)
            cur.execute(query)
            commid = cur.fetchone()[0]
            #print('comm id: ' + str(commid))

            query2 = "select passwd from comm where comm_id = (select comm_id from usr where fb_id = \'{}\');".format(num)
            #print(query2)
            cur.execute(query2)
            commpw = cur.fetchone()[0]
            #print('comm pw: ' + str(commpw))

            query5 = "select comm_name from comm where comm_id = (select comm_id from usr where fb_id = \'{}\');".format(num)
            #print(query2)
            cur.execute(query5)
            comm_name = cur.fetchone()[0]
            #print('comm pw: ' + str(commpw))
  
            query3 = "select inv from fridge where fr_id = (select fr_id from usr where fb_id = \'{}\');".format(num)
            #print(query3)
            cur.execute(query3)
            inv = cur.fetchone()[0]
            #print('inv: ' + str(inv))
            
            invcount = 0
            for item in inv:
                invcount = invcount + 1;

            query4 = "select inv from fridge where fr_id = (select fr_id from comm where comm_id = (select comm_id from usr where fb_id = \'{}\'));".format(num)
            #print(query4)
            cur.execute(query4)
            comminv = cur.fetchone()[0]
            #print('inv: ' + str(inv))
            
            comminvcount = 0
            for item in comminv:
                comminvcount = comminvcount + 1;

            data = {}
            data["comm_id"] = str(commid)
            data["comm_name"] = str(comm_name)
            data["comm_pw"] = str(commpw)
            data["num_ingr"] = str(invcount)
            data["num_comm_ingr"] = str(comminvcount)

            #data = []
            #data.append(str(commid))
            #data.append(str(commpw))
            #data.append(str(invcount))
            #data.append(str(comminvcount))

            #data_array = []
            #data_array.append(data)

            #print(str(data_array))
            #return str(data_array)
            data = json.dumps(data)
            #print(type(data))
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
    return dbQuery(0, 0, 0)

@app.route('/api/rec_names/short/', methods=['GET'])
def get_rec_names_short():
    return dbQuery(0, 3, 0)

@app.route('/api/rec_data/<int:rec_id>', methods=['GET'])
def get_rec_data(rec_id):
    return dbQuery(rec_id, 4, 0)

@app.route('/api/create_comm/', methods=['POST'])
def create_community():
    return dbQuery(0, 5, 0)

@app.route('/api/join_comm/', methods=['POST'])
def join_community():
    return dbQuery(0, 6, 0)

@app.route('/api/barcode/', methods=['POST'])
def barcode():
    return dbQuery(0, 7, 0)

@app.route('/api/fridge_add/', methods=['POST'])
def fridge_add():
    return dbQuery(0, 8, 0)

@app.route('/api/fridge_delete/', methods=['PUT'])
def fridge_delete():
    return dbQuery(0, 9, 0)

@app.route('/api/acct_info/<int:fb_id>', methods=['GET'])
def acct_info(fb_id):
    return dbQuery(fb_id, 10, 0)

@app.route('/api/comm_fridge/<int:fb_id>', methods=['GET', 'POST', 'PUT'])
def comm_fridge(fb_id):
    if (request.method == 'GET'):
        return dbQuery(fb_id, 1, 1)
    else:
        return dbQuery(fb_id, 2, 1)

@app.route('/api/comm_fridge_add/', methods=['POST'])
def comm_fridge_add():
    return dbQuery(0, 8, 1)

@app.route('/api/comm_fridge_delete/', methods=['PUT'])
def comm_fridge_delete():
    return dbQuery(0, 9, 1)



@app.route('/')
def hello_world():
    """docstring for hello_world"""
    return 'Server is running'

@app.route('/api/fridge/<int:fb_id>', methods=['GET', 'POST', 'PUT'])
def fridge(fb_id):
    if (request.method == 'GET'):
        return dbQuery(fb_id, 1, 0)
    else:
        return dbQuery(fb_id, 2, 0)


if __name__ == '__main__':
    app.run(threaded=True)



