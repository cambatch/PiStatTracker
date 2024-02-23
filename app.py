from flask import Flask, render_template, url_for
from app.authentication.auth import get_oauth_token, request_user_token, request_xsts_token, request_spartan_token
from app.halo.requests import get_service_record
import os

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
    return render_template('index.html')

@app.route('/settings')
def settings():
    return render_template('displaySettings.html')


if __name__ == '__main__':
    app.run(debug=True)
