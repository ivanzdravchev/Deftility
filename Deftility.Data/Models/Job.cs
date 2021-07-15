using Deftility.Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Deftility.Data.Models
{
    public class Job
    {
        public string Id { get; set; }

        [Required]
        [StringLength(120, MinimumLength = 10)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public DateTime CreatedOn { get; set; }

        public string CreatorId { get; set; }

        public ApplicationUser Creator { get; set; }

        public string WorkerId { get; set; }

        public ApplicationUser Worker { get; set; }

        public string CategoryId { get; set; }
        
        public Category Category { get; set; }

        [Required]
        public PriceType PriceType { get; set; }

        public int? FixedPrice { get; set; }

        public int? HourlyLowestRate { get; set; }

        public int? HourlyHighestRate { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(20)")]
        public ExperienceLevel ExperienceLevel { get; set; }

        public ICollection<Skill> Skills { get; } = new HashSet<Skill>();
    }
}
