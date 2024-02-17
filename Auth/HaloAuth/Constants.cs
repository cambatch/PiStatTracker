
namespace Constants;

public static class GlobalConstants
{
    public static readonly string[] DEFAULT_AUTH_SCOPES = ["Xboxlive.signin", "Xboxlive.offline_access"];
}


public static class XboxEndpoints
{
    public static readonly string XboxLiveAuthorize = "https://login.live.com/oauth20_authorize.srf";
    public static readonly string XboxLiveToken = "https://login.live.com/oauth20_token.srf";
    public static readonly string XboxLiveUserAuthenticate = "https://user.auth.xboxlive.com/user/authenticate";
    public static readonly string XboxLiveAuthRelyingParty = "http://auth.xboxlive.com";
    public static readonly string XboxLiveRelyingParty = "http://xboxlive.com";
    public static readonly string XboxLiveXstsAuthorize = "https://xsts.auth.xboxlive.com/xsts/authorize";
}


public static class HaloCoreEndpoints
{
    public static readonly string HaloWaypointXstsRelyingParty = "https://prod.xsts.halowaypoint.com/";
}


public static class SettingsEndpoints
{
    public static readonly string SpartanTokenV4 = "https://settings.svc.halowaypoint.com/spartan-token";
}
