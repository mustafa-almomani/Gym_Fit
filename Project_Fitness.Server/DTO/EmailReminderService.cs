﻿using Project_Fitness.Server.Controllers;
namespace Project_Fitness.Server.DTO
{
    public class EmailReminderService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public EmailReminderService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var classesController = scope.ServiceProvider.GetRequiredService<registeruserController>();

                    await classesController.SendReminderEmailsAsync();
                }

                //// Wait for 1 minute before the next execution
                //await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);

                // Wait for 24 hours (1 day) before the next execution
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
        }
    }
}
