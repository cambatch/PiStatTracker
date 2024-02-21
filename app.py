from flask import Flask, render_template, url_for


app = Flask(__name__, static_folder='app/static', template_folder='app/templates')


# These are just here to get something to show up for now...
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/settings')
def settings():
    return render_template('displaySettings.html')


if __name__ == '__main__':
    app.run(debug=True)
