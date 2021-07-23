using Deftility.Data;
using System;
using System.Threading.Tasks;

namespace Deftility.Services.Seeding
{
    public interface ISeeder
    {
        Task SeedAsync(ApplicationDbContext context, IServiceProvider serviceProvider);
    }
}
