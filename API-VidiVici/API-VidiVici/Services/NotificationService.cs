using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_VidiVici.Model;
using API_VidiVici.Repositories.Implementation;

namespace API_VidiVici.Services
{
    public class NotificationService
    {
        private readonly NotificationRepository _repository;
        public NotificationService(NotificationRepository repository)
        {
            _repository = repository;
        }

        public void Add(Notification notification)
        {
            _repository.Add(notification);
        }

        public async Task<IEnumerable<Notification>> GetAll()
        {
            return await _repository.GetAll();
        }
    }
}