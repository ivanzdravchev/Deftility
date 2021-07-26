using System.ComponentModel.DataAnnotations;

namespace Deftility.Areas.Admin.DTOs.Skill
{
    public class RemoveSkillDTO
    {
        [Required]
        public string Id { get; set; }
    }
}
