using Contracts.Account;
using Gateway.Logic.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Gateway.API.Controllers
{
    [ApiController]
    [Route("api/gateway/account")]
    public class AccountController(IAccountProvider accountProvider) : ControllerBase
    {
        [HttpGet("register")]
        public async Task<ActionResult<RegisterResponse>> Register(
            [FromQuery] string email,
            [FromQuery] string password,
            [FromQuery] string name,
            CancellationToken cancellationToken
        )
        {
            var data = await accountProvider.Register(
                new RegisterRequest(email, password, name),
                cancellationToken
            );

            if (data == null)
            {
                return BadRequest("Registration failed");
            }

            return data;
        }

        [HttpGet("login")]
        public async Task<ActionResult<LoginResponse>> Login(
            [FromQuery] string email,
            [FromQuery] string password,
            CancellationToken cancellationToken
        )
        {
            var data = await accountProvider.Login(
                new LoginRequest(email, password),
                cancellationToken
            );

            if (data == null)
            {
                return BadRequest("Login failed");
            }

            return data;
        }

        [HttpGet("get-new-tokens")]
        public async Task<ActionResult<GetNewTokensResponse>> GetNewTokens(
            [FromQuery] string refreshToken,
            CancellationToken cancellationToken
        )
        {
            var data = await accountProvider.GetNewTokens(
                new GetNewTokensRequest(refreshToken),
                cancellationToken
            );

            if (data == null)
            {
                return BadRequest("Get new tokens failed");
            }

            return data;
        }

        [HttpGet("get-profile")]
        public async Task<ActionResult<GetProfileResponse>> GetProfile(
            [FromQuery] int userId,
            CancellationToken cancellationToken
        )
        {
            var data = await accountProvider.GetProfile(
                new GetProfileRequest(userId),
                cancellationToken
            );

            if (data == null)
            {
                return BadRequest("Get new tokens failed");
            }

            return data;
        }
    }
}
