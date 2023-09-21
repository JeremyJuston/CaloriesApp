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


def add_food(food):
    
    days_foods = []
    print('tessssssssssssssssst')

    with open('./assets/tables/daysFoodsList.csv', 'r', newline='', encoding='utf-16') as csv_days_foods_reader:
        
        food_reader = csv.reader(csv_days_foods_reader, delimiter=',')
        #food_reader = csv.reader((row.replace('\0', '') for row in csv_days_foods_reader), delimiter=',')
        print(food_reader)

        for row in food_reader:
            if row[0] == food[0]:
                row.append(food[1])
                row.append(food[2])
                print(row)
            days_foods.append(row)


        
    with open('./assets/tables/daysFoodsList.csv', 'w', newline='', encoding='utf-16') as csv_days_foods_writer:           

        food_writer = csv.writer(csv_days_foods_writer)

        for row in days_foods:
            food_writer.writerow(row)
    

def main():
    return 0