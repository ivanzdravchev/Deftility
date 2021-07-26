using System.ComponentModel.DataAnnotations;

namespace Deftility.DTOs.Category
{
    public class CategoryDTO
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
