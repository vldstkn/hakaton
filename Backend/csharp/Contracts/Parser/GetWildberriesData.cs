using Newtonsoft.Json;

namespace Contracts.Parser
{
    public record GetWildberriesDataRequest(int Id);

    public record GetWildberriesDataResponse(List<ProductInternal> Products);

    public record ProductInternal(string Link, string Name, [property: JsonProperty("cat_id")] string CategoryId, double Rating, [property: JsonProperty("number_reviews")] int NumberReviews, int Price, string Description);
}
