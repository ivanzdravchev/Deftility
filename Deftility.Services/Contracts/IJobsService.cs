using Deftility.Data.Models;
using Deftility.DTOs.Job;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Deftility.Services.Contracts
{
    public interface IJobsService
    {
        IEnumerable<JobListingDTO> All();

        JobDetailsDTO GetById(string id);

        Task CreateAsync(string userId, CreateJobDTO jobDto, IEnumerable<Skill> selectedSkills);
    }
}
