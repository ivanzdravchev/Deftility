using Deftility.Data;
using Deftility.Data.Models;
using Deftility.Data.Repository;
using Deftility.Services;
using Deftility.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Deftility.Tests.Services
{
    public class CategoriesServiceTests
    {
        private readonly IRepository<Category> categoriesRepository;
        private readonly ICategoriesService categoriesService;

        public CategoriesServiceTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var dbContext = new ApplicationDbContext(options);

            this.categoriesRepository = new EfRepository<Category>(dbContext);
            this.categoriesService = new CategoriesService(categoriesRepository);
        }

        [Fact]
        public void AllReturnsEmptyCollection()
        {
            var allCategories = categoriesService.All().ToList();
            Assert.Empty(allCategories);
        }

        [Fact]
        public async Task AddAsyncAddsNewCategorySuccessfully()
        {
            await categoriesService.AddAsync("Programming");

            Assert.Single(categoriesService.All());
            Assert.Equal("Programming", categoriesService.All().First().Name);
        }

        [Fact]
        public async Task AddRangeAsyncAddsNewCategoriesSuccessfully()
        {
            await categoriesService.AddRangeAsync(new string[] { "C#", "React" });

            Assert.Equal(2, categoriesService.All().Count());
            Assert.NotNull(categoriesService.All().SingleOrDefault(c => c.Name == "C#"));
            Assert.NotNull(categoriesService.All().SingleOrDefault(c => c.Name == "React"));
        }

        [Fact]
        public async Task RemoveAsyncRemovesCategorySuccessfully()
        {
            await categoriesService.AddAsync("Programming");

            Assert.Single(categoriesService.All());

            var category = categoriesRepository.All().First();

            Assert.Equal("Programming", category.Name);

            await categoriesService.RemoveAsync(category);

            Assert.Empty(categoriesService.All());
        }

        [Fact]
        public void FindReturnsNullWhenNotFound()
        {
            var category = categoriesService.Find("MissingId");

            Assert.Null(category);
        }

        [Fact]
        public async Task FindReturnsCategoryWhenFound()
        {
            await categoriesService.AddAsync("Programming");

            var categoryDto = categoriesService.All().First();

            var category = categoriesService.Find(categoryDto.Id);

            Assert.IsType<Category>(category);
            Assert.Equal("Programming", category.Name);
        }

        [Fact]
        public void ExistsReturnsFalseWhenNotFound()
        {
            var categoryExists = categoriesService.Exists("MissingId");

            Assert.False(categoryExists);
        }

        [Fact]
        public async Task ExistsReturnsTrueWhenFound()
        {
            await categoriesService.AddAsync("Programming");

            var categoryDto = categoriesService.All().First();

            var categoryExists = categoriesService.Exists(categoryDto.Id);

            Assert.True(categoryExists);
        }
    }
}
