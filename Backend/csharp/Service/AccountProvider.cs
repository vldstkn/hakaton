using Contracts.Account;
using Gateway.Logic.Interfaces;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http.Json;
using System.Net.Mime;
using System.Text;
using System.Text.Json;

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

            var response = await client.PostAsJsonAsync(
                $"{servicesUrl.Value.AccountUrl}/auth/register",
                request,
                new JsonSerializerOptions(JsonSerializerDefaults.Web),
                cancellationToken
            ).ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);
            var data = JsonConvert.DeserializeObject<RegisterResponse>(responseBody);

            return data;
        }

        public async Task<LoginResponse?> Login(
            LoginRequest request,
            CancellationToken cancellationToken
        )
        {
            using var client = httpClientFactory.CreateClient();

            var response = await client.PostAsJsonAsync(
                $"{servicesUrl.Value.AccountUrl}/auth/login",
                request,
                new JsonSerializerOptions(JsonSerializerDefaults.Web),
                cancellationToken
            ).ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);
            var data = JsonConvert.DeserializeObject<LoginResponse>(responseBody);

            return data;
        }

        public async Task<GetNewTokensResponse?> GetNewTokens(
            GetNewTokensRequest request,
            CancellationToken cancellationToken
        )
        {
            using var client = httpClientFactory.CreateClient();

            var message = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"{servicesUrl.Value.AccountUrl}/auth/login/access-token"),
                Content = new StringContent(
                JsonConvert.SerializeObject(request),
                Encoding.UTF8,
                MediaTypeNames.Application.Json),
            };

            var response = await client.SendAsync(message, cancellationToken)
                .ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);
            var data = JsonConvert.DeserializeObject<GetNewTokensResponse>(responseBody);

            return data;
        }

        public async Task<GetProfileResponse?> GetProfile(
            GetProfileRequest request,
            CancellationToken cancellationToken
        )
        {
            using var client = httpClientFactory.CreateClient();

            var message = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri($"{servicesUrl.Value.AccountUrl}/account/profile"),
                Content = new StringContent(
                JsonConvert.SerializeObject(request),
                Encoding.UTF8,
                MediaTypeNames.Application.Json),
            };

            var response = await client.SendAsync(message, cancellationToken)
                .ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);
            var data = JsonConvert.DeserializeObject<GetProfileResponse>(responseBody);

            return data;
        }
    }
}
