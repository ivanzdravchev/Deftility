using Deftility.DTOs.Skill;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Deftility.DTOs.Job
{
    public class JobShortDetailsDTO
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int LowestRate { get; set; }

        [Required]
        public int HighestRate { get; set; }

        public ICollection<SkillDTO> Skills { get; set; }
    }
}
