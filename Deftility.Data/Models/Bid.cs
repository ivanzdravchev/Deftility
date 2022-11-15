using System;
using System.ComponentModel.DataAnnotations;

namespace Deftility.Data.Models
{
    public class Bid
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public int Amount { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        [Required]
        [StringLength(25)]
        public string Estimate { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public string CreatorId { get; set; }

        public ApplicationUser Creator { get; set; }

        [Required]
        public string JobId { get; set; }

        public Job Job { get; set; }

        public string ApplicantId { get; set; }

        public ApplicationUser Applicant { get; set; }
    }
}
