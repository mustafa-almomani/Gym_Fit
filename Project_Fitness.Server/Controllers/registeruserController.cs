using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;


namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class registeruserController : ControllerBase
    {
        private readonly MyDbContext _Db;
        private readonly EmailServiceR _emailServiceR;

        public registeruserController(MyDbContext db, EmailServiceR emailServiceR) 
        {
            _Db = db;
            _emailServiceR = emailServiceR;
        }

       

     
      

        [HttpPost("register")]
        public IActionResult regester([FromForm] registerDTO dto)
        {
            if (dto.UserPassword != dto.confirmPassword)
            {
                return BadRequest("Passwords do not match");
            }
            var existingUser = _Db.Users.FirstOrDefault(u => u.UserEmail == dto.UserEmail);
            if (existingUser != null)
            {
                return BadRequest("Email already exists");
            }
            //byte[] passwordHash;
            //byte[] passwordSalt;
            passwordHasherMethod.CreatePasswordHash(dto.UserPassword, out string passwordHash, out string passwordSalt);

            var newuser = new User
            {
                UserName = dto.UserName,
                UserEmail = dto.UserEmail,
                UserPassword=dto.UserPassword,
                CreatedAt = DateTime.Now,
                HashPassword = passwordHash,
                SaltPassword = passwordSalt

            };
            _Db.Users.Add(newuser);
            _Db.SaveChanges();

            return Ok();
        }

        [HttpPost("LOGIN")]
        public IActionResult login([FromForm] loginuserDTO dto)
        {
            var user = _Db.Users.FirstOrDefault(x => x.UserEmail == dto.UserEmail);

            if (user == null)
            {
                return BadRequest();
            }

            if (user == null || !passwordHasherMethod.VerifyPassword(dto.UserPassword, user.HashPassword, user.SaltPassword))
            {
                return Unauthorized("Invalid username or password.");
            }

            // إعادة البيانات مع is_admin
            return Ok(new { user.UserEmail, user.IsAdmin ,user.UserId });
        }




        ////////////////////////////////////////////////////////////////////////////////////////////

        [HttpPost("send-reminder-emails")]
        public async Task<IActionResult> SendReminderEmailsAsync()
        {
            var currentDate = DateTime.Today;  // الحصول على التاريخ الحالي فقط
            var reminderDate = currentDate.AddDays(5);  // إضافة 5 أيام للحصول على التاريخ المطلوب

            // التحقق من SubscriptionEndDate مباشرة إذا كان من نوع DateOnly
            var subscriptions = await _Db.Subscriptions
                .Include(sub => sub.User)
                .Where(sub => sub.SubscriptionEndDate <= DateOnly.FromDateTime(reminderDate))
                .ToListAsync();

            if (!subscriptions.Any())
            {
                return Ok("No subscriptions ending in 5 days.");
            }

            foreach (var subscription in subscriptions)
            {
                if (subscription.User != null && !string.IsNullOrWhiteSpace(subscription.User.UserEmail))
                {
                    string subject = "Subscription Reminder";
                    string formattedDate = subscription.SubscriptionEndDate.ToString("yyyy-MM-dd");  // تحويل التاريخ إلى نص
                    string body = $"<p>Dear Customer Your subscription will end on {formattedDate}. Please Renew your subscription.</p>";

                    await _emailServiceR.SendEmailRAsync(subscription.User.UserEmail, subject, body);
                }
            }

            return Ok("Reminder emails sent successfully.");
        }





    }
}
