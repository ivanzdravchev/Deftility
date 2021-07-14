using Deftility.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Deftility.Middlewares
{
    public class SeedRolesMiddleware
    {
        private readonly RequestDelegate _next;

        public SeedRolesMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context, IServiceProvider provider)
        {
            var userManager = provider.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = provider.GetRequiredService<RoleManager<IdentityRole>>();

            if (!userManager.Users.Any())
            {
                var adminRoleExists = roleManager.RoleExistsAsync("Admin").Result;
                if (!adminRoleExists)
                {
                    await roleManager.CreateAsync(new IdentityRole("Admin"));
                }

                var userRoleExists = roleManager.RoleExistsAsync("User").Result;
                if (!userRoleExists)
                {
                    await roleManager.CreateAsync(new IdentityRole("User"));
                }

                var adminUser = new ApplicationUser
                {
                    UserName = "admin",
                    Email = "admin@admin.com"
                };

                await userManager.CreateAsync(adminUser, "admin");
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }

            await this._next(context);
        }
    }
}