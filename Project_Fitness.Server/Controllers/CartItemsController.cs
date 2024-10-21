using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PayPalCheckoutSdk.Orders;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController : ControllerBase
    {
        private readonly MyDbContext _context;
        public CartItemsController(MyDbContext context)
        {
            _context = context;

        }
        [HttpGet("getcartitembyid/{id}")]
        public IActionResult Get(int id) { 
            var cartitem = _context.CartItems.FirstOrDefault(x => x.Id == id);
            if (cartitem == null) {
                return BadRequest();
            }
            return Ok(cartitem);

        }

        [HttpPost("addcartitem")]
        public IActionResult addcartitem([FromBody] cartitemPOST cartitem)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserEmail == cartitem.email);
            var carts = _context.Carts.FirstOrDefault(c => c.UserId == user.UserId);
            if (carts == null) {
                var newCart = new Cart
                {
                    UserId = user.UserId,
                    CreatedDate = DateTime.Now,
                };
                _context.Carts.Add(newCart);
                _context.SaveChanges();
                carts = newCart;
            }

            var isProductExist = _context.CartItems.Where(x => x.CartId == carts.Id && x.ProductId == cartitem.ProductId).FirstOrDefault();

            if (isProductExist == null)
            {
                var cart = new CartItem
                {
                    Price = cartitem.Price,
                    ProductId = cartitem.ProductId,
                    CartId = carts.Id,
                    Quantity = cartitem.Quantity,
                };

                _context.CartItems.Add(cart);
                _context.SaveChanges();
                return Ok(cart);
            }
            else
            {
                isProductExist.Quantity += cartitem.Quantity;
                _context.CartItems.Update(isProductExist);
                _context.SaveChanges();
                return Ok(isProductExist);

            }

        }

        [HttpGet("increaseQuantity/{id}")]
        public IActionResult increaseQuantity(int id)
        {
            var cartItem = _context.CartItems.FirstOrDefault(x => x.Id == id);
            cartItem.Quantity = cartItem.Quantity + 1;
            _context.CartItems.Update(cartItem);
            _context.SaveChanges();
            return Ok(cartItem);
        }

        [HttpGet("decreaseQuantity/{id}")]
        public IActionResult decreaseQuantity(int id)
        {
            var cartItem = _context.CartItems.FirstOrDefault(x => x.Id == id);
            cartItem.Quantity = cartItem.Quantity - 1;

            if (cartItem.Quantity <= 0) {
                _context.CartItems.Remove(cartItem);
                _context.SaveChanges();
                return Ok(cartItem);
            }
            else
            {
                _context.CartItems.Update(cartItem);
                _context.SaveChanges();
                return Ok(cartItem);
            }
            
        }
    }
}
