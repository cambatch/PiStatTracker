from flask import Flask, render_template, url_for, request, redirect
from app.authentication.auth import get_oauth_token, request_user_token, request_xsts_token, request_spartan_token
from app.halo.requests import get_service_record
import os
import json

if __name__ == '__main__' and os.environ.get("WERKZEUG_RUN_MAIN") == "true":
    oauth_token = get_oauth_token()
    if oauth_token is None:
        print("Error getting auth token!\nExiting...")
        exit()
    user_token = request_user_token(oauth_token.access_token)
    if user_token is not None:
        xsts_token = request_xsts_token(user_token.user_token)
        if xsts_token is not None:
            spartan_token = request_spartan_token(xsts_token.xsts_token)
            if spartan_token is not None:
                pass
                # print(get_service_record(spartan_token.spartan_token, "PLACEHOLDER", None))
            else:
                print("Failed to get spartan token!")
        else:
            print("Failed to get xsts token!")
    else:
        print("Failed to get user token!")


app = Flask(__name__, static_folder='app/static', template_folder='app/templates')

# These are just here to get something to show up for now...
@app.route('/')
def home():
    with open('service_record_test.json', 'w') as f:
        f.write(json.dumps(get_service_record(spartan_token.spartan_token, 'Jericz', None)))
    return render_template('index.html')

@app.route('/settings')
def settings():
    return render_template('displaySettings.html')


STAT_KEYS ={
    'personal score': ('CoreStats', 'PersonalScore'),
    'eliminations': ('CoreStats', 'Kills'),
    'deaths': ('CoreStats', 'Deaths'),
}

def get_stat_value(data, path):
    for key in path:
        data = data.get(key, {})
        if not isinstance(data, dict):  
            return data
    return 'Not available' 

@app.route('/stats', methods=['POST'])
def stats():
    if request.method == 'POST':
        user_text = request.form['search']
        data = get_service_record(spartan_token.spartan_token, user_text, None)
        with open('user_text.json', 'w') as f:
            f.write(json.dumps(get_service_record(spartan_token.spartan_token, user_text, None)))
        return redirect('./stats')


@app.route('/stats', methods=['GET'])
def display_stats():
    try:
        with open('user_text.json', 'r') as f:
            data = json.load(f)
    except (FileNotFoundError, KeyError):
        personal_score = 'Data not available'
    stats = {stat: get_stat_value(data, path) for stat, path in STAT_KEYS.items()}
    return render_template('stats.html', stats=stats)


        
# # Route to handle form submission
# @app.route('/submit', methods=['POST'])
# def submit():
#     # Get the text from the form
#     user_text = request.form['text']
#     # Process the text or do something with it
#     processed_text = user_text.upper()  # Example processing
#     return f'Processed Text: {processed_text}'

if __name__ == '__main__':
    app.run(debug=True)
