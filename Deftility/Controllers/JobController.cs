using Deftility.Data.Models;
using Deftility.DTOs.Job;
using Deftility.Services.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deftility.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]/[action]")]
    public class JobController : ControllerBase
    {
        private readonly IJobsService jobsService;
        private readonly ICategoriesService categoriesService;
        private readonly ISkillsService skillsService;
        private readonly UserManager<ApplicationUser> userManager;

        public JobController(
            IJobsService jobsService,
            ICategoriesService categoriesService,
            ISkillsService skillsService,
            UserManager<ApplicationUser> userManager)
        {
            this.jobsService = jobsService;
            this.categoriesService = categoriesService;
            this.skillsService = skillsService;
            this.userManager = userManager;
        }

        [AllowAnonymous]
        public ActionResult<IEnumerable<JobListingDTO>> All()
        {
            return this.jobsService.All().ToList();
        }

        [HttpGet("{jobId}")]
        [AllowAnonymous]
        public ActionResult<JobListingDTO> Get(string jobId)
        {
            var job = this.jobsService.GetById(jobId);

            if (job == null)
            {
                return BadRequest(new { error = "Job does not exist." });
            }

            return job;
        }

        [HttpPost]
        public async Task<ActionResult<object>> Create(CreateJobDTO jobDto)
        {
            // in case enum properties are missing from dto
            if (jobDto.PriceType == 0 || jobDto.ExperienceLevel == 0)
            {
                return BadRequest(new { error = "Price type and Experience level are required." });
            }

            if (!this.categoriesService.Exists(jobDto.CategoryId))
            {
                return BadRequest(new { error = "Category does not exist." });
            }

            var selectedSkills = new List<Skill>();

            foreach (var skill in jobDto.Skills)
            {
                var dbSkill = this.skillsService.Find(skill);

                if (dbSkill == null)
                {
                    return BadRequest(new { error = $"Skill with ID: '{skill}' does not exist." });
                }

                selectedSkills.Add(dbSkill);
            }

            try
            {
                var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);

                if (user == null)
                {
                    return BadRequest(new { error = "Invalid user." });
                }

                await this.jobsService.CreateAsync(user.Id, jobDto, selectedSkills);

                return Ok(new { message = "Job created successfully." });
            }
            catch (Exception)
            {
                return BadRequest(new { error = "Something went wrong." });
            }
        }
    }
}
