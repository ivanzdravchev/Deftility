using System.ComponentModel.DataAnnotations;

namespace Deftility.Areas.Admin.DTOs.Category
{
    public class RemoveCategoryDTO
    {
        [Required]
        public string Id { get; set; }
    }
}
