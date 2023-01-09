
using API_VidiVici.Model;
using API_VidiVici.Repositories.Implementation;

namespace API_VidiVici.Services
{
    public class InvestmentsServices : IServices<Investment>
    {
        private InvestementsRepository _repository;
        public InvestmentsServices(InvestementsRepository repository)
        {
            _repository = repository;
        }
        public void Add(Investment investment)
        {
            _repository.Add(investment);
        }

        public void Edit(Investment investment)
        {
            _repository.Edit(investment);
        }

        public async Task<Investment>? Get(int id)
        {
           return await _repository.Get(id);
        }

        public async Task<IEnumerable<Investment>>? GetAll()
        {
            return await _repository.GetAll();
        }

        public void Remove(int id)
        {
            _repository.Remove(id);
        }
    }
}