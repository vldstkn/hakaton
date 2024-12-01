using Contracts.Parser;
using Microsoft.AspNetCore.Mvc;
using ParserService.Logic.Handlers;

namespace ParserService.API.Controllers
{
    [ApiController]
    [Route("parser")]
    public class ParserController(IParser parser) : ControllerBase
    {
        [HttpGet("get-wildberries-data")]
        public async Task<ActionResult<GetWildberriesDataResponse>> GetWildberriesData(
            [FromQuery] int categoryId,
            CancellationToken cancellationToken
        )
        {
            var data = await parser.Parse(categoryId, cancellationToken);

            return new GetWildberriesDataResponse(data);
        }
    }
}
