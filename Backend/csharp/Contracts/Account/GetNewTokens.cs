namespace Contracts.Account
{
    public record GetNewTokensRequest(string RefreshToken);

    public record GetNewTokensResponse(string RefreshToken, string AccessToken);
}
