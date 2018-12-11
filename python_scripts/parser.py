from oauth2client import file, client, tools
import gspread
import json, re

import numpy as np

scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']


store = file.Storage('token.json')
creds = store.get()

if not creds or creds.invalid:
	flow = client.flow_from_clientsecrets('credentials.json', scope)
	creds = tools.run_flow(flow, store)

gc = gspread.authorize(creds)

#load worksheets
ingredients = gc.open('Ingredients')
ingredients_worksheet = ingredients.sheet1

recipes = gc.open('Recipes')
recipes_worksheet = recipes.sheet1

#dictionaries to serialize to json
ingredients = {}
recipes = {}

ingredient_values = np.array(ingredients_worksheet.get_all_values())
recipe_values = np.array(recipes_worksheet.get_all_values())

#parse ingredients
NUM_COLS = len(ingredient_values) - 1

for i in range(NUM_COLS):
	data = list(filter(None, ingredient_values[:,i]))
	for i in range(len(data)):
		if i == 0:	#initialize category in ingredients dict
			ingredients[data[i]] = []

		else:
			ingredient_path = "/static/images/" + data[i].replace(" ", "_").lower() + ".jpg"
			ingredients[data[0]].append([data[i].lower(), False, False, ingredient_path])

#parse recipes
NUM_COLS = len(recipe_values[0])

for i in range(1, NUM_COLS):
	data_array = list(filter(None, recipe_values[:,i]))
	culture = ""
	recipe = ""

	#print(data_array)	

	for j in range(len(data_array)):
		sanitized_value = data_array[j].strip().lower()

		required = True

		if sanitized_value[-3:] == "(o)":
			sanitized_value = sanitized_value[0:-3].strip()
			required = False

		if j == 0:	#initialize culture
			culture = data_array[j]

		elif j == 1: #initialize recipe in dict
			recipe = data_array[j]
			recipes[recipe] = {
				'culture': culture,
				'ingredients': []
			}

		else:
			ingredient_path = "/static/images/" + sanitized_value.replace(" ", "_") + ".jpg"
			recipes[recipe]['ingredients'].append([sanitized_value, required, ingredient_path])

#dump contents
with open('../ingredients.json', 'w+') as f:
    json.dump(ingredients, f, indent=4)

with open('../recipes.json', 'w+') as f:
    json.dump(recipes, f, indent=4)