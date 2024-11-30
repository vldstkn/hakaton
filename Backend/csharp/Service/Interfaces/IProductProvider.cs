using Contracts.Product;

namespace Gateway.Logic.Interfaces
{
    public interface IProductProvider
    {
        public Task<GetAllProductsResponse?> GetAllProductsAsync(CancellationToken cancellationToken);
    }
}
