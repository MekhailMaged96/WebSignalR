using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.DTO;
using WebAPI.Models;

namespace WebAPI.Core.NotificationService
{
    public interface INotificationService
    {
        public Task<IEnumerable<NotificationDTO>> GetNotificationsResult();

        public Task<NotificationCountResultDTO> GetNotificationResultCount();


    }
}
