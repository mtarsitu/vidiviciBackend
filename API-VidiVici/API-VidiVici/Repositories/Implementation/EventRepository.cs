using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.data;
using API_VidiVici.Model;
using Microsoft.EntityFrameworkCore;

namespace API_VidiVici.Repositories.Implementation
{
    public class EventRepository
    {
        private VidiviciDbContext _context;

        public EventRepository(VidiviciDbContext context)
        {
            _context = context;
        }

        public void Add(Event newEvent)
        {
            _context.Events.Add(newEvent);
            _context.SaveChanges();
        }

        public async Task<IEnumerable<Event>> GetAll()
        {
            return await _context.Events.ToListAsync();
        }

        
    }
}