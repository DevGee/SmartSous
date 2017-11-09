
import unittest
import requests
import json

class TestFlaskApiUsingRequests(unittest.TestCase):
    def test_main_route(self):
        response = requests.get('http://198.199.98.149:5000')
        self.assertEqual(response.content.decode('UTF-8'), 'Server is running')

    def test_fridge_get_3(self):
        response = requests.get('http://198.199.98.149:5000/api/fridge/3')
        self.assertEqual(response.json(), [{"title": "Ham", "qty": 4}, {"title": "Bread", "qty": 2}, {"title": "Pizza", "qty": 1}])

    # Currently fails, need to handle edge cases properly
    # empty fridge for user 2
    def test_fridge_get_2(self):
        response = requests.get('http://198.199.98.149:5000/api/fridge/2')
        self.assertEqual(response.json(), {}) 

    def test_recipe_get(self):
        response = requests.get('http://198.199.98.149:5000/api/rec_names/')
        with open('recipedata.json') as data:
            recipeData = json.load(data)
        self.assertEqual(response.json(), recipeData)

    # Currently fails, post not correctly set up as of now
    # status_code = 200 is 'OK'
    def test_fridge_update(self):
        response = requests.post('http://198.199.98.149:5000/api/fridge/3')
        self.assertEqual(response.status_code, 200)
 

if __name__ == "__main__":
    unittest.main()

