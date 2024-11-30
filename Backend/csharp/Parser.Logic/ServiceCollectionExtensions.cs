using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace ParserService.Logic
{
    public static class ServiceCollectionExtensions
    {
        public static void AddParserLogic(this WebApplicationBuilder builder)
        {
            builder.Services.AddHttpClient();
        }
    }
}
