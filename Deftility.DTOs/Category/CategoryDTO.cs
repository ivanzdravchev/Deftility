using System.ComponentModel.DataAnnotations;

namespace Deftility.DTOs.Category
{
    public class CategoryDTO
    {
        [Required]
        public string Name { get; set; }
    }
}
