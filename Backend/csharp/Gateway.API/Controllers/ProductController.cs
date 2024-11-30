using Gateway.Logic.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Gateway.API.Controllers
{
    [ApiController]
    [Route("api/gateway/product")]
    public class ProductController(IProductProvider productProvider) : ControllerBase { }
}
