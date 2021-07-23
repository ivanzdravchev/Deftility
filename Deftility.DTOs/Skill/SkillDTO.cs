using System.ComponentModel.DataAnnotations;

namespace Deftility.DTOs.Skill
{
    public class SkillDTO
    {
        [Required]
        public string Name { get; set; }
    }
}
