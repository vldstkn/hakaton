using System.Net.Http.Json;
using System.Text.Json;
using Contracts.Account;
using Gateway.Logic.Interfaces;
using Microsoft.Extensions.Options;

namespace Gateway.Logic
{
    public class AccountProvider(
        IOptions<ServicesUrlOptions> servicesUrl,
        IHttpClientFactory httpClientFactory
    ) : IAccountProvider
    {
        public async Task<RegisterResponse?> Register(
            RegisterRequest request,
            CancellationToken cancellationToken
        )
        {
            using var client = httpClientFactory.CreateClient();

            var data = await client.GetFromJsonAsync<RegisterResponse>(
                $"{servicesUrl.Value.AccountUrl}/auth/register?email={request.Email}&password{request.Password}&name{request.Name}",
                new JsonSerializerOptions(JsonSerializerDefaults.Web),
                cancellationToken
            );

            return data;
        }

        public async Task<LoginResponse?> Login(
            LoginRequest request,
            CancellationToken cancellationToken
        )
        {
            using var client = httpClientFactory.CreateClient();

            var data = await client.GetFromJsonAsync<LoginResponse>(
                $"{servicesUrl.Value.AccountUrl}/auth/register?email={request.Email}&password{request.Password}",
                new JsonSerializerOptions(JsonSerializerDefaults.Web),
                cancellationToken
            );

            return data;
        }

        public async Task<GetNewTokensResponse?> GetNewTokens(
            GetNewTokensRequest request,
            CancellationToken cancellationToken
        )
        {
            using var client = httpClientFactory.CreateClient();

            var data = await client.GetFromJsonAsync<GetNewTokensResponse>(
                $"{servicesUrl.Value.AccountUrl}auth/register?refresh_token={request.RefreshToken}",
                new JsonSerializerOptions(JsonSerializerDefaults.Web),
                cancellationToken
            );

            return data;
        }

        public async Task<GetProfileResponse?> GetProfile(
            GetProfileRequest request,
            CancellationToken cancellationToken
        )
        {
            using var client = httpClientFactory.CreateClient();

            var data = await client.GetFromJsonAsync<GetProfileResponse>(
                $"{servicesUrl.Value.AccountUrl}/account/profile?id={request.UserId}",
                new JsonSerializerOptions(JsonSerializerDefaults.Web),
                cancellationToken
            );

            return data;
        }
    }
}
