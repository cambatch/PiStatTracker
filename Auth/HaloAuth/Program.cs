using Authentication;
using Constants;
using XboxAuth;
using HaloStats;

namespace Program;

internal class Program
{
    private static readonly string clientId = "";
    private static readonly string redirectUrl = "https://localhost";
    private static readonly string authCode = "";
    private static readonly string clientSecret = "";


    public static async Task? Main(string[] args)
    {
        OAuth.OAuthTokenResponse? authTokenResponse = await Auth.RequestOAuthToken(clientId, authCode, redirectUrl, clientSecret, GlobalConstants.DEFAULT_AUTH_SCOPES);
        if(authTokenResponse == null)
        {
            Console.WriteLine("Failed to get OAuthToken!");
            Console.WriteLine("Creating authentication URL...");
            string authUrl = Auth.GenerateAuthUrl(clientId, redirectUrl);
            Console.WriteLine(authUrl);
            return;
        }

        XboxUserTokenResponse? userTokenResponse = null;

        if(authTokenResponse.AccessToken != null)
        {
            userTokenResponse = await Auth.RequestUserToken(authTokenResponse.AccessToken);
        }

        if(userTokenResponse == null)
        {
            Console.WriteLine("User token is null!");
            return;
        }

        XboxXstsTokenResponse? xstsTokenResponse = null;

        if(userTokenResponse.Token != null)
        {
            xstsTokenResponse = await Auth.RequestXstsToken(userTokenResponse.Token);
        }

        if(xstsTokenResponse == null)
        {
            Console.WriteLine("Failed to get xsts token!");
            return;
        }

        SpartanTokenResponse? spartanTokenResponse = null;

        if(xstsTokenResponse.Token != null)
        {
            spartanTokenResponse = await Auth.GetSpartanToken(xstsTokenResponse.Token);
        }

        if(spartanTokenResponse == null)
        {
            Console.WriteLine("Failed to get spartan token!");
            return;
        }

        if(spartanTokenResponse.SpartanToken == null)
        {
            Console.WriteLine("Spartan token is null!");
            return;
        }

        Console.WriteLine("Spartan Token: " + spartanTokenResponse.SpartanToken);

        var response = await Stats.GetSpartanRecord(spartanTokenResponse.SpartanToken, "Mom Juices");
        if(response != null)
        {
            Console.WriteLine(await response.ReadAsStringAsync());
        }
    }
}
