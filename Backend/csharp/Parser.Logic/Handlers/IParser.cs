using Contracts.Parser;

namespace ParserService.Logic.Handlers
{
    public interface IParser
    {
        public Task<List<ProductInternal>> Parse(int categoryId, CancellationToken cancellationToken);
    }
}
