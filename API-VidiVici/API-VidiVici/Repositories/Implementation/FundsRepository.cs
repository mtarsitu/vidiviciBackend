using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.data;
using API_VidiVici.Model;
using Microsoft.EntityFrameworkCore;
namespace API_VidiVici.Repositories.Implementation
{
    public class FundsRepository : IRepository<Fund>
    {
        private readonly VidiviciDbContext _context;
        public FundsRepository(VidiviciDbContext context)
        {
            _context = context;
        }
        public void Add(Fund item)
        {
            _context.Funds.Add(item);  
            _context.SaveChanges();
        }

        public void Edit(Fund item)
        {
            _context.Funds.Update(item);
            _context.SaveChanges();
        }

        public async Task<Fund?> Get(int id)
        {
            return await _context.Funds.Where(x=>x.Id ==id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Fund>>? GetAllPublic(){
            return await _context.Funds.Where(f=> f.Private != true).ToListAsync();
        }

        public async Task<IEnumerable<Fund>>? GetAll()
        {
            return await _context.Funds.ToListAsync();
        }

        public void Remove(int id)
        {
            _context.Funds.Remove(_context.Funds.Single(x=>x.Id ==id));
            _context.SaveChanges();
        }

        
    }
}