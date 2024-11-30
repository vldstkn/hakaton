using Contracts.Parser;
using Microsoft.AspNetCore.Mvc;
using ParserService.Logic.Entities;
using ParserService.Logic.Handlers;

namespace ParserService.API.Controllers
{
    [ApiController]
    [Route("parser")]
    public class ParserController(IParser parser) : ControllerBase
    {
        [HttpGet("get-wildberries-data")]
        public async Task<ActionResult<GetWildberriesDataResponse>> GetWildberriesData(
            [FromQuery] int id,
            CancellationToken cancellationToken
        )
        {
            var data = parser.Parse(new WildberriesParameters(id));

            return new GetWildberriesDataResponse(data);
        }
    }
}
