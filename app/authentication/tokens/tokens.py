from datetime import datetime, timezone
import time

class OAuthToken:
    def __init__(self, expires_in: int, access_token: str, refresh_token: str, issued: float = None):
        self.expires_in: int = expires_in
        self.access_token: str = access_token
        self.refresh_token: str = refresh_token
        if issued is not None:
            self.issued = issued
        else:
            self.issued = time.time()

    def is_valid(self):
        return time.time() < self.issued + self.expires_in


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
    def __init__(self, spartan_token: str, expires_utc: str):
        self.spartan_token = spartan_token
        self.expires_utc = expires_utc

    def is_valid(self):
        return datetime.now(timezone.utc) >= self.expires_utc

