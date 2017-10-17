from flask import Flask
from routes import test_get
app = Flask(__name__)

@app.route('/')
def hello_world():
    """docstring for hello_world"""
    return 'Server is running'

@app.route('/api/test', methods=['GET'])
def get_string():
    return 'testing api GET' 
