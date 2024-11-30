namespace Contracts.Account
{
    public record GetProfileRequest(int UserId);

    public record GetProfileResponse(int Id, string AccessToken, string RefreshToken);
}
