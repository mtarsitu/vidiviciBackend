using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Event
    {
        public int Id {get;set;}

        public string? Title {get;set;}
        public DateTime Date {get;set;}
        public DateTime Start {get;set;}
        public DateTime End {get;set;}
    }
}