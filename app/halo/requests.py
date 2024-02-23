import requests

def get_service_record(spartan_token: str, gamertag: str, season_id: str = None) -> dict:
    url = f'https://halostats.svc.halowaypoint.com/hi/players/{gamertag}/Matchmade/servicerecord'

    if season_id is not None:
        url += f'?seasonId={season_id}'

    headers = { 
        'X-343-Authorization-Spartan': spartan_token,
        'Accept': 'application/json'
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        content = response.json()
        return content
    else:
        print(f"Failed to retrieve service record for {gamertag}")
        return None
