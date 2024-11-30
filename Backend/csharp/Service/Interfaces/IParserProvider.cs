using Contracts.Parser;

namespace Gateway.Logic.Interfaces
{
    public interface IParserProvider
    {
        public Task<GetWildberriesDataResponse> GetWildberriesData(
            GetWildberriesDataRequest request,
            CancellationToken cancellation
        );
    }
}
