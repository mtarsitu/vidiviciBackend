using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;
using API_VidiVici.Repositories.Implementation;
namespace API_VidiVici.Services
{
    public class PrincipalInvestmentServices : IServices<PrincipalInvestment>
    {
        private readonly PrincipalInvestmentsRepository _repository;

        public PrincipalInvestmentServices(PrincipalInvestmentsRepository repository)
        {
            _repository = repository;
        }
        public void Add(PrincipalInvestment item)
        {
            _repository.Add(item);
        }

        public void Edit(PrincipalInvestment item)
        {
            _repository.Edit(item);
        }

        public async Task<PrincipalInvestment?> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<IEnumerable<PrincipalInvestment>>? GetAll()
        {
            return await _repository.GetAll();
        }

        public void Remove(int id)
        {
            _repository.Remove(id);
        }
    }
}