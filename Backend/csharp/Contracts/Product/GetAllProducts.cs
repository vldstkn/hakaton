using Newtonsoft.Json;

namespace Contracts.Product
{
    public record GetAllProductsResponse(
        IEnumerable<Product> Products);

    public record Product(
        int Id,
        int Price,
        double Rating,
        string Link,
        string Name,
        string Description,
        [property: JsonProperty("created_at")] DateTime CreatedAt,
        [property: JsonProperty("updated_at")] DateTime UpdatedAt,
        [property: JsonProperty("number_reviews")] int NumberReviews,
        [property: JsonProperty("cat_id")] int CategoryId);
}
