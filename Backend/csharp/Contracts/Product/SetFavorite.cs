using Newtonsoft.Json;

namespace Contracts.Product
{
    public record SetFavoriteRequest([property: JsonProperty("user_id")] int UserId, [property: JsonProperty("product_id")] int ProductId);
    public record SetFavoriteResponse([property: JsonProperty("is_success")] bool UserId);
}
