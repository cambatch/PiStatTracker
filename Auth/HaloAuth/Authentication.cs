using System.Collections.Specialized;
using Constants;
using XboxAuth;
using OAuth;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Authentication;


public static class Auth
{
    public static string GenerateAuthUrl(string clientId, string redirectUrl, string[]? scopes = null, string state = "")
    {
        NameValueCollection queryString = System.Web.HttpUtility.ParseQueryString(string.Empty);
        queryString.Add("client_id", clientId);
        queryString.Add("response_type", "code");
        queryString.Add("approval_prompt", "auto");

        if (scopes != null && scopes.Length > 0)
        {
            queryString.Add("scope", string.Join(" ", scopes));
        }
        else
        {
            queryString.Add("scope", string.Join(" ", GlobalConstants.DEFAULT_AUTH_SCOPES));
        }

        queryString.Add("redirect_uri", redirectUrl);

        if (!string.IsNullOrEmpty(state))
        {
            queryString.Add("state", state);
        }

        return XboxEndpoints.XboxLiveAuthorize + "?" + queryString.ToString();
    }


    public static async Task<OAuthTokenResponse?> RequestOAuthToken(string clientId, string authorizationCode, string redirectUrl, string clientSecret = "", string[]? scopes = null)
    {
        Dictionary<string,string> tokenRequestContent = new();

        tokenRequestContent.Add("grant_type", "authorization_code");
        tokenRequestContent.Add("code", authorizationCode);
        tokenRequestContent.Add("approval_prompt", "auto");

        if (scopes != null && scopes.Length > 0)
        {
            tokenRequestContent.Add("scope", String.Join(" ", scopes));
        }
        else
        {
            tokenRequestContent.Add("scope", String.Join(" ", GlobalConstants.DEFAULT_AUTH_SCOPES));
        }

        tokenRequestContent.Add("redirect_uri", redirectUrl);
        tokenRequestContent.Add("client_id", clientId);
        if (!string.IsNullOrEmpty(clientSecret))
        {
            tokenRequestContent.Add("client_secret", clientSecret);
        }

        var client = new HttpClient();
        var response = await client.PostAsync(XboxEndpoints.XboxLiveToken, new FormUrlEncodedContent(tokenRequestContent));

        if (response.IsSuccessStatusCode)
        { 
            OAuthTokenResponse? token = JsonSerializer.Deserialize<OAuthTokenResponse>(response.Content.ReadAsStringAsync().Result);
            return token;
        }
        else
        {
            return null;
        }
    }

    public static async Task<XboxUserTokenResponse?> RequestUserToken(string accessToken)
    {
        XboxUserTokenRequest ticketData = new();
        ticketData.RelyingParty = XboxEndpoints.XboxLiveAuthRelyingParty;
        ticketData.TokenType = "JWT";
        ticketData.Properties = new XboxTicketProperties()
        {
            AuthMethod = "RPS",
            SiteName = "user.auth.xboxlive.com",
            RpsTicket = string.Concat("d=", accessToken)
        };

        var client = new HttpClient();

        var request = new HttpRequestMessage()
        {
            RequestUri = new Uri(XboxEndpoints.XboxLiveUserAuthenticate),
            Method = HttpMethod.Post,
            Content = new StringContent(JsonSerializer.Serialize<XboxUserTokenRequest>(ticketData), Encoding.UTF8, "application/json")
        };

        request.Headers.Add("x-xbl-contract-version", "1");

        var response = await client.SendAsync(request);
        var responseData = response.Content.ReadAsStringAsync().Result;

        if (response.IsSuccessStatusCode)
        {
            XboxUserTokenResponse? ticket = JsonSerializer.Deserialize<XboxUserTokenResponse>(responseData);
            return ticket;
        }
        else
        {
            return null;
        }
    }

    public static async Task<XboxXstsTokenResponse?> RequestXstsToken(string userToken, bool useHaloRelyingParty = true)
    {
        XboxXstsTokenRequest requestData = new();
        if(useHaloRelyingParty)
        {
            requestData.RelyingParty = HaloCoreEndpoints.HaloWaypointXstsRelyingParty;
        }
        else
        {
            requestData.RelyingParty = XboxEndpoints.XboxLiveRelyingParty;
        }

        requestData.TokenType = "JWT";
        requestData.Properties = new XstsRequestProperties
        {
            UserTokens = [userToken],
            SandboxId = "RETAIL"
        };

        var client = new HttpClient();
        var data = JsonSerializer.Serialize<XboxXstsTokenRequest>(requestData);

        var request = new HttpRequestMessage()
        {
            RequestUri = new Uri(XboxEndpoints.XboxLiveXstsAuthorize),
            Method = HttpMethod.Post,
            Content = new StringContent(data, Encoding.UTF8, "application/json")
        };

        request.Headers.Add("x-xbl-contract-version", "1");

        var response = await client.SendAsync(request);
        var responseData = response.Content.ReadAsStringAsync().Result;

        if (response.IsSuccessStatusCode)
        {
            XboxXstsTokenResponse? ticket = JsonSerializer.Deserialize<XboxXstsTokenResponse>(responseData);
            return ticket;
        }
        else
        {
            return null;
        }
    }

    public static string GetXboxLiveV3Token(string userHash, string userToken)
    {
        return $"XBL3.0 x={userHash};{userToken}";
    }

    public static async Task<SpartanTokenResponse?> GetSpartanToken(string xstsToken)
    {
        SpartanTokenRequest tokenRequest = new();
        tokenRequest.Audience = "urn:343:s3:services";
        tokenRequest.MinVersion = "4";
        tokenRequest.Proof = new SpartanTokenProof[]
        {
            new SpartanTokenProof()
            {
                Token = xstsToken,
                TokenType = "Xbox_XSTSv3"
            }
        };

        var client = new HttpClient();
        var data = JsonSerializer.Serialize<SpartanTokenRequest>(tokenRequest);

        var request = new HttpRequestMessage()
        {
            RequestUri = new Uri(SettingsEndpoints.SpartanTokenV4),
            Method = HttpMethod.Post,
            Content = new StringContent(data, Encoding.UTF8, "application/json")
        };

        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var response = await client.SendAsync(request);

        if (response.IsSuccessStatusCode)
        {
            return JsonSerializer.Deserialize<SpartanTokenResponse>(response.Content.ReadAsStringAsync().Result);
        }
        else
        {
            return null;
        }
    }

    public static async Task<ClearanceTokenResponse?> GetClearanceToken(string spartanToken)
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage()
        {
            RequestUri = new Uri("https://settings.svc.halowaypoint.com/oban/flight-configurations/titles/hi/audiences/RETAIL/active"),
            Method = HttpMethod.Post
        };

        request.Headers.Add("x-343-authorization-spartan", spartanToken);

        var response = await client.SendAsync(request);

        Console.WriteLine(response.StatusCode);

        if(response.IsSuccessStatusCode)
        {
            return JsonSerializer.Deserialize<ClearanceTokenResponse>(response.Content.ReadAsStringAsync().Result);
        }
        else
        {
            return null;
        }
    }
}
