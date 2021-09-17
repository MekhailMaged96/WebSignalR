using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Data;
using WebAPI.DTO;
using WebAPI.Models;

namespace WebAPI.Core.NotificationService
{
    public class NotificationService : INotificationService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public NotificationService(DataContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }
        public async Task<NotificationCountResultDTO> GetNotificationResultCount()
        {
            var count = await _context.Notifications.CountAsync();
            NotificationCountResultDTO result = new NotificationCountResultDTO
            {
                Count =  count
            };
            return result;
        }

        public async Task<IEnumerable<NotificationDTO>> GetNotificationsResult()
        {

            var notfi = await _context.Notifications.OrderByDescending(e => e.Id).ToListAsync();

            var notfications = _mapper.Map<IEnumerable<NotificationDTO>>(notfi);

            return notfications;
        }
    }
}
