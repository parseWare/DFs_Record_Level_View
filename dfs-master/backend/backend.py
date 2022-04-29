
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL

import re
from  flask_cors import CORS, cross_origin
from sympy import true
  
app = Flask(__name__)
CORS(app, supports_credentials=True)
  
app.secret_key = '@Rohi1999'

  
  
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'naman'
app.config['MYSQL_PASSWORD'] = 'Trkpn@12345'
app.config['MYSQL_DB'] = 'data_entry'
  
  
mysql = MySQL()
mysql.init_app(app)
  
  
@app.route('/')
@app.route('/login', methods =['GET', 'POST'])
@cross_origin(origins='*',supports_credentials=True)
def login():
    if request.method == 'POST':
        
        data= request.get_json()
        print(data)
        email = data['email']
        password = data['password']
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE email = % s AND passord = % s', (email, password))
        account = cursor.fetchone()
        print(account)
        if account:
            data['email'] = account[0]
            data['password'] = account[1]
            return_data={"success" : 1,
            "type":account[2]}
            return jsonify(return_data)
        else:
            return_data={"success" : 0}
            return jsonify(return_data)

@app.route('/register', methods =['POST'])
def register():
    if request.method == 'POST':
        try:
            data= request.get_json()
            print(data)        
            email = data['email']
            passord = data['password']
            type = data['type']
            conn = mysql.connection
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users WHERE email = % s AND passord = % s', (email, passord))
            account = cursor.fetchone()
            
            if account:
                return_data={"success" : 0, "message": 1}
                return jsonify(return_data)
            else:
                cursor.execute('Insert into users values(%s,%s,%s)',(email,passord,type))
                conn.commit()
                return_data={"success" : 1}
                return jsonify(return_data)
        except:
            return_data={"success" : 0}
            return jsonify(return_data)
        
@app.route('/get_pending_approvals',methods =['GET'])
def get_pending_approvals():
    if request.method == 'GET':
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM datasets WHERE status=1')
        allAccounts = cursor.fetchall()
        print(allAccounts)
        datasets = []
        success = 1
        if allAccounts:
            for account in allAccounts:
                data = {}
                data['name'] = account[0]
                data['version'] = account[1]
                data['published_by'] = account[6]
                datasets.append(data)
            success = 1
        else:
            success = 0
        return_data={"success" : success,
            "data":datasets}
        return jsonify(return_data)

@app.route('/send_approval_from_administrator',methods=['POST'])
def send_approval_from_administrator():
    if request.method == 'POST':
        try :
            data=request.get_json()
            name= data['name']
            version = data['version']
            published_by = data['publishedBy']
            conn = mysql.connection
            cursor = conn.cursor()
            cursor.execute('Update datasets set status=2 where name = %s and version = %s and published_by = %s', (name,version, published_by))
            conn.commit()
            return_data={"success" : 1}
            return jsonify(return_data)
        except Exception as e:
            print(e)
            return_data={"success" : 0}
            return jsonify(return_data)    

@app.route('/send_reject_from_administrator',methods=['POST'])
def send_reject_from_administrator():
    if request.method == 'POST':
        try :
            data=request.get_json()
            name= data['name']
            version = data['version']
            published_by = data['publishedBy']
            conn = mysql.connection
            cursor = conn.cursor()
            cursor.execute('Update datasets set status=0 where name = %s and version = %s and published_by = %s', (name,version, published_by))
            conn.commit()
            return_data={"success" : 1}
            return jsonify(return_data)
        except Exception as e:
            print(e)
            return_data={"success" : 0}
            return jsonify(return_data)
        
