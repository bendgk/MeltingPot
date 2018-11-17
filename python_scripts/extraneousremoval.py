import json

ingredients = []

with open('ingredients.json', 'r') as file:
    ijson_data = json.load(file)
    for item in ijson_data:
        for ingredient in ijson_data[item]:
            ingredients.append(ingredient[0])

with open('recipes.json', 'r') as file:
    json_data = json.load(file)
    for item in json_data:
        for ingredient in json_data[item]["ingredients"]:
            if ingredient[0] not in ingredients:
                if "poultry" not in ingredient[0] and "pork" not in ingredient[0] and "beef" not in ingredient[0] and "fish" not in ingredient[0] and "eggs" not in ingredient[0]:
                    json_data[item]["ingredients"].remove(ingredient)


with open('recipes.json', 'w') as file:
    json.dump(json_data, file, indent=4)

