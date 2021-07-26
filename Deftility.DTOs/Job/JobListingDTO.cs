using Deftility.DTOs.Category;
using Deftility.DTOs.Skill;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Deftility.DTOs.Job
{
    public class JobListingDTO
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; }

        [Required]
        public CategoryDTO Category { get; set; }

        [Required]
        public string PriceType { get; set; }

        [Required]
        public int LowestRate { get; set; }

        [Required]
        public int HighestRate { get; set; }

        [Required]
        public string ExperienceLevel { get; set; }

        public ICollection<SkillDTO> Skills { get; set; }
    }
}
