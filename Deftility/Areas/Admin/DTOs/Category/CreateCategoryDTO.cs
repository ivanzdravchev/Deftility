using System.ComponentModel.DataAnnotations;

namespace Deftility.Areas.Admin.DTOs.Category
{
    public class CreateCategoryDTO
    {
        [Required]
        public string Name { get; set; }
    }
}
