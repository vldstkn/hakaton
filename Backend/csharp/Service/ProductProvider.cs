using Contracts.Product;
using Gateway.Logic.Interfaces;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http.Json;
using System.Text.Json;

namespace Gateway.Logic
{
    public class ProductProvider(IOptions<ServicesUrlOptions> servicesUrl, IHttpClientFactory httpClientFactory) : IProductProvider
    {
        public async Task<GetAllProductsResponse?> GetAllProductsAsync(CancellationToken cancellationToken)
        {
            using var client = httpClientFactory.CreateClient();

            var response = await client.PostAsync($"{servicesUrl.Value.ProductUrl}/products/all", null, cancellationToken).ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);
            var data = JsonConvert.DeserializeObject<GetAllProductsResponse>(responseBody);

            return data;
        }

        public async Task<AddMultipleResponse?> AddMultiple(
            AddMultipleRequest request,
            CancellationToken cancellationToken
        )
        {
            using var client = httpClientFactory.CreateClient();

            var response = await client.PostAsJsonAsync(
                $"{servicesUrl.Value.ProductUrl}/products/add-multiple",
                request,
                new JsonSerializerOptions(JsonSerializerDefaults.Web),
                cancellationToken
            ).ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);
            var data = JsonConvert.DeserializeObject<AddMultipleResponse>(responseBody);

            return data;
        }

        public async Task<GetBySearchResponse?> GetBySearch(
            GetBySearchRequest request,
            CancellationToken cancellationToken
        )
        {
            using var client = httpClientFactory.CreateClient();

            var response = await client.PostAsJsonAsync(
                $"{servicesUrl.Value.ProductUrl}/products/search",
                request,
                new JsonSerializerOptions(JsonSerializerDefaults.Web),
                cancellationToken
            ).ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);
            var data = JsonConvert.DeserializeObject<GetBySearchResponse>(responseBody);

            return data;
        }

        public async Task<GetByUserIdResponse?> GetByUserId(
            GetByUserIdRequest request,
            CancellationToken cancellationToken
        )
        {
            using var client = httpClientFactory.CreateClient();

            var response = await client.PostAsJsonAsync(
                $"{servicesUrl.Value.ProductUrl}/products/user",
                request,
                new JsonSerializerOptions(JsonSerializerDefaults.Web),
                cancellationToken
            ).ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);
            var data = JsonConvert.DeserializeObject<GetByUserIdResponse>(responseBody);

            return data;
        }

        public async Task<GetRecomResponse?> GetRecom(
            GetRecomRequest request,
            CancellationToken cancellationToken
        )
        {
            using var client = httpClientFactory.CreateClient();

            var response = await client.PostAsJsonAsync(
                $"{servicesUrl.Value.ProductUrl}/products/recom",
                request,
                new JsonSerializerOptions(JsonSerializerDefaults.Web),
                cancellationToken
            ).ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);
            var data = JsonConvert.DeserializeObject<GetRecomResponse>(responseBody);

            return data;
        }

        public async Task<SetFavoriteResponse?> SetFavorite(
            SetFavoriteRequest request,
            CancellationToken cancellationToken
        )
        {
            using var client = httpClientFactory.CreateClient();

            var response = await client.PostAsJsonAsync(
                $"{servicesUrl.Value.ProductUrl}/products/recom",
                request,
                new JsonSerializerOptions(JsonSerializerDefaults.Web),
                cancellationToken
            ).ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);
            var data = JsonConvert.DeserializeObject<SetFavoriteResponse>(responseBody);

            return data;
        }
    }
}
