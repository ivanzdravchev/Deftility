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
    }
}
