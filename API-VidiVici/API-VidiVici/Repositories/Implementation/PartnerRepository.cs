using API_VidiVici.data;
using API_VidiVici.Model;
using Microsoft.EntityFrameworkCore;
namespace API_VidiVici.Repositories.Implementation
{
    public class PartnerRepository
    {
        private readonly VidiviciDbContext _context;
        public PartnerRepository(VidiviciDbContext context)
        {
            _context = context;
        }

        public void Add(Partner item)
        {
            _context.Partners.Add(item);
            _context.SaveChanges();
        }

        public void Edit(Partner item)
        {
            _context.Partners.Update(item);
            _context.SaveChanges();
        }

        public async Task<Partner?> Get(int id)
        {
            return await _context.Partners.SingleAsync(x=> x.Id == id);
        }

        public async Task<IEnumerable<Partner>>? GetAll()
        {
            return await _context.Partners.ToListAsync();
        }

        public void Remove(int id)
        {
            _context.Partners.Remove(_context.Partners.Single(x=>x.Id ==id));
            _context.SaveChanges();
        }
    }
}