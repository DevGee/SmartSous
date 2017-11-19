#!/usr/bin/python3

import json

with open('recipe-data3.json') as jfile:
    jdata = json.load(jfile)
    for p in jdata['recipe']:
        print(str(p['urlnum']) + '\t' + p['title'])

