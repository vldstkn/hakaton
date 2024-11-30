using Newtonsoft.Json;

namespace Contracts.Account
{
    public record GetNewTokensRequest([property: JsonProperty("refresh_token")] string RefreshToken);

    public record GetNewTokensResponse([property: JsonProperty("refresh_token")] string RefreshToken, [property: JsonProperty("access_token")] string AccessToken);
}
