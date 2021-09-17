using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Core.NotificationService;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            this._notificationService = notificationService;
        }

     

        [Route("GetNotificationCount")]
        [HttpGet]
        public async Task<ActionResult> GetNotificationCount()
        {
            var count = await _notificationService.GetNotificationResultCount();
            return Ok(count);
        }

        [Route("GetNotificationMessage")]
        [HttpGet]
        public async Task<ActionResult> GetNotificationMessage()
        {
            var notfications = await _notificationService.GetNotificationsResult();
            return Ok(notfications);
        }


    }
}
