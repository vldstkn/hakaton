namespace Contracts.Account
{
    public record RegisterRequest(string Email, string Password, string Name);

    public record RegisterResponse(int Id, string AccessToken, string RefreshToken);
}
