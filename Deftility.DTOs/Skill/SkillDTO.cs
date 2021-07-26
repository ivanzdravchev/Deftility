using System.ComponentModel.DataAnnotations;

namespace Deftility.DTOs.Skill
{
    public class SkillDTO
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
