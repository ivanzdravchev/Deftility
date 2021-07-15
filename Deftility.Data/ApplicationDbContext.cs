using Deftility.Data.Models;
using Deftility.Data.Models.Enums;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Deftility.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Job> Jobs { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Skill> Skills { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Need to call base for Identity table keys since they are mapped here, otherwise we get error
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Job>()
                .Property(j => j.PriceType)
                .HasConversion(new EnumToStringConverter<PriceType>());

            modelBuilder.Entity<Job>()
                .Property(j => j.ExperienceLevel)
                .HasConversion(new EnumToStringConverter<ExperienceLevel>());
        }
    }
}
