using Newtonsoft.Json;

namespace Contracts.Account
{
    public record RegisterRequest(string Email, string Password, string Name);

    public record RegisterResponse(int Id, [property: JsonProperty("access_token")] string AccessToken, [property: JsonProperty("refresh_token")] string RefreshToken);
}
