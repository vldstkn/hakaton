using Contracts.Parser;
using Gateway.Logic.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Gateway.API.Controllers
{
    [ApiController]
    [Route("api/gateway/parser")]
    public class ParserServiceController(IParserProvider parserProvider) : ControllerBase
    {
        [HttpGet("parse")]
        public async Task<ActionResult<GetWildberriesDataResponse>> Register(
            [FromQuery] int id,
            CancellationToken cancellationToken
        )
        {
            var data = await parserProvider.GetWildberriesData(
                new GetWildberriesDataRequest(id),
                cancellationToken
            );

            if (data == null)
            {
                return BadRequest("Parsing failed");
            }

            return data;
        }
    }
}
