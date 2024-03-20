from datetime import datetime, timezone, timedelta
import json


class OAuthToken:
    def __init__(self, expires_in: int, access_token: str, refresh_token: str, issued: datetime = None):
        self.expires_in: int = expires_in
        self.access_token: str = access_token
        self.refresh_token: str = refresh_token
        if issued is not None:
            self.issued = issued
        else:
            self.issued = datetime.now(timezone.utc)

    def is_valid(self) -> bool:
        expire_datetime = self.issued + timedelta(seconds=self.expires_in)
        return datetime.now(timezone.utc) < expire_datetime

    def to_json(self):
        return json.dumps({
           'expires_in': self.expires_in,
           'access_token': self.access_token,
           'refresh_token': self.refresh_token,
           'issued': self.issued.isoformat()
        })

    @staticmethod
    def from_json(content):
        content['issued'] = datetime.fromisoformat(content['issued'])
        return OAuthToken(**content)


class XboxUserToken:
    def __init__(self, user_token: str, display_claims: dict, issued: float):
        self.user_token = user_token
        self.display_claims = display_claims
        self.issued = issued


class XboxXstsToken:
    def __init__(self, xsts_token: str, display_claims: dict, issued: float):
        self.xsts_token = xsts_token
        self.display_claims = display_claims
        self.issued = issued
    pass


class SpartanToken:
    def __init__(self, spartan_token: str, expires_utc: str, token_duration: str):
        self.spartan_token = spartan_token
        self.expires_utc = expires_utc
        self.token_duration = token_duration

    def is_valid(self) -> bool:
        return datetime.now(timezone.utc) >= self.expires_utc
