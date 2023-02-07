
using API_VidiVici.Model;
using API_VidiVici.Repositories.Implementation;
using API_VidiVici.DTOs;
using API_VidiVici.Modifiers;
namespace API_VidiVici.Services

{
    public class InvestmentsServices 
    {
        private InvestementsRepository _repository;
        public InvestmentsServices(InvestementsRepository repository)
        {
            _repository = repository;
        }
        public void Add(NewInvestmentDto investment)
        {
            _repository.Add(InvestmentModifier.NewToInvestment(investment));
        }

        public void Edit(Investment investment)
        {
            _repository.Edit(investment);
        }

        public async Task<Investment>? Get(int id)
        {
           return await _repository.Get(id);
        }

        public async Task<IEnumerable<InvestmentDto>>? GetAll()
        {
            return await _repository.GetAll();
        }

        public void Remove(int id)
        {
            _repository.Remove(id);
        }
        public async Task<IEnumerable<Investment>> GetUserInvestment(string id)
        {
            return await _repository.GetUserInvestment(id);
        }

        public Task<Double> GetTotalSum()
        {
            return _repository.GetTotalSum();
        }

        public async Task<IEnumerable<InvestmentDto>> GetPending()
        {
            return await _repository.GetPending();
        }
    }
}