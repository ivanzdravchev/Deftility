using Deftility.Areas.Admin.DTOs.Skill;
using Deftility.Services.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Deftility.Areas.Admin.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/admin/[controller]/[action]")]
    public class SkillController : ControllerBase
    {
        private readonly ISkillsService skillsService;

        public SkillController(ISkillsService skillsService)
        {
            this.skillsService = skillsService;
        }

        [HttpPost]
        public async Task<ActionResult<object>> Create(CreateSkillDTO skillDto)
        {
            if (!this.User.IsInRole("Admin"))
            {
                return Unauthorized();
            }

            try
            {
                await this.skillsService.AddAsync(skillDto.Name);

                return Ok(new { message = "Skill created successfully." });
            }
            catch (Exception)
            {
                return BadRequest(new { error = "Something went wrong." });
            }
        }

        [HttpDelete]
        public async Task<ActionResult<object>> Remove(RemoveSkillDTO skillDto)
        {
            if (!this.User.IsInRole("Admin"))
            {
                return Unauthorized();
            }

            try
            {
                var skill = this.skillsService.Find(skillDto.Id);

                if (skill == null)
                {
                    return BadRequest(new { error = $"Skill with ID: '{skill.Id}' does not exist." });
                }

                await this.skillsService.RemoveAsync(skill);

                return Ok(new { message = "Skill removed successfully." });
            }
            catch (Exception)
            {
                return BadRequest(new { error = "Something went wrong." });
            }
        }
    }
}
