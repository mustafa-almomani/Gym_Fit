using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public ContactUsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/ContactUs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactU>>> GetContactUs()
        {
            return await _context.ContactUs.ToListAsync();
        }

        // GET: api/ContactUs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactU>> GetContactU(int id)
        {
            var contactU = await _context.ContactUs.FindAsync(id);

            if (contactU == null)
            {
                return NotFound();
            }

            return contactU;
        }

        // PUT: api/ContactUs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContactU(int id, ContactU contactU)
        {
            if (id != contactU.Id)
            {
                return BadRequest();
            }

            _context.Entry(contactU).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactUExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ContactUs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ContactU>> PostContactU(ContactU contactU)
        {
            _context.ContactUs.Add(contactU);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContactU", new { id = contactU.Id }, contactU);
        }

        // DELETE: api/ContactUs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContactU(int id)
        {
            var contactU = await _context.ContactUs.FindAsync(id);
            if (contactU == null)
            {
                return NotFound();
            }

            _context.ContactUs.Remove(contactU);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactUExists(int id)
        {
            return _context.ContactUs.Any(e => e.Id == id);
        }



        [HttpGet("TopSales")]
        public IActionResult TopSales()
        {
            var topProductsByPrice = _context.Products
                .OrderByDescending(p => p.Price) // ترتيب المنتجات بناءً على السعر
                .Take(4) // أخذ أعلى 3 منتجات
                .Select(p => new
                {
                    ProductId = p.Id,
                    productname = p.ProductName,
                    price = p.Price,
                    description = p.Description,
                    stockQuantity = p.StockQuantity,
                    image = p.Image,
                    discount = p.Discount,
                    Category = p.Category != null ? p.Category.CategoryName : "No Category"
                })
                .ToList();

            return Ok(topProductsByPrice);
        }

    }
}
