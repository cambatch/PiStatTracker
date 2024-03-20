import requests
from app.authentication.auth import TokenHandler


def get_service_record(gamertag: str, token_handler: TokenHandler) -> dict:
    if token_handler.need_refresh():
        print("Refreshing tokens...")
        token_handler.refresh_tokens()

    url = f'https://halostats.svc.halowaypoint.com/hi/players/{gamertag}/Matchmade/servicerecord'

    headers = {
        'X-343-Authorization-Spartan': token_handler.spartan_token,
        'Accept': 'application/json'
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        content = response.json()
        return content
    else:
        print(f"Failed to retrieve service record for {gamertag}")
        return None
