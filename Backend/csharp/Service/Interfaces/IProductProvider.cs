using Contracts.Product;

namespace Gateway.Logic.Interfaces
{
    public interface IProductProvider
    {
        public Task<GetAllProductsResponse> GetAllProductsAsync(CancellationToken cancellationToken);

        public Task<AddMultipleResponse?> AddMultiple(
        AddMultipleRequest request,
            CancellationToken cancellationToken
        );

        public Task<GetBySearchResponse> GetBySearch(
            GetBySearchRequest request,
            CancellationToken cancellationToken
        );

        public Task<GetByUserIdResponse> GetByUserId(
            GetByUserIdRequest request,
            CancellationToken cancellationToken
        );

        public Task<GetRecomResponse> GetRecom(
        GetRecomRequest request,
            CancellationToken cancellationToken
        );

        public Task<SetFavoriteResponse?> SetFavorite(
            SetFavoriteRequest request,
            CancellationToken cancellationToken
        );
    }

}
