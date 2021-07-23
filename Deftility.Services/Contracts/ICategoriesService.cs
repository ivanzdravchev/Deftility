using Deftility.DTOs.Category;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Deftility.Services.Contracts
{
    public interface ICategoriesService
    {
        IEnumerable<CategoryDTO> All();

        Task AddAsync(string categoryName);

        Task AddRangeAsync(IEnumerable<string> categories);
    }
}
