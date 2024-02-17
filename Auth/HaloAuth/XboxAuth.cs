
using System.Runtime.ConstrainedExecution;
using System.Text.Json.Serialization;

namespace XboxAuth;

public class ClearanceTokenResponse
{
    [JsonPropertyName("FlightConfigurationId")]
    public string? ClearanceToken { get; set; }
}

public class SpartanTokenResponse
{
    [JsonPropertyName("ExpiresUtc")]
    public UtcDate? ExpiresUtc { get; set; }

    [JsonPropertyName("SpartanToken")]
    public string? SpartanToken { get; set; }

    [JsonPropertyName("TokenDuration")]
    public string? TokenDuration { get; set; }
}

public class UtcDate
{
    [JsonPropertyName("ISO8601Date")]
    public string? ISO8601Date { get; set; }
}

public class SpartanTokenRequest
{
    [JsonPropertyName("Audience")]
    public string? Audience { get; set; }

    [JsonPropertyName("MinVersion")]
    public string? MinVersion { get; set; }

    [JsonPropertyName("Proof")]
    public SpartanTokenProof[]? Proof { get; set; }
}

public class SpartanTokenProof
{
    [JsonPropertyName("Token")]
    public string? Token { get; set; }

    [JsonPropertyName("TokenType")]
    public string? TokenType { get; set; }
}

public class XboxXstsTokenResponse
{
    [JsonPropertyName("DisplayClaims")]
    public DisplayClaims? DisplayClaims { get; set; }

    [JsonPropertyName("IssueInstant")]
    public string? IssueInstant { get; set; }

    [JsonPropertyName("NotAfter")]
    public string?  NotAfter { get; set; }

    [JsonPropertyName("Token")]
    public string? Token { get; set; }
}


public class XboxXstsTokenRequest
{
    [JsonPropertyName("Properties")]
    public XstsRequestProperties? Properties { get; set; }

    [JsonPropertyName("RelyingParty")]
    public string? RelyingParty { get; set; }

    [JsonPropertyName("TokenType")]
    public string? TokenType { get; set; }
}

public class XstsRequestProperties
{
    [JsonPropertyName("SandboxId")]
    public string? SandboxId { get; set; }

    [JsonPropertyName("UserTokens")]
    public string[]? UserTokens { get; set; }
}


public class XboxUserTokenResponse
{
    [JsonPropertyName("DisplayClaims")]
    public DisplayClaims? DisplayClaims { get; set; }

    [JsonPropertyName("IssueInstant")]
    public string? IssueInstant { get; set; }

    [JsonPropertyName("NotAfter")]
    public string? NotAfter { get; set; }

    [JsonPropertyName("Token")]
    public string? Token { get; set; }
}

public class DisplayClaims
{
    [JsonPropertyName("xui")]
    public Xui[]? Xui { get; set; }
}

public class Xui
{
    [JsonPropertyName("uhs")]
    public string? Uhs { get; set; }
}

public class XboxUserTokenRequest
{
    [JsonPropertyName("Properties")]
    public XboxTicketProperties? Properties { get; set; }

    [JsonPropertyName("RelyingParty")]
    public string? RelyingParty { get; set; }

    [JsonPropertyName("TokenType")]
    public string? TokenType { get; set; }
}

public class XboxTicketProperties
{
    [JsonPropertyName("AuthMethod")]
    public string? AuthMethod { get; set; }

    [JsonPropertyName("RpsTicket")]
    public string? RpsTicket { get; set; }

    [JsonPropertyName("SiteName")]
    public string? SiteName { get; set; }
}
