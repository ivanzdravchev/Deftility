﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Deftility.Data.Models
{
    public class Skill
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [Required]
        [StringLength(40)]
        public string Name { get; set; }

        public ICollection<Job> Jobs { get; } = new HashSet<Job>();
    }
}
