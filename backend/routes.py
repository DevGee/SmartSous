from flask import Flask
app = Flask(__name__)

@app.route('/test')
def test_get():
    """docstring for test_get"""
    return 'Testing'
