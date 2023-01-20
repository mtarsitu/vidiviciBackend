using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Calendar
    {
        public int Id {get;set;}

        public DateTime EventStart {get;set;}

        public DateTime EventEnd {get;set;}
        public string? Event {get;set;}
    }
}