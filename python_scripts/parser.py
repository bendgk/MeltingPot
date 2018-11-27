from oauth2client import file, client, tools
import gspread
import json, re

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

#parse ingredients
NUM_COLS = len(ingredients_worksheet.get_all_values())

for i in range(1, NUM_COLS):
	data = ingredients_worksheet.col_values(i)
	for i in range(len(data)):
		if i == 0:	#initialize category in ingredients dict
			ingredients[data[i]] = []

		else:
			ingredients[data[0]].append([data[i], False, False, "images/" + data[i]])

#parse recipes
NUM_COLS = recipes_worksheet.col_count

for i in range(2, NUM_COLS + 1):
	data = recipes_worksheet.col_values(i)
	culture = ""

	for i in range(len(data)):
		ingredient = data[i].strip().lower()
		if ingredient[-3:] == "(o)":
			ingredient = ingredient[0:-3].strip()
			required = True

		required = False

		if i == 0:	#initialize culture
			culture = data[i]

		elif i == 1: #initialize recipe in dict
			recipes[data[i]] = {
				'culture': culture,
				'ingredients': []
			}

		else:
			recipes[data[1]]['ingredients'].append([ingredient, required, "images/"+ingredient+".jpg"])

#dump contents
with open('../ingredients.json', 'w+') as f:
    json.dump(ingredients, f, indent=4)

with open('../recipes.json', 'w+') as f:
    json.dump(recipes, f, indent=4)
