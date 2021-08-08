using System.ComponentModel.DataAnnotations;

namespace Deftility.DTOs.Bid
{
    public class CreateBidDTO
    {
        private const string AmountError = "Bid amount must be a positive number smaller than 1 million.";
        private const string EstimateError = "Estimate is required and must be shorter than 25 characters.";
        private const string MessageError = "Message must be at least 20 characters long.";

        [Required]
        [Range(1, 1000000, ErrorMessage = AmountError)]
        public int Amount { get; set; }

        [Required]
        [StringLength(25, MinimumLength = 1, ErrorMessage = EstimateError)]
        public string Estimate { get; set; }

        [Required]
        [MinLength(20, ErrorMessage = MessageError)]
        public string Message { get; set; }

        [Required]
        public string JobId { get; set; }
    }
}
