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
    public class OrdersController : ControllerBase
    {
        private readonly MyDbContext _context;

        public OrdersController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult> GetOrders()
        {
            var orders = await _context.Orders
                
                .Select(x => new {
                    id=x.Id,
                    customerName = x.User.UserName,
                    totalAmount = x.TotalAmount,
                    status= x.Status,
                    quantity = x.OrderItems.Count()
                }).ToListAsync();

            return Ok(orders);
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetOrder(int id)
        {
            var order = await _context.OrderItems
                .Where(x => x.OrderId == id)
                .Select(x => new {
                    user = x.Order.User.UserName,
                    productname = x.Product.ProductName,
                    totalamount = x.Order.TotalAmount,
                    quantity = x.Quantity,
                    status = x.Order.Status
                })
                .ToListAsync();

            if (order == null)
            {
                return NotFound(new { message = "Order not found" });
            }
            return Ok(order); 
        }
        


        // PUT: api/Orders/5
        [HttpGet("update/{id}")]
        public async Task<IActionResult> PutOrder(int id)
        {
            if (id <=0)
            {
                return BadRequest();
            }
            var order=_context.Orders.Where(x => x.Id == id).FirstOrDefault();
            order.Status = "Delivered";
            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        [HttpPost]
        public async Task<IActionResult> PostOrder([FromBody] Order order, [FromQuery] bool isPaid = false, [FromQuery] bool isPaymentFailed = false)
        {
            if (isPaid)
            {
                order.Status = "Paid"; 
            }
            else if (isPaymentFailed)
            {
                order.Status = "Failed";
            }
            else
            {
                order.Status = "Hold"; 
            }

        
            order.OrderDate = DateTime.Now;
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            
            if (isPaid)
            {
                var cart = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == order.UserId);
                if (cart != null)
                {
                    _context.Carts.Remove(cart);
                    await _context.SaveChangesAsync();
                }
            }

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
