using ParserService.Logic.Entities;

namespace ParserService.Logic.Handlers
{
    public interface IParser
    {
        public IEnumerable<string>? Parse(WildberriesParameters parameters);
    }
}
