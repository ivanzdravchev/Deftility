using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Deftility.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        [InverseProperty("Creator")]
        public ICollection<Job> JobsCreated { get; } = new HashSet<Job>();

        [InverseProperty("Worker")]
        public ICollection<Job> JobsTaken { get; } = new HashSet<Job>();
    }
}
