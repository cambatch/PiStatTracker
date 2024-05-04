from app.authentication.tokens.tokens import OAuthToken, XboxUserToken, XboxXstsToken, SpartanToken
import json
import urllib.parse
import requests
from time import time
from datetime import datetime, timezone
import os


xuid = os.getenv('XUID')
client_secret = os.getenv('CLIENT_SECRET')
client_id = os.getenv('CLIENT_ID')
auth_url = 'https://login.live.com/oauth20_authorize.srf?'
redirect_uri = 'https://localhost'
scope = 'Xboxlive.signin Xboxlive.offline_access'
token_url = 'https://login.live.com/oauth20_token.srf'

def try_get_oauth_token() -> OAuthToken:
    auth_code = os.environ['AUTH_CODE']
    oauth_token_response = request_oauth_token(client_id, client_secret, redirect_uri, scope, auth_code, token_url)
    if oauth_token_response is None:
        print("Failed to aqcuire OAuth token. exiting...")
        exit()
    os.environ['OAUTH_TOKEN'] = oauth_token_response.to_json()
    return oauth_token_response


class TokenHandler:
    def __init__(self):
        self.oauth_token_response: OAuthToken = None
        self.user_token_response: XboxUserToken = None
        self.xsts_token_response: XboxXstsToken = None
        self.spartan_token_response: SpartanToken = None
        self.oauth_token: str = None
        self.user_token: str = None
        self.xsts_token: str = None
        self.spartan_token: str = None
        self.__get_tokens()

    def __get_tokens(self):
        prev_token = os.getenv("OAUTH_TOKEN")

        if prev_token is None:
            self.oauth_token_response = try_get_oauth_token()
        else:
            prev_token = OAuthToken.from_json(json.loads(prev_token))
            if not prev_token.is_valid():
                self.oauth_token_response = try_get_oauth_token() 
            else:
                self.oauth_token_response = prev_token

        self.oauth_token = self.oauth_token_response.access_token
        self.user_token_response = request_user_token(self.oauth_token)

        if self.user_token_response is None:
            print("Failed to get user token!")
            exit()

        self.user_token = self.user_token_response.user_token
        self.xsts_token_response = request_xsts_token(self.user_token)

        if self.xsts_token_response is None:
            print("Failed to get xsts token!")
            exit()

        self.xsts_token = self.xsts_token_response.xsts_token
        self.spartan_token_response = request_spartan_token(self.xsts_token)

        if self.spartan_token_response is None:
            print("Failed to get spartan token!")
            exit()

        self.spartan_token = self.spartan_token_response.spartan_token

    def need_refresh(self):
        return not self.oauth_token_response.is_valid() and not self.spartan_token_response.is_valid()

    def refresh_tokens(self):
        new_oauth_token = refresh_oauth_token(client_id, client_secret, self.oauth_token_response.refresh_token, token_url)
        if new_oauth_token is None:
            print("Failed to refresh oauth token!")
            return
        new_user_token = request_user_token(new_oauth_token.access_token)
        if new_user_token is None:
            print("Failed to refresh user token!")
            return
        new_xsts_token = request_xsts_token(new_user_token.user_token)
        if new_xsts_token is None:
            print("Failed to refresh xsts token!")
            return
        new_spartan_token = request_spartan_token(new_xsts_token.xsts_token)
        if new_spartan_token is None:
            print("Failed to refresh spartan token!")
            return

        self.oauth_token_response = new_oauth_token
        self.oauth_token = self.oauth_token_response.access_token
        self.user_token_response = new_user_token
        self.user_token = self.user_token_response.user_token
        self.xsts_token_response = new_xsts_token
        self.xsts_token = self.xsts_token_response.xsts_token
        self.spartan_token_response = new_spartan_token
        self.spartan_token = self.spartan_token_response.spartan_token

        os.environ['OAUTH_TOKEN'] = self.oauth_token_response.to_json()


def keys_exist(data: dict, keys: list) -> bool:
    return all(key in data for key in keys)

def get_auth_url(client_id: str, redirect_uri: str, scope: str, auth_url: str) -> str:
    query_string = {
        'client_id': client_id,
        'response_type': 'code',
        'approval_prompt': 'auto',
        'scope': scope,
        'redirect_uri': redirect_uri
    }
    return  auth_url + urllib.parse.urlencode(query_string)


def request_oauth_token(client_id: str, client_secret: str, redirect_uri: str, scope: str, auth_code: str, token_url: str):
    request_content = {
        'grant_type': 'authorization_code',
        'code': auth_code,
        'approval_prompt': 'auto',
        'scope': scope,
        'redirect_uri': redirect_uri,
        'client_id': client_id,
        'client_secret': client_secret
    }
    response = requests.post(token_url, data=request_content)

    if response.status_code == 200:
        content = response.json()
        if keys_exist(content, keys=['expires_in', 'access_token', 'refresh_token']):
            return OAuthToken(content.get('expires_in'), content.get('access_token'), content.get('refresh_token'), datetime.now(timezone.utc))
    else:
        print(f"Failed to get OAuth token!\n\t{print_response_error(response.status_code, response.reason, response.text)}")
        return None


