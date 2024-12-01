using Newtonsoft.Json;
using System.Text.Json;

namespace Contracts.Product
{
    public record GetRecomRequest(int Id);

    public record GetRecomResponse(IEnumerable<GetRecomProduct> Products);

    public record GetRecomProduct(
        [property: JsonProperty("created_at")] DateTime CreatedAt,
        [property: JsonProperty("updated_at")] DateTime UpdatedAt,
        [property: JsonProperty("number_reviews")] int NumberReviews,
        [property: JsonProperty("cat_id")] string CategoryId,
        int Id,
        double Rating,
        int Price,
        string Link,
        string Name,
        string Description,
        int? Embedding);
}
