using Contracts.Parser;
using Newtonsoft.Json;
using ParserService.Logic.Entities;

namespace ParserService.Logic.Handlers
{
    public class Parser(IHttpClientFactory httpClientFactory) : IParser
    {
        private readonly string _defaultRequest = "https://catalog.wb.ru/catalog/{0}/v2/catalog?ab_testing=false&appType=1&cat={1}&curr=rub&dest=-365403&sort=popular&spp=30";
        private readonly string _externalLink = "https://www.wildberries.ru/catalog/{0}/detail.aspx";
        private readonly Dictionary<int, string> _categories = new()
        {
            { 8194, "men_shoes"},
            { 9491, "electronic18"},
            { 60600, "bedroom3"}
        };

        public async Task<List<ProductInternal>> Parse(int categoryId, CancellationToken cancellationToken)
        {
            using var client = httpClientFactory.CreateClient();

            var currentCategory = _categories.TryGetValue(categoryId, out var externalCategory);

            var json = await client.GetStringAsync(
                string.Format(_defaultRequest, externalCategory, categoryId),
                cancellationToken
            );

            var productList = new List<ProductInternal>();

            if (string.IsNullOrEmpty(json))
            {
                return productList;
            }

            var root = JsonConvert.DeserializeObject<Root>(json);

            if (root == null)
            {
                return productList;
            }

            foreach (var product in root.Data.Products)
            {
                productList.Add(new ProductInternal(string.Format(_externalLink, product.ExternalId), product.Name, product.Entity, product.Rating, product.Feedbacks, product.Sizes.First().Price.TotalPrice, string.Empty));
            }

            return productList;
        }
    }
}
