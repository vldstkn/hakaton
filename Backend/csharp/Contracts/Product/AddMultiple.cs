using Newtonsoft.Json;

namespace Contracts.Product
{
    public record AddMultipleRequest(IEnumerable<AddMultipleProduct> Products);

    public record AddMultipleResponse([property: JsonProperty("is_success")] bool UserId);

    public record AddMultipleProduct(
        int Price,
        double Rating,
        string Link,
        string Name,
        string Description,
        [property: JsonProperty("number_reviews")] int NumberReviews,
        [property: JsonProperty("cat_id")] int CategoryId);
}
