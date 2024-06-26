from flask import Flask, render_template, url_for, request, redirect, make_response, jsonify
from app.authentication.auth import TokenHandler
from app.halo.requests import get_service_record
import os

app = Flask(__name__, static_folder='app/static', template_folder='app/templates')
token_handler = TokenHandler()


@app.route('/')
def home():
    cookie = request.cookies.get('user_settings')
    response = make_response(render_template('index.html'))
    if cookie == "" or cookie is None:
        response.set_cookie('user_settings', value='Personal Score', samesite='Lax', max_age=60*60*24*365)
    else:
        response.set_cookie('user_settings', value =cookie, samesite='Lax', max_age=60*60*24*365)
    return response


statistics = ['Personal Score', 'KD', 'Matches', 'Win %', 'Medal Count', 'Accuracy', 'Average KDA']
sprees = ['K Spree', 'Frenzy', 'Running Riot', 'Rampage', 'Nightmare', 'Boogeyman', 'Grim Reaper', 'Demon']
multis = ['Double', 'Triple', 'Overkill','Killtacular', 'Killtrocity', 'Killimanjaro', 'Killtastrophe', 'Killpocalypse', 'Killionaire']
skills = ['Perfect', 'No Scope', 'Quigley', 'Ninja', 'Remote Detonation']
@app.route('/settings')
def settings():
    if request.cookies.get('user_settings') is not None:
        selected_settings = request.cookies.get('user_settings').split(',')
    else:
        return redirect('/')

    return render_template('displaySettings.html', selected_settings=selected_settings, statistics=statistics, sprees=sprees, multis=multis, skills=skills)

def extract_data(json_data):
    # Maps IDs to Medal Names
    MEDAL_NAMES = {
        2780740615: 'K Spree',
        4261842076: 'Frenzy',
        418532952: 'Running Riot',
        1486797009: 'Rampage',
        710323196: 'Nightmare',
        1720896992: 'Boogeyman',
        2567026752: 'Grim Reaper',
        2875941471: 'Demon',
        622331684: 'Double',
        2063152177: 'Triple',
        835814121: 'Overkill',
        2137071619: 'Killtacular',
        1430343434: 'Killtrocity',
        3835606176: 'Killimanjaro',
        2242633421: 'Killtastrophe',
        3352648716: 'Killpocalypse',
        3233051772: 'Killionaire',
        1512363953: 'Perfect',
        2602963073: 'No Scope',
        1312042926: 'Quigley',
        3085856613: 'Ninja',
        3160646854: 'Remote Detonation'
    }

    core_stats = json_data.get('CoreStats', {})
    matches_completed = json_data.get('MatchesCompleted', 0)
    wins = json_data.get('Wins', 0)
    deaths = core_stats.get('Deaths', 0)
    kills = core_stats.get('Kills', 0)
    kda = core_stats.get('AverageKDA', 0)

    # Directly available stats
    extracted_data = {
        'Personal Score': core_stats.get('PersonalScore', 0),
        'Matches': matches_completed,
        'Accuracy': core_stats.get('Accuracy', 0),
        'Eliminations': json_data.get('EliminationStats', {}).get('Eliminations', 0),
        'Average KDA': kda
    }

    # Calculated stats
    extracted_data['KD'] = kills / deaths if deaths else 0
    extracted_data['Win %'] = (wins / matches_completed * 100) if matches_completed else 0
    extracted_data['Medal Count'] = sum(medal.get('Count', 0) for medal in core_stats.get('Medals', []))

    # Spree statistics based on Medals
    sprees = {name: 0 for name in MEDAL_NAMES.values()}  # Initialize spree stats with zero
    multis = {name: 0 for name in MEDAL_NAMES.values()} 

    for medal in core_stats.get('Medals', []):
        name_id = medal.get('NameId')
        if name_id in MEDAL_NAMES:
            sprees[MEDAL_NAMES[name_id]] = medal.get('Count', 0)

    extracted_data.update(sprees)

    return extracted_data


@app.route('/stats', methods=['POST'])
def stats():
    if request.method == 'POST':
        user_text = request.form['search']
        return redirect(url_for('display_stats', gamertag=user_text))


@app.route('/stats', methods=['GET'])
def display_stats():
    selected_stats = request.cookies.get('user_settings').split(',')
    gamertag = request.args.get('gamertag', 'default_gamertag')
    data = get_service_record(gamertag, token_handler)
    stats = extract_data(data)
    return render_template('stats.html', stats=stats, selected_stats=selected_stats, gamertag=gamertag)


# Save settings from settings selection
@app.route('/save-settings', methods=['POST'])
def save_settings():
    selections = request.json.get('selections', [])
    response = make_response(jsonify({"success": True}))
    print(selections)
    response.set_cookie('user_settings', value=','.join(selections), samesite='Lax', max_age=60*60*24*365)
    return response


if __name__ == '__main__':
    app.run(debug=True)
