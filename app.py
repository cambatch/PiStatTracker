from flask import Flask, render_template, url_for, request, redirect, make_response, jsonify
from app.authentication.auth import TokenHandler
from app.halo.requests import get_service_record
import os
import json


if __name__ == '__main__' and os.environ.get("WERKZEUG_RUN_MAIN") == "true":
    # Set debug to False or omit for non-development environments
    token_handler = TokenHandler(debug=True)

app = Flask(__name__, static_folder='app/static', template_folder='app/templates')


@app.route('/')
def home():
    with open('service_record_test.json', 'w') as f:
        f.write(json.dumps(get_service_record(token_handler.spartan_token, 'Jericz', None)))
    response = make_response(render_template('index.html'))
    response.set_cookie('user_settings', value='Personal Score', samesite='Lax', max_age=60*60*24*365)
    return response

statistics = ['Personal Score', 'KD', 'Matches', 'Win %', 'Medal Count', 'Accuracy', 'test']
sprees = ['K Spree', 'Frenzy', 'Running Riot', 'Rampage', 'Nightmare', 'Boogeyman', 'Grim Reaper', 'Demon']
@app.route('/settings')
def settings():
    if request.cookies.get('user_settings') is not None:
        selected_settings = request.cookies.get('user_settings').split(',')
    else:
        return redirect('/')

    return render_template('displaySettings.html', selected_settings=selected_settings, statistics=statistics, sprees=sprees)


STAT_KEYS = {
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
        data = get_service_record(token_handler.spartan_token, user_text, None)
        with open('user_text.json', 'w') as f:
            f.write(json.dumps(get_service_record(token_handler.spartan_token, user_text, None)))
        return redirect('./stats')


@app.route('/stats', methods=['GET'])
def display_stats():
    selected_stats = request.cookies.get('user_settings').split(',')
    try:
        with open('user_text.json', 'r') as f:
            data = json.load(f)
    except (FileNotFoundError, KeyError):
        personal_score = 'Data not available'
    stats = {stat: get_stat_value(data, path) for stat, path in STAT_KEYS.items()}
    return render_template('stats.html', stats=stats, selected_stats=selected_stats)


# Save settings from settings selection
@app.route('/save-settings', methods=['POST'])
def save_settings():
    selections = request.json.get('selections', [])
    response = make_response(jsonify({"success": True}))
    print(selections)
    response.set_cookie('user_settings', value=','.join(selections), samesite='Lax', max_age=60*60*24*365)
    return response


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
