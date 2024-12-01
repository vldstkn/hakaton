using Contracts.Parser;
using Gateway.Logic.Interfaces;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using System.Text.Json;

namespace Gateway.Logic
{
    public class ParserProvider(
        IOptions<ServicesUrlOptions> servicesUrl,
        IHttpClientFactory httpClientFactory
    ) : IParserProvider
    {
        public async Task<GetWildberriesDataResponse?> GetWildberriesData(
            GetWildberriesDataRequest request,
            CancellationToken cancellationToken
        )
        {
            using var client = httpClientFactory.CreateClient();

            var jsonString = await client.GetFromJsonAsync<GetWildberriesDataResponse>(
                $"{servicesUrl.Value.ParserUrl}/parser/get-wildberries-data?categoryId={request.Id}",
                new JsonSerializerOptions(JsonSerializerDefaults.Web),
                cancellationToken
            );

            return jsonString;
        }
    }
}
