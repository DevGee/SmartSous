from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    """docstring for hello_world"""
    return 'Server is running'
