using Deftility.Data.Models;
using Deftility.Data.Repository;
using Deftility.DTOs.Category;
using Deftility.Services.Contracts;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deftility.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly IRepository<Category> categoriesRepository;

        public CategoriesService(IRepository<Category> categoriesRepository)
        {
            this.categoriesRepository = categoriesRepository;
        }

        public IEnumerable<CategoryDTO> All()
        {
            return this.categoriesRepository
                .All()
                .Select(c => new CategoryDTO
                {
                    Name = c.Name
                })
                .OrderBy(c => c.Name)
                .AsEnumerable();
        }

        public async Task AddAsync(string categoryName)
        {
            var category = new Category
            {
                Name = categoryName
            };

            this.categoriesRepository.Add(category);

            await this.categoriesRepository.SaveChangesAsync();
        }

        public async Task AddRangeAsync(IEnumerable<string> categories)
        {
            var newCategories = categories.Select(categoryName => new Category
            {
                Name = categoryName
            });

            this.categoriesRepository.AddRange(newCategories);

            await this.categoriesRepository.SaveChangesAsync();
        }
    }
}
