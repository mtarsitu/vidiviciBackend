using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_VidiVici.Model
{
    public class Notification:BaseEntity
    {

        public DateTime Date {get;set;} = DateTime.UtcNow;

        public string? NotificationType {get;set;}        
        public string? Message{get;set;}

    }
}