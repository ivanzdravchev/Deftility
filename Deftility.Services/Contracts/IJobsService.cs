using Deftility.Data.Models;
using Deftility.DTOs.Job;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Deftility.Services.Contracts
{
    public interface IJobsService
    {
        IEnumerable<JobListingDTO> All();

        IEnumerable<JobShortDetailsDTO> AllUserJobs(string userId);

        JobShortDetailsDTO GetByIdShort(string jobId);

        JobDetailsDTO GetById(string jobId);

        Task CreateAsync(string userId, CreateJobDTO jobDto, IEnumerable<Skill> selectedSkills);

        Job Find(string jobId);

        bool Exists(string jobId);
    }
}