@app.route('/get_datasets_for_consumer',methods=['POST'])
def get_datasets_for_consumer():
    if request.method == 'POST':
        data = request.get_json()
        requested_by = data['requestedBy']
        conn = mysql.connection
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM datasets WHERE status=2')
        allAccounts = cursor.fetchall()
        print(allAccounts)
        datasets = []
        success = 1
        if allAccounts:
            for account in allAccounts:
                data = {}
                data['name'] = account[0]
                data['version'] = account[1]
                data['published_by'] = account[6]
                if account[3] == 0:
                    data['state'] = 2
                else:
                    cursor.execute('SELECT * FROM download_requests WHERE name=%s and version=%s and requested_by=%s',(account[0], account[1], requested_by))
                    val = cursor.fetchone()
                    if val:
                        data['state'] = val[3]    
                    else:                   
                        data['state'] = -1
                datasets.append(data)
            success = 1
        else:
            success = 0
        return_data={"success" : success,
            "data":datasets}
        return jsonify(return_data)

@app.route('/request_by_consumer_for_a_dataset',methods=['POST'])
def request_by_consumer_for_a_dataset():
    if request.method == 'POST':
        data=request.get_json()
        name= data['name']
        version = data['version']
        published_by = data['published_by']
        requested_by = data['requestedBy']
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM datasets WHERE name = %s and version = %s and published_by = %s',(name,version, published_by))
        account = cursor.fetchone()
        if account[2]== 1:
            cursor.execute('Insert into download_requests values (%s,%s,%s,1,\'\',\'\',%s)',(name,version,published_by,requested_by))
            conn.commit()
            return_data = {"sucess" : 1}
            return jsonify(return_data)
        else:
            return_data = {"sucess" : 0}
            return jsonify(return_data)

@app.route('/get_download_requests_for_publisher', methods=['POST'])
def get_download_requests_for_publisher():
    if request.method == 'POST':
        data = request.get_json()
        user = data['user']
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM download_requests WHERE status=1 and published_by=%s',(user))
        allAccounts = cursor.fetchall()
        datasets = []
        success = 1
        if allAccounts:
            for account in allAccounts:
                data = {}
                data['name'] = account[0]
                data['version'] = account[1]
                data['requested_by'] = account[6]
                datasets.append(data)
            success = 1
        else:
            success = 0
        return_data={"success" : success,
            "data":datasets}
        return jsonify(return_data)
@app.route('/send_approval_from_publisher',methods=['POST'])
def send_approval_from_publisher():
    if request.method == 'POST':
        try :
            data=request.get_json()
            name= data['name']
            version = data['version']
            requested_by = data['requestedBy']
            conn = mysql.connection
            cursor = conn.cursor()
            cursor.execute('Update download_requests set status=2 where name = %s and version = %s and requested_by = %s', (name,version,requested_by))
            conn.commit()
            return_data={"success" : 1}
            return jsonify(return_data)
        except :
            return_data={"success" : 0}
            return jsonify(return_data)

@app.route('/send_reject_from_publisher',methods=['POST'])
def send_reject_from_publisher():
    if request.method == 'POST':
        try :
            data=request.get_json()
            name= data['name']
            version = data['version']
            requested_by = data['requestedBy']
            conn = mysql.connection
            cursor = conn.cursor()
            cursor.execute('Update download_requests set status=0 where name = %s and version = %s and requested_by = %s', (name,version, requested_by))
            conn.commit()
            return_data={"success" : 1}
            return jsonify(return_data)
        except :
            return_data={"success" : 0}
            return jsonify(return_data)

@app.route('/upload_request_from_approval',methods=['POST'])
def upload_request_from_approval():
    if request.method == 'POST':
        try :
            data=request.get_json()
            print(data)
            name= data['name']
            version = data['version']
            is_approval= data['isApproval']
            if is_approval == true:
                is_approval = 1
            else:
                is_approval = 0
            published_by = data['publishedBy']
            print("data is", name, version, is_approval, published_by)
            conn = mysql.connection
            cursor = conn.cursor()
            cursor.execute('Insert into datasets values(%s,%s,1,%s,\'\',\"\",%s)', (name,version,is_approval, published_by))
            conn.commit()
            return_data={"success" : 1}
            return jsonify(return_data)
        except Exception as e:
            print(e)
            return_data={"success" : 0}
            return jsonify(return_data)
        
if __name__ == "__main__":
    app.run(debug=True)

