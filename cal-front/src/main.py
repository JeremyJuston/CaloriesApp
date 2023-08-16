from flask import Flask, render_template
from back import foods

#app = Flask(__name__, template_folder="../ng-aram-app/src", static_folder="../ng-aram-app/dist/ng-aram-app")
app = Flask(__name__, template_folder="../dist/cal-front/", static_folder="../dist/cal-front/", static_url_path="")

@app.route("/")
def root():
    dataa = foods.main()
    print(dataa)
    return render_template('index.html')


@app.errorhandler(404)
def not_found_error(error):
    return render_template('index.html')

@app.route("/loading/foods")
def get_data():
    data = foods.get_foods_list()
    return data


if __name__ == "__main__":
    app.run()

