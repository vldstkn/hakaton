using ParserService.Logic.Entities;

namespace ParserService.Logic.Handlers
{
    public class Parser(IHttpClientFactory httpClientFactory) : IParser
    {
        public IEnumerable<string>? Parse(WildberriesParameters parameters)
        {
            using var client = httpClientFactory.CreateClient();

            var dataSet = new Dictionary<int, IEnumerable<string>>
            {
                {
                    1,
                    new List<string> { "value1", "value2", "value3" }
                },
                {
                    2,
                    new List<string> { "value4", "value5", "value6" }
                },
                {
                    3,
                    new List<string> { "value7", "value8", "value9" }
                },
            };

            var data = dataSet.FirstOrDefault(x => x.Key == parameters.Id).Value;
            return null;
        }
    }
}
