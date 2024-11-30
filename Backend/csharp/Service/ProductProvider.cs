using Contracts.Product;
using Gateway.Logic.Interfaces;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

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
    }
}