def refresh_oauth_token(client_id: str, client_secret: str, refresh_token: str, token_url: str) -> OAuthToken:
    request_content = {
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': client_id,
        'client_secret': client_secret
    }

    response = requests.post(token_url, data=request_content)

    if response.status_code == 200:
        content = response.json()
        if keys_exist(content, keys=['expires_in', 'access_token', 'refresh_token']):
            return OAuthToken(content.get('expires_in'), content.get('access_token'), content.get('refresh_token'), datetime.now(timezone.utc))
        else:
            print("OAuth token response does not match expected format.")
            return None
    else:
        print(f"Failed to refresh oauth token!\n\t{print_response_error(response.status_code, response.reason, response.text)}")
        return None


def request_user_token(access_token: str) -> XboxUserToken:
    request_content = {
        'Properties': {
            'AuthMethod': 'RPS',
            'RpsTicket': f'd={access_token}',
            'SiteName': 'user.auth.xboxlive.com',
        },
        'RelyingParty': 'http://auth.xboxlive.com',
        'TokenType': 'JWT'
    }
    headers = {
        'x-xbl-contract-version': '1',
    }

    response = requests.post('https://user.auth.xboxlive.com/user/authenticate', json=request_content, headers=headers)

    if response.status_code == 200:
        content = response.json()
        if keys_exist(content, keys=['DisplayClaims', 'IssueInstant', 'NotAfter', 'Token']):
            issued = datetime.fromisoformat(content.get('IssueInstant').rstrip("Z"))
            issued = issued.replace(tzinfo=timezone.utc)
            return XboxUserToken(content.get('Token'), content.get('DisplayClaims'), issued.timestamp())
        else:
            print("User token request response does not match expected format.")
            return None
    else:
        print(f"Failed to get user token.\n\t{print_response_error(response.status_code, response.reason, response.text)}")
        return None


def request_xsts_token(user_token: str) -> XboxXstsToken:
    request_content = {
        "Properties": {
            "SandboxId": "RETAIL",
            "UserTokens": [user_token]
        },
        "RelyingParty": "https://prod.xsts.halowaypoint.com/",
        "TokenType": "JWT"
    }
    headers = {
        'x-xbl-contract-version': '1',
        'Accept': 'application/json'
    }

    response = requests.post('https://xsts.auth.xboxlive.com/xsts/authorize', json=request_content, headers=headers)

    if response.status_code == 200:
        content = response.json()
        if keys_exist(content, keys=['DisplayClaims', 'IssueInstant', 'NotAfter', 'Token']):
            issued = datetime.fromisoformat(content.get('IssueInstant').rstrip("Z"))
            issued = issued.replace(tzinfo=timezone.utc)
            return XboxXstsToken(content.get('Token'), content.get('DisplayClaims'), issued.timestamp())
        else:
            print("Xsts token request response does not match expected format.")
            return None
    else:
        print(f"Failed to get xsts token.\n\t{print_response_error(response.status_code, response.reason, response.text)}")
        return None


def request_spartan_token(xsts_token: str) -> SpartanToken:
    request_content = {
        'Audience': 'urn:343:s3:services',
        'MinVersion': '4',
        'Proof': [
            {
                'Token': xsts_token,
                'TokenType': 'Xbox_XSTSv3'
            }
        ]
    }
    headers = { 'Accept': 'application/json' }

    response = requests.post('https://settings.svc.halowaypoint.com/spartan-token', json=request_content, headers=headers)

    # 201 is created token response status code
    if response.status_code == 200 or response.status_code == 201:
        content = response.json()
        if keys_exist(content, keys=['ExpiresUtc', 'SpartanToken', 'TokenDuration']):
            utc_date = content.get('ExpiresUtc').get('ISO8601Date')
            utc_date = datetime.fromisoformat(utc_date.rstrip('Z')).replace(tzinfo=timezone.utc)
            return SpartanToken(content.get('SpartanToken'), utc_date, content.get('TokenDuration'))
        else:
            print("Spartan token request response does not match expected format.")
            return None
    else:
        print(f"Failed to get spartan token.\n\t{print_response_error(response.status_code, response.reason, response.text)}")
        return None


def get_clearance(spartan_token: str, xuid: str) -> str:
    headers = { 'x-343-authorization-spartan': spartan_token}
    url = f'https://settings.svc.halowaypoint.com/oban/flight-configurations/titles/hi/audiences/RETAIL/players/xuid({xuid})/active?sandbox=UNUSED&build=210921.22.01.10.1706-0'

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        content = response.json()
        if keys_exist(content, keys=['FlightConfigurationId']):
            return content.get('FlightConfigurationId')
        else:
            print("Clearance id request response does not match expected format.")
            return None
    else:
        print("Failed to get clearance..." + str(response.status_code))
        return None


def get_v3_token(user_hash: str, user_token: str) -> str:
    return f'XBL3.0 x={user_hash};{user_token}'


def print_response_error(status_code, reason, text) -> str:
    return f"{status_code} {reason}\n\t{text}"
