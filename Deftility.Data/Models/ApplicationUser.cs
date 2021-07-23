using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Deftility.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Job> Jobs { get; } = new HashSet<Job>();
    }
}
