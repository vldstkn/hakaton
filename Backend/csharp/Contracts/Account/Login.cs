namespace Contracts.Account
{
    public record LoginRequest(string Email, string Password);

    public record LoginResponse(int Id, string AccessToken, string RefreshToken);
}
