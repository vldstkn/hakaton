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

            if (data == null)
            {
                return BadRequest("Registration failed");
            }

            return data;
        }
    }
}
