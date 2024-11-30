namespace Contracts.Parser
{
    public record GetWildberriesDataRequest(int Id);

    public record GetWildberriesDataResponse(IEnumerable<string>? Data);
}
