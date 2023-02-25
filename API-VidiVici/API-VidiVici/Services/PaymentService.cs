using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;
using API_VidiVici.Repositories.Implementation;

namespace API_VidiVici.Services
{
    public class PaymentService:IServices<Payment>
    {
        private PaymentRepository _repository;
        public PaymentService(PaymentRepository repository)
        {
            _repository = repository;
        }

        public void Add(Payment item)
        {
            _repository.Add(item);
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