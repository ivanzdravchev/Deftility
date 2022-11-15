using Deftility.Data.Models;
using Deftility.Data.Repository;
using Deftility.DTOs.Bid;
using Deftility.Services.Contracts;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Deftility.Services
{
    public class BidsService : IBidsService
    {
        private readonly IRepository<Bid> bidsRepository;

        public BidsService(IRepository<Bid> bidsRepository)
        {
            this.bidsRepository = bidsRepository;
        }

        public IEnumerable<BidListingDTO> AllJobBids(string jobId)
        {
            return this.bidsRepository
                .AllAsNoTracking()
                .Where(b => b.JobId == jobId)
                .Select(b => new BidListingDTO
                {
                    Id = b.Id,
                    Amount = b.Amount,
                    CreatedOn = b.CreatedOn,
                    Estimate = b.Estimate,
                    Message = b.Message,
                    Creator = new BidListingCreatorDTO
                    {
                        Id = b.CreatorId,
                        Username = b.Creator.UserName
                    },
                    ApplicantId = b.ApplicantId
                })
                .AsEnumerable();
        }

        public async Task CreateAsync(string userId, CreateBidDTO bidDto)
        {
            var bid = new Bid
            {
                Amount = bidDto.Amount,
                Estimate = bidDto.Estimate,
                Message = bidDto.Message,
                CreatorId = userId,
                JobId = bidDto.JobId
            };

            this.bidsRepository.Add(bid);

            await this.bidsRepository.SaveChangesAsync();
        }

        public bool IsDuplicate(string userId, string jobId)
        {
            return this.bidsRepository
                .AllAsNoTracking()
                .Where(b => b.CreatorId == userId && b.JobId == jobId)
                .Any();
        }
    }
}
