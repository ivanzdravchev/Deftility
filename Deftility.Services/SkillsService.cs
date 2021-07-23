using Deftility.Data.Models;
using Deftility.Data.Repository;
using Deftility.DTOs.Skill;
using Deftility.Services.Contracts;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deftility.Services
{
    public class SkillsService : ISkillsService
    {
        private readonly IRepository<Skill> skillsRepository;

        public SkillsService(IRepository<Skill> skillsRepository)
        {
            this.skillsRepository = skillsRepository;
        }

        public IEnumerable<SkillDTO> All()
        {
            return this.skillsRepository
                .All()
                .Select(c => new SkillDTO
                {
                    Name = c.Name
                })
                .OrderBy(c => c.Name)
                .AsEnumerable();
        }

        public async Task AddAsync(string skillName)
        {
            var skill = new Skill
            {
                Name = skillName
            };

            this.skillsRepository.Add(skill);

            await this.skillsRepository.SaveChangesAsync();
        }

        public async Task AddRangeAsync(IEnumerable<string> skills)
        {
            var newSkills = skills.Select(skillName => new Skill
            {
                Name = skillName
            });

            this.skillsRepository.AddRange(newSkills);

            await this.skillsRepository.SaveChangesAsync();
        }
    }
}
