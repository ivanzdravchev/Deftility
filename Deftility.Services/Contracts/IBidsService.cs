using Deftility.DTOs.Bid;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Deftility.Services.Contracts
{
    public interface IBidsService
    {
        IEnumerable<BidListingDTO> AllJobBids(string jobId);

        Task CreateAsync(string userId, CreateBidDTO bidDto);

        bool IsDuplicate(string userId, string jobId);
    }
}
