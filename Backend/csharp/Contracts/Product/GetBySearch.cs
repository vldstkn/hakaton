using Newtonsoft.Json;

namespace Contracts.Product
{
    public record GetBySearchRequest(string Search);
    public record GetBySearchResponse(IEnumerable<GetBySearchProduct> Products);
    public record GetBySearchProduct(
        int Id,
        [property: JsonProperty("created_at")] DateTime CreatedAt,
        [property: JsonProperty("updated_at")] DateTime UpdatedAt,
        [property: JsonProperty("number_reviews")] int NumberReviews,
        double Rating,
        int Price);
}
