using Contracts.Account;

namespace Gateway.Logic.Interfaces
{
    public interface IAccountProvider
    {
        public Task<RegisterResponse?> Register(
            RegisterRequest request,
            CancellationToken cancellationToken
        );

        public Task<LoginResponse?> Login(
            LoginRequest request,
            CancellationToken cancellationToken
        );

        public Task<GetNewTokensResponse?> GetNewTokens(
            GetNewTokensRequest request,
            CancellationToken cancellationToken
        );

        public Task<GetProfileResponse?> GetProfile(
            GetProfileRequest request,
            CancellationToken cancellationToken
        );
    }
}
