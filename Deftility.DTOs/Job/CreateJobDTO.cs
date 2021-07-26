using Deftility.Data.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Deftility.DTOs.Job
{
    public class CreateJobDTO
    {
        private const string TitleError = "Title must be between 10 and 120 characters long.";
        private const string DescriptionError = "Description must be at least 20 characters long.";
        private const string LowestRateError = "Lowest rate must be a positive number smaller than 1 million.";
        private const string HighestRateError = "Highest rate must be a positive number smaller than 1 million.";

        [Required]
        [StringLength(120, MinimumLength = 10, ErrorMessage = TitleError)]
        public string Title { get; set; }

        [Required]
        [MinLength(20, ErrorMessage = DescriptionError)]
        public string Description { get; set; }

        [Required]
        public string CategoryId { get; set; }

        [Required]
        public PriceType PriceType { get; set; }

        [Required]
        [Range(1, 1000000, ErrorMessage = LowestRateError)]
        public int LowestRate { get; set; }

        [Required]
        [Range(1, 1000000, ErrorMessage = HighestRateError)]
        public int HighestRate { get; set; }

        [Required]
        public ExperienceLevel ExperienceLevel { get; set; }

        public ICollection<string> Skills { get; set; }
    }
}
