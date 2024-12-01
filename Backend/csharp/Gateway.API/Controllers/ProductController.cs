using Contracts.Product;
using Gateway.Logic.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Gateway.API.Controllers
{
    [ApiController]
    [Route("api/gateway/product")]
    public class ProductController(IProductProvider productProvider) : ControllerBase
    {
        [HttpGet("all")]
        public async Task<ActionResult<GetAllProductsResponse>> GetAllProducts(
                CancellationToken cancellationToken
            )
        {
            var data = await productProvider.GetAllProductsAsync(
                cancellationToken
            );

            return data;
        }

        [HttpPost("add-multiple")]
        public async Task<ActionResult<AddMultipleResponse>> AddMultiple([FromBody] AddMultipleRequest request, CancellationToken cancellationToken
            )
        {
            var data = await productProvider.AddMultiple(request, cancellationToken);

            if (data == null)
            {
                return BadRequest("Add multiple failed");
            }

            return data;
        }

        [HttpGet("get-by-search")]
        public async Task<ActionResult<GetBySearchResponse>> GetBySearch([FromQuery] string search, CancellationToken cancellationToken
            )
        {
            var data = await productProvider.GetBySearch(new GetBySearchRequest(search), cancellationToken);

            return data;
        }

        [HttpGet("get-by-user")]
        public async Task<ActionResult<GetByUserIdResponse>> GetByUser([FromQuery] int userId, CancellationToken cancellationToken
            )
        {
            var data = await productProvider.GetByUserId(new GetByUserIdRequest(userId), cancellationToken);

            return data;
        }

        [HttpGet("get-recom")]
        public async Task<ActionResult<GetRecomResponse>> GetRecom([FromQuery] int userId, CancellationToken cancellationToken
            )
        {
            var data = await productProvider.GetRecom(new GetRecomRequest(userId), cancellationToken);

            return data;
        }

        [HttpPost("set-favorite")]
        public async Task<ActionResult<SetFavoriteResponse>> SetFavorite([FromQuery] int userId, [FromQuery] int productId, CancellationToken cancellationToken
            )
        {
            var data = await productProvider.SetFavorite(new SetFavoriteRequest(userId, productId), cancellationToken);

            if (data == null)
            {
                return BadRequest("Set favorite failed");
            }

            return data;
        }


    }
}
