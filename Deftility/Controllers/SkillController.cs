using Deftility.DTOs.Skill;
using Deftility.Services.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Deftility.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]/[action]")]
    public class SkillController : ControllerBase
    {
        private readonly ISkillsService skillsService;

        public SkillController(ISkillsService skillsService)
        {
            this.skillsService = skillsService;
        }

        [AllowAnonymous]
        public ActionResult<IEnumerable<SkillDTO>> All()
        {
            return this.skillsService.All().ToList();
        }
    }
}
