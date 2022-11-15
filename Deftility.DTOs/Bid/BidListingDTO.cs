using System;
using System.ComponentModel.DataAnnotations;

namespace Deftility.DTOs.Bid
{
    public class BidListingDTO
    {
        public string Id { get; set; }

        [Required]
        public int Amount { get; set; }

        public DateTime CreatedOn { get; set; }

        [Required]
        public string Estimate { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public BidListingCreatorDTO Creator { get; set; }

        public string ApplicantId { get; set; }
    }
}
