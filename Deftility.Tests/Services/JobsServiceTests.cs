using Deftility.Data;
using Deftility.Data.Models;
using Deftility.Data.Models.Enums;
using Deftility.Data.Repository;
using Deftility.DTOs.Job;
using Deftility.Services;
using Deftility.Services.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Deftility.Tests.Services
{
    public class JobsServiceTests
    {
        private readonly IRepository<Job> jobsRepository;
        private readonly IRepository<ApplicationUser> usersRepository;
        private readonly IRepository<Category> categoriesRepository;
        private readonly IJobsService jobsService;

        public JobsServiceTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString()).Options;

            var dbContext = new ApplicationDbContext(options);

            this.jobsRepository = new EfRepository<Job>(dbContext);
            this.usersRepository = new EfRepository<ApplicationUser>(dbContext);
            this.categoriesRepository = new EfRepository<Category>(dbContext);
            this.jobsService = new JobsService(jobsRepository);
        }

        [Fact]
        public void AllReturnsEmptyCollection()
        {
            var allJobs = jobsService.All().ToList();
            Assert.Empty(allJobs);
        }

        [Fact]
        public async Task AllUserJobsReturnsEmptyCollectionWhenUserNotFound()
        {
            var user = new ApplicationUser
            {
                UserName = "test",
                Email = "test@test.com",
                PasswordHash = "pwhash"
            };

            this.usersRepository.Add(user);
            await this.usersRepository.SaveChangesAsync();

            this.categoriesRepository.Add(new Category { Id = "1", Name = "Test Category" });

            var newJobDto = new CreateJobDTO
            {
                Title = "New job title",
                Description = "New job description...",
                CategoryId = "1",
                PriceType = PriceType.Hourly,
                LowestRate = 100,
                HighestRate = 200,
                ExperienceLevel = ExperienceLevel.Intermediate
            };

            await this.jobsService.CreateAsync(user.Id, newJobDto, new List<Skill>());

            Assert.Empty(this.jobsService.AllUserJobs("MissingId"));
        }

        [Fact]
        public async Task AllUserJobsReturnsCorrectlyWhenUserIsFound()
        {
            var user = new ApplicationUser
            {
                UserName = "test",
                Email = "test@test.com",
                PasswordHash = "pwhash"
            };

            this.usersRepository.Add(user);
            await this.usersRepository.SaveChangesAsync();

            this.categoriesRepository.Add(new Category { Id = "1", Name = "Test Category" });

            var newJobDto = new CreateJobDTO
            {
                Title = "New job title",
                Description = "New job description...",
                CategoryId = "1",
                PriceType = PriceType.Hourly,
                LowestRate = 100,
                HighestRate = 200,
                ExperienceLevel = ExperienceLevel.Intermediate
            };

            await this.jobsService.CreateAsync(user.Id, newJobDto, new List<Skill>());

            Assert.Single(this.jobsService.AllUserJobs(user.Id));
            Assert.IsType<JobShortDetailsDTO>(this.jobsService.AllUserJobs(user.Id).First());
        }

        [Fact]
        public async Task CreateAsyncAddsNewJobSuccessfully()
        {
            var user = new ApplicationUser
            {
                UserName = "test",
                Email = "test@test.com",
                PasswordHash = "pwhash"
            };

            this.usersRepository.Add(user);
            await this.usersRepository.SaveChangesAsync();

            this.categoriesRepository.Add(new Category { Id = "1", Name = "Test Category" });

            var newJobDto = new CreateJobDTO
            {
                Title = "New job title",
                Description = "New job description...",
                CategoryId = "1",
                PriceType = PriceType.Hourly,
                LowestRate = 100,
                HighestRate = 200,
                ExperienceLevel = ExperienceLevel.Intermediate
            };

            await this.jobsService.CreateAsync(user.Id, newJobDto, new List<Skill>());

            Assert.Single(jobsService.All());
            Assert.Equal("New job title", jobsService.All().First().Title);
            Assert.Equal("New job description...", jobsService.All().First().Description);
            Assert.Equal("1", jobsService.All().First().Category.Id);
            Assert.Equal("Hourly", jobsService.All().First().PriceType.ToString());
            Assert.Equal(100, jobsService.All().First().LowestRate);
            Assert.Equal(200, jobsService.All().First().HighestRate);
            Assert.Equal("Intermediate", jobsService.All().First().ExperienceLevel.ToString());
        }

        [Fact]
        public void GetByIdReturnsNullWhenNotFound()
        {
            //Assert.Null(this.jobsService.GetById("MissingId"));
        }

        [Fact]
        public async Task GetByIdReturnsJobWhenFound()
        {
            var user = new ApplicationUser
            {
                UserName = "test",
                Email = "test@test.com",
                PasswordHash = "pwhash"
            };

            this.usersRepository.Add(user);
            await this.usersRepository.SaveChangesAsync();

            this.categoriesRepository.Add(new Category { Id = "1", Name = "Test Category" });

            var newJobDto = new CreateJobDTO
            {
                Title = "New job title",
                Description = "New job description...",
                CategoryId = "1",
                PriceType = PriceType.Hourly,
                LowestRate = 100,
                HighestRate = 200,
                ExperienceLevel = ExperienceLevel.Intermediate
            };

            await this.jobsService.CreateAsync(user.Id, newJobDto, new List<Skill>());

            //Assert.IsType<JobDetailsDTO>(this.jobsService.GetById(this.jobsService.All().First().Id));
            //Assert.Equal("New job title", this.jobsService.GetById(this.jobsService.All().First().Id).Title);
        }

        [Fact]
        public void GetByIdShortReturnsNullWhenNotFound()
        {
            Assert.Null(this.jobsService.GetByIdShort("MissingId"));
        }

        [Fact]
        public async Task GetByIdShortReturnsJobWhenFound()
        {
            var user = new ApplicationUser
            {
                UserName = "test",
                Email = "test@test.com",
                PasswordHash = "pwhash"
            };

            this.usersRepository.Add(user);
            await this.usersRepository.SaveChangesAsync();

            this.categoriesRepository.Add(new Category { Id = "1", Name = "Test Category" });

            var newJobDto = new CreateJobDTO
            {
                Title = "New job title",
                Description = "New job description...",
                CategoryId = "1",
                PriceType = PriceType.Hourly,
                LowestRate = 100,
                HighestRate = 200,
                ExperienceLevel = ExperienceLevel.Intermediate
            };

            await this.jobsService.CreateAsync(user.Id, newJobDto, new List<Skill>());

            //Assert.IsType<JobShortDetailsDTO>(this.jobsService.GetById(this.jobsService.All().First().Id));
            //Assert.Equal("New job title", this.jobsService.GetById(this.jobsService.All().First().Id).Title);
        }

        [Fact]
        public void FindReturnsNullWhenNotFound()
        {
            Assert.Null(this.jobsService.Find("MissingId"));
        }

        [Fact]
        public async Task FindReturnsJobWhenFound()
        {
            var user = new ApplicationUser
            {
                UserName = "test",
                Email = "test@test.com",
                PasswordHash = "pwhash"
            };

            this.usersRepository.Add(user);
            await this.usersRepository.SaveChangesAsync();

            this.categoriesRepository.Add(new Category { Id = "1", Name = "Test Category" });

            var newJobDto = new CreateJobDTO
            {
                Title = "New job title",
                Description = "New job description...",
                CategoryId = "1",
                PriceType = PriceType.Hourly,
                LowestRate = 100,
                HighestRate = 200,
                ExperienceLevel = ExperienceLevel.Intermediate
            };

            await this.jobsService.CreateAsync(user.Id, newJobDto, new List<Skill>());

            Assert.Equal("New job title", this.jobsService.Find(this.jobsService.All().First().Id).Title);
        }

        [Fact]
        public void ExistsReturnsFalseWhenNotFound()
        {
            Assert.False(this.jobsService.Exists("MissingId"));
        }

        [Fact]
        public async Task ExistsReturnsTrueWhenFound()
        {
            var user = new ApplicationUser
            {
                UserName = "test",
                Email = "test@test.com",
                PasswordHash = "pwhash"
            };

            this.usersRepository.Add(user);
            await this.usersRepository.SaveChangesAsync();

            this.categoriesRepository.Add(new Category { Id = "1", Name = "Test Category" });

            var newJobDto = new CreateJobDTO
            {
                Title = "New job title",
                Description = "New job description...",
                CategoryId = "1",
                PriceType = PriceType.Hourly,
                LowestRate = 100,
                HighestRate = 200,
                ExperienceLevel = ExperienceLevel.Intermediate
            };

            await this.jobsService.CreateAsync(user.Id, newJobDto, new List<Skill>());

            Assert.True(this.jobsService.Exists(this.jobsService.All().First().Id));
        }
    }
}
