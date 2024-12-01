using Newtonsoft.Json;

namespace Contracts.Product
{
    public record GetByUserIdRequest(int Id);
    public record GetByUserIdResponse(IEnumerable<GetByUserIdProduct> Products);

    public record GetByUserIdProduct(
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
