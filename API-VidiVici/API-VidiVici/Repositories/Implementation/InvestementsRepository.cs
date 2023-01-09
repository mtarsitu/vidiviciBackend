using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.data;
using API_VidiVici.Model;
using Microsoft.EntityFrameworkCore;

namespace API_VidiVici.Repositories.Implementation
{
    public class InvestementsRepository : IRepository<Investment>
    {
        private VidiviciContext _context;
        public InvestementsRepository(VidiviciContext context)
        {
            _context = context;
        }
        public void Add(Investment item)
        {
            _context.Investments?.Add(item);
            _context.SaveChanges();
        }

        public void Edit(Investment item)
        {
            _context.Investments?.Update(item);
            _context.SaveChanges();
        }

        public async Task<Investment?> Get(int id)
        {
            return await _context.Investments.Where( x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Investment>> GetAll()
        {
            return await _context.Investments.ToListAsync();
        }

        public void Remove(int id)
        {
            _context.Investments.Remove(_context.Investments.Single(x=> x.Id==id));
            _context.SaveChanges();
        }
    }
}