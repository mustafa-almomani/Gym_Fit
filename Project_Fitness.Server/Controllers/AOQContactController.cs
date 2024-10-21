using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AOQContactController : ControllerBase
    {
        private readonly MyDbContext _db;

        public AOQContactController (MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllContacts")]
        public IActionResult GetAllContacts()
        {
            var Con=_db.ContactUs.ToList();
            return Ok(Con);
        }


        [HttpGet("GetByDesc")]
        public IActionResult GetContact() 
        {
            // جلب البيانات وترتيبها
            var contacts = _db.ContactUs
                .OrderByDescending(c => c.CreatedAt)
                .ToList();

            // تعديل تنسيق التاريخ مع التحقق من null
            var formattedContacts = contacts.Select(c => new
            {
                c.Message,
                c.PhoneNumber,
                c.Id,                // عرض الخصائص الأخرى كما هي
                c.Name,              // افتراضًا أن لديك حقل الاسم
                c.Email,             // افتراضًا أن لديك حقل البريد الإلكتروني
                CreatedAt = c.CreatedAt.HasValue
                    ? c.CreatedAt.Value.ToString("yyyy-MM-dd HH:mm")  // تنسيق التاريخ إذا كانت القيمة موجودة
                    : "N/A"  // قيمة افتراضية إذا كانت CreatedAt null
            }).ToList();

            return Ok(formattedContacts);
        }

        [HttpPost("AddContact")]
        public IActionResult AddMessage([FromForm] ContactRequest request)
        {
            var newContact = new ContactU
            {
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                Message = request.Message,
            };
            _db.ContactUs.Add(newContact);
            _db.SaveChanges();
            return Ok(new { message = "Contact added successfully" });
        }


        [HttpDelete("DeleteContact/{id}")]
        public IActionResult DeleteContact(int id)
        {
            if (id <= 0)
            {
                return BadRequest("No Contact For This ID");
            }

            var cintact = _db.ContactUs.FirstOrDefault(u => u.Id == id);
            if (cintact == null)
            {
                return NotFound();
            }
            _db.ContactUs.Remove(cintact);
            _db.SaveChanges();
            return Ok();
        }

    }
}
