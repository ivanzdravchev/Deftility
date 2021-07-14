using Microsoft.AspNetCore.Builder;

namespace Deftility.Middlewares.Extensions
{
    public static class SeedRolesExtension
    {
        public static IApplicationBuilder UseSeedRolesMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<SeedRolesMiddleware>();
        }
    }
}
