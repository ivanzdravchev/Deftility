using Deftility.DTOs.Skill;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Deftility.DTOs.Job
{
    public class JobDetailsDTO
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        public string PriceType { get; set; }

        [Required]
        public int LowestRate { get; set; }

        [Required]
        public int HighestRate { get; set; }

        [Required]
        public string ExperienceLevel { get; set; }

        [Required]
        public int ClientJobsCount { get; set; }

        [Required]
        public DateTime ClientRegisterDate { get; set; }

        [Required]
        public int Applicants { get; set; }

        public ICollection<SkillDTO> Skills { get; set; }
    }
}
