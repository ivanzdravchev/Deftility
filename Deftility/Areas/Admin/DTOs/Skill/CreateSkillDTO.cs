using System.ComponentModel.DataAnnotations;

namespace Deftility.Areas.Admin.DTOs.Skill
{
    public class CreateSkillDTO
    {
        [Required]
        public string Name { get; set; }
    }
}
