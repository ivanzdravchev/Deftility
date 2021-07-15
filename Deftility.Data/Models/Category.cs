using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Deftility.Data.Models
{
    public class Category
    {
        public string Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        public ICollection<Job> Jobs { get; } = new HashSet<Job>();
    }
}
