using Deftility.DTOs.Skill;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Deftility.DTOs.Job
{
    public class JobForBiddingDTO
    {
        [Required]
        public string Description { get; set; }

        [Required]
        public int LowestRate { get; set; }

        [Required]
        public int HighestRate { get; set; }

        public ICollection<SkillDTO> Skills { get; set; }
    }
}
