import json
import re
import pprint
from openpyxl import load_workbook
from PIL import Image, ImageDraw, ImageFont

d = {}
with open('ingredients.json', 'r') as file:
    json_data = json.load(file)
    for item in json_data:
        for ingredient in json_data[item]:
            d[ingredient[0]] = ingredient[3]
with open('recipes.json', 'r') as file:
    json_data = json.load(file)
    for item in json_data:
        print(item)
        for ingredient in json_data[item]['ingredients']:
            try:
                if(len(ingredient) < 3):
                    ingredient.append(d[ingredient[0]])
            except:
                pass

with open('recipes.json', 'w') as file:
    json.dump(json_data, file, indent=4)