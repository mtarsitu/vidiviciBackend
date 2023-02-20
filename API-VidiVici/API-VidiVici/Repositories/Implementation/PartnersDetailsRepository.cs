using API_VidiVici.data;
using API_VidiVici.Model;
using Microsoft.EntityFrameworkCore;
namespace API_VidiVici.Repositories.Implementation
{
    public class PartnersDetailsRepository : IRepository<PartnersDetails>
    {

        private readonly VidiviciDbContext _context;
        public PartnersDetailsRepository(VidiviciDbContext context)
        {
            _context = context;
        }
        public void Add(PartnersDetails item)
        {
            _context.PartnersDetails.Add(item);
            _context.SaveChanges();
        }

        public void Edit(PartnersDetails item)
        {
            _context.PartnersDetails.Update(item);
            _context.SaveChanges();
        }

        public async Task<PartnersDetails?> Get(int id)
        {
           return await _context.PartnersDetails.SingleAsync(x=>x.Id ==id);
        }

        public async Task<IEnumerable<PartnersDetails>>? GetAll()
        {
            return await _context.PartnersDetails.Include(x=>x.Partner).ToListAsync();
        }

        public void Remove(int id)
        {
            _context.PartnersDetails.Remove(_context.PartnersDetails.Single(x=>x.Id == id));
            _context.SaveChanges();
        }
    }
}