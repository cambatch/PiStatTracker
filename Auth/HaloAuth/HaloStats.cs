

namespace HaloStats;

public static class Stats
{
    private static HttpClient httpClient = new();

    public static async Task<HttpContent?> GetSpartanRecord(string spartanToken, string gamertag)
    {
        var request = new HttpRequestMessage
        {
            RequestUri = new Uri($"https://halostats.svc.halowaypoint.com/hi/players/{gamertag}/Matchmade/servicerecord?seasonId=Csr/Seasons/CsrSeason5-1.json"),
            Method = HttpMethod.Get
        };

        request.Headers.Add("X-343-Authorization-Spartan", spartanToken);

        var response = await httpClient.SendAsync(request);

        if(response.IsSuccessStatusCode)
        {
            return response.Content;
        }
        else
        {
            return null;
        }
    }
}

