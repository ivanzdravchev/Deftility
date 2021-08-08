using Deftility.Data.Models;
using Deftility.DTOs.Bid;
using Deftility.Services.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class BidController : ControllerBase
    {
        private readonly IBidsService bidsService;
        private readonly IJobsService jobsService;
        private readonly UserManager<ApplicationUser> userManager;

        public BidController(
            IBidsService bidsService,
            IJobsService jobsService,
            UserManager<ApplicationUser> userManager)
        {
            this.bidsService = bidsService;
            this.jobsService = jobsService;
            this.userManager = userManager;
        }

        [HttpGet("{jobId}")]
        public ActionResult<IEnumerable<BidListingDTO>> AllJobBids(string jobId)
        {
            return this.bidsService.AllJobBids(jobId).ToList();
        }

        [HttpPost]
        public async Task<ActionResult<object>> Create(CreateBidDTO bidDto)
        {
            try
            {
                var user = await this.userManager.FindByNameAsync(this.User.Identity.Name);

                if (user == null)
                {
                    return NotFound(new { error = "Invalid user." });
                }

                var job = this.jobsService.Find(bidDto.JobId);

                if (job == null)
                {
                    return NotFound(new { error = $"Job with ID: '{bidDto.JobId}' does not exist." });
                }

                if (job.CreatorId == user.Id)
                {
                    return BadRequest(new { error = $"You cannot place bids on your own jobs." });
                }

                await this.bidsService.CreateAsync(user.Id, bidDto);

                return Ok(new { message = "Bid created successfully." });
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "Something went wrong." });
            }
        }
    }
}
