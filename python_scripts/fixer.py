import json

with open('ingredients.json', 'r') as file:
    json_data = json.load(file)
    for item in json_data:
        for ingredient in json_data[item]:
            ingredient[3] = ("python_scripts/images/" + ingredient[0] + ".jpg")
with open('ingredients.json', 'w') as file:
    json.dump(json_data, file, indent=4)