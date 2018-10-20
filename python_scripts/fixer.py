import json

with open('ingredients.json', 'r') as file:
    json_data = json.load(file)
    for item in json_data:
        for ingredient in json_data[item]:
            ingredient[1] = False
            ingredient.append(False)
with open('ingredients.json', 'w') as file:
    json.dump(json_data, file, indent=2)