using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Deftility.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime RegisteredOn { get; set; } = DateTime.UtcNow;

        public ICollection<Job> Jobs { get; } = new HashSet<Job>();
    }
}
