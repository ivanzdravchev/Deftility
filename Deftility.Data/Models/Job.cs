using Deftility.Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Deftility.Data.Models
{
    public class Job
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [StringLength(120, MinimumLength = 10)]
        public string Title { get; set; }

        [Required]
        [MinLength(20)]
        public string Description { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        [Required]
        public string CreatorId { get; set; }

        public ApplicationUser Creator { get; set; }

        [Required]
        public string CategoryId { get; set; }
        
        public Category Category { get; set; }

        [Required]
        public PriceType PriceType { get; set; }

        public int LowestRate { get; set; }

        public int HighestRate { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(20)")]
        public ExperienceLevel ExperienceLevel { get; set; }

        public ICollection<Skill> Skills { get; set; } = new HashSet<Skill>();

        public ICollection<Bid> Bids { get; set; } = new HashSet<Bid>();
    }
}
