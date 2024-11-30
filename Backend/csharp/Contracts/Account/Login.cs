using Newtonsoft.Json;

namespace Contracts.Account
{
    public record LoginRequest(string Email, string Password);

    public record LoginResponse(int Id, [property: JsonProperty("access_token")] string AccessToken, [property: JsonProperty("refresh_token")] string RefreshToken);
}
