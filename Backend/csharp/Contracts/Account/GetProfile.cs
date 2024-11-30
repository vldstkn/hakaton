namespace Contracts.Account
{
    public record GetProfileRequest(int Id);

    public record GetProfileResponse(int Id, string Email, string Name);
}
