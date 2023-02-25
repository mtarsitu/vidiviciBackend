using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.data;
using API_VidiVici.Model;

namespace API_VidiVici.Repositories.Implementation
{
    public class PaymentRepository : IRepository<Payment>
    {
        private VidiviciDbContext _context;
        public PaymentRepository(VidiviciDbContext context)
        {
            _context = context;
        }
        public void Add(Payment item)
        {
            _context.Add(item);
        }

        public void Edit(Payment item)
        {
            throw new NotImplementedException();
        }

        public Task<Payment?> Get(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Payment>>? GetAll()
        {
            throw new NotImplementedException();
        }

        public void Remove(int id)
        {
            throw new NotImplementedException();
        }
    }
}