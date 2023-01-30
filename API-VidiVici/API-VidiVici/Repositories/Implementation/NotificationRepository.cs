using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.data;
using API_VidiVici.Model;
using Microsoft.EntityFrameworkCore;
namespace API_VidiVici.Repositories.Implementation
{
    public class NotificationRepository:IRepository<Notification>
    {
        private readonly VidiviciDbContext _context;
        public NotificationRepository(VidiviciDbContext context)
        {
            _context = context;
        }

        public void Add(Notification item)
        {
            _context.Notifications?.Add(item);
            _context.SaveChanges();
        }

        public void Edit(Notification item)
        {
            throw new NotImplementedException();
        }

        public Task<Notification?> Get(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Notification>>? GetAll()
        {   
            return await _context.Notifications.ToListAsync();
        }

        public void Remove(int id)
        {
            throw new NotImplementedException();
        }
    }
}