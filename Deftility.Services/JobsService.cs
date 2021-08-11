using Deftility.Data.Models;
using Deftility.Data.Repository;
using Deftility.DTOs.Category;
using Deftility.DTOs.Job;
using Deftility.DTOs.Skill;
using Deftility.Services.Contracts;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deftility.Services
{
    public class JobsService : IJobsService
    {
        private readonly IRepository<Job> jobsRepository;

        public JobsService(IRepository<Job> jobsRepository)
        {
            this.jobsRepository = jobsRepository;
        }

        public IEnumerable<JobListingDTO> All()
        {
            return this.jobsRepository
                .AllAsNoTracking()
                .Select(j => new JobListingDTO
                {
                    Id = j.Id,
                    Title = j.Title,
                    Description = j.Description,
                    CreatedOn = j.CreatedOn,
                    Category = new CategoryDTO
                    {
                        Id = j.CategoryId,
                        Name = j.Category.Name
                    },
                    PriceType = j.PriceType.ToString(),
                    LowestRate = j.LowestRate,
                    HighestRate = j.HighestRate,
                    ExperienceLevel = j.ExperienceLevel.ToString(),
                    Skills = j.Skills.Select(s => new SkillDTO
                    {
                        Id = s.Id,
                        Name = s.Name
                    }).ToList()
                })
                .AsEnumerable();
        }

        public IEnumerable<JobShortDetailsDTO> AllUserJobs(string userId)
        {
            return this.jobsRepository
                .AllAsNoTracking()
                .Where(j => j.CreatorId == userId)
                .Select(j => new JobShortDetailsDTO
                {
                    Id = j.Id,
                    Title = j.Title,
                    Description = j.Description,
                    LowestRate = j.LowestRate,
                    HighestRate = j.HighestRate,
                    Skills = j.Skills.Select(s => new SkillDTO
                    {
                        Id = s.Id,
                        Name = s.Name
                    }).ToList()
                })
                .AsEnumerable();
        }

        public JobDetailsDTO GetById(string jobId)
        {
            return this.jobsRepository
                .AllAsNoTracking()
                .Where(j => j.Id == jobId)
                .Select(j => new JobDetailsDTO
                {
                    Title = j.Title,
                    Description = j.Description,
                    CreatedOn = j.CreatedOn,
                    Category = j.Category.Name,
                    PriceType = j.PriceType.ToString(),
                    LowestRate = j.LowestRate,
                    HighestRate = j.HighestRate,
                    ExperienceLevel = j.ExperienceLevel.ToString(),
                    ClientJobsCount = j.Creator.Jobs.Count,
                    ClientRegisterDate = j.Creator.RegisteredOn,
                    Applicants = j.Bids.Count,
                    Skills = j.Skills.Select(s => new SkillDTO
                    {
                        Id = s.Id,
                        Name = s.Name
                    }).ToList()
                })
                .FirstOrDefault();
        }

        public JobShortDetailsDTO GetByIdShort(string jobId)
        {
            return this.jobsRepository
                .AllAsNoTracking()
                .Where(j => j.Id == jobId)
                .Select(j => new JobShortDetailsDTO
                {
                    Id = j.Id,
                    Title = j.Title,
                    Description = j.Description,
                    LowestRate = j.LowestRate,
                    HighestRate = j.HighestRate,
                    Skills = j.Skills.Select(s => new SkillDTO
                    {
                        Id = s.Id,
                        Name = s.Name
                    }).ToList()
                })
                .FirstOrDefault();
        }

        public async Task CreateAsync(string userId, CreateJobDTO jobDto, IEnumerable<Skill> selectedSkills)
        {
            var job = new Job
            {
                Title = jobDto.Title,
                Description = jobDto.Description,
                CreatorId = userId,
                CategoryId = jobDto.CategoryId,
                PriceType = jobDto.PriceType,
                LowestRate = jobDto.LowestRate,
                HighestRate = jobDto.HighestRate,
                ExperienceLevel = jobDto.ExperienceLevel,
                Skills = selectedSkills.ToList()
            };

            this.jobsRepository.Add(job);

            await this.jobsRepository.SaveChangesAsync();
        }

        public Job Find(string jobId)
        {
            return this.jobsRepository
                .All()
                .SingleOrDefault(j => j.Id == jobId);
        }

        public bool Exists(string jobId)
        {
            return this.jobsRepository
                .AllAsNoTracking()
                .Any(j => j.Id == jobId);
        }
    }
}
