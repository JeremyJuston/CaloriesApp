import csv
from flask import jsonify
import json


def get_foods_list():

    foods = []
    with open('./assets/tables/foodsList.csv', newline='') as csv_foods:
        food_reader = csv.reader(csv_foods, delimiter=',')

        for row in food_reader:
            foods.append(row)

    return json.dumps(foods)


def main():
    return 0