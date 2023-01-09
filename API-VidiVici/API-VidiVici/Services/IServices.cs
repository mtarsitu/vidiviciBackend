using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Services
{
    public interface IServices<T>
	{
        void Add(T item);
        void Edit(T item);
        void Remove(int id);
        Task<T?> Get(int id);
        Task<IEnumerable<T>>? GetAll();
    }
}