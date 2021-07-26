using Deftility.Data.Models;
using Deftility.DTOs.Skill;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Deftility.Services.Contracts
{
    public interface ISkillsService
    {
        IEnumerable<SkillDTO> All();

        Task AddAsync(string skillName);

        Task AddRangeAsync(IEnumerable<string> skills);

        Task RemoveAsync(Skill category);

        Skill Find(string skillId);

        bool Exists(string skillId);
    }
}
