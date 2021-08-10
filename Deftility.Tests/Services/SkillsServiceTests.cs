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
    public class SkillsServiceTests
    {
        private readonly IRepository<Skill> skillsRepository;
        private readonly ISkillsService skillsService;

        public SkillsServiceTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var dbContext = new ApplicationDbContext(options);

            this.skillsRepository = new EfRepository<Skill>(dbContext);
            this.skillsService = new SkillsService(skillsRepository);
        }

        [Fact]
        public void AllReturnsEmptyCollection()
        {
            var allSkills = skillsService.All().ToList();
            Assert.Empty(allSkills);
        }

        [Fact]
        public async Task AddAsyncAddsNewSkillSuccessfully()
        {
            await skillsService.AddAsync("HTML");

            Assert.Single(skillsService.All());
            Assert.Equal("HTML", skillsService.All().First().Name);
        }

        [Fact]
        public async Task AddRangeAsyncAddsNewSkillsSuccessfully()
        {
            await skillsService.AddRangeAsync(new string[] { "HTML", "CSS" });

            Assert.Equal(2, skillsService.All().Count());
            Assert.NotNull(skillsService.All().SingleOrDefault(s => s.Name == "HTML"));
            Assert.NotNull(skillsService.All().SingleOrDefault(s => s.Name == "CSS"));
        }

        [Fact]
        public async Task RemoveAsyncRemovesSkillSuccessfully()
        {
            await skillsService.AddAsync("HTML");

            Assert.Single(skillsService.All());

            var skill = skillsRepository.All().First();

            Assert.Equal("HTML", skill.Name);

            await skillsService.RemoveAsync(skill);

            Assert.Empty(skillsService.All());
        }

        [Fact]
        public void FindReturnsNullWhenNotFound()
        {
            var skill = skillsService.Find("MissingId");

            Assert.Null(skill);
        }

        [Fact]
        public async Task FindReturnsSkillWhenFound()
        {
            await skillsService.AddAsync("HTML");

            var skillDto = skillsService.All().First();

            var skill = skillsService.Find(skillDto.Id);

            Assert.IsType<Skill>(skill);
            Assert.Equal("HTML", skill.Name);
        }

        [Fact]
        public void ExistsReturnsFalseWhenNotFound()
        {
            var skillExists = skillsService.Exists("MissingId");

            Assert.False(skillExists);
        }

        [Fact]
        public async Task ExistsReturnsTrueWhenFound()
        {
            await skillsService.AddAsync("HTML");

            var skillDto = skillsService.All().First();

            var skillExists = skillsService.Exists(skillDto.Id);

            Assert.True(skillExists);
        }
    }
}
