using Newtonsoft.Json;
namespace ParserService.Logic.Entities
{

    public class Size
    {
        [JsonProperty("price")]
        public Price Price { get; set; }
    }

    public class Price
    {
        [JsonProperty("total")]
        public int TotalPrice { get; set; }
    }

    public class Product
    {
        [JsonProperty("Id")]
        public string ExternalId { get; set; } = string.Empty;
        [JsonProperty("dist")]
        public string ExternalBasket { get; set; } = string.Empty;
        [JsonProperty("name")]
        public string Name { get; set; } = string.Empty;

        [JsonProperty("entity")]
        public string Entity { get; set; } = string.Empty;

        [JsonProperty("reviewRating")]
        public double Rating { get; set; }

        [JsonProperty("feedbacks")]
        public int Feedbacks { get; set; }

        [JsonProperty("sizes")]
        public List<Size> Sizes { get; set; }
    }

    public class Data
    {
        [JsonProperty("products")]
        public List<Product> Products { get; set; }
    }

    public class Root
    {
        [JsonProperty("data")]
        public Data Data { get; set; }
    }


}
