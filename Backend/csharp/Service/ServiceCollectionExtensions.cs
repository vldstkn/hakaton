using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Gateway.Logic
{
    public static class ServiceCollectionExtensions
    {
        public static void AddGatewayLogic(this WebApplicationBuilder builder)
        {
            builder.Services.AddHttpClient();
            builder.Services.Configure<ServicesUrlOptions>(
                builder.Configuration.GetSection("ServicesUrlOptions")
            );
        }
    }

    public class ServicesUrlOptions
    {
        public string AccountUrl { get; set; } = string.Empty;
        public string ProductUrl { get; set; } = string.Empty;
        public string ParserUrl { get; set; } = string.Empty;
    }
}
