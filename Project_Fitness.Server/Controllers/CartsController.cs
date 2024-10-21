using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;
using System.Collections.Generic;
using System.Linq;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public CartsController(MyDbContext context)
        {
            _context = context;
        }

        // Add product to cart
        [HttpPost]
        public IActionResult AddToCart([FromBody] AddToCartDTO cart)
        {
            var product = _context.Products.FirstOrDefault(p => p.Id == cart.ProductId);
            if (product == null)
            {
                return NotFound("Product not found");
            }

            // Calculate price after discount
            decimal priceAfterDiscount = product.Discount.HasValue && product.Discount.Value > 0
                ? product.Price - (product.Price * (product.Discount.Value / 100))
                : product.Price;

            var existingCartItem = _context.Carts
                .FirstOrDefault(c => c.UserId == cart.UserId && c.CartItems.Any(ci => ci.ProductId == cart.ProductId));

            if (existingCartItem != null)
            {
                var cartItem = existingCartItem.CartItems.FirstOrDefault(ci => ci.ProductId == cart.ProductId);
                if (cartItem != null)
                {
                    cartItem.Quantity += 1;
                    cartItem.Price = priceAfterDiscount; 
                    _context.Update(cartItem);
                }
            }
            else
            {
                var newCartItem = new CartItem
                {
                    ProductId = cart.ProductId,
                    Quantity = 1,
                    Price = priceAfterDiscount,
                };

                var newCart = new Cart
                {
                    UserId = cart.UserId,
                    CreatedDate = System.DateTime.Now,
                    CartItems = new List<CartItem> { newCartItem }
                };

                _context.Carts.Add(newCart);
            }

            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("getCartItemsByUserId/{id}")]
        public IActionResult getCartItemsByUserId(int id) {
            var cart = _context.Carts.FirstOrDefault(c => c.UserId == id);
            var cartItems = _context.CartItems
                                        .Where(c => c.CartId == cart.Id)
                                        .Include(c => c.Product)  // Eagerly load the product details
                                        .ToList();
            return Ok(cartItems); 
        }

        // Get all products in the user's cart
        [HttpGet("getallitems/{id}")]
        public IActionResult GetAllProducts(int id)
        {
            var cart = _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefault(c => c.UserId == id);

            if (cart == null)
            {
                return NotFound("Cart not found for the user.");
            }

            var cartDTO = new CartDTO
            {
                Id = cart.Id,
                UserId = cart.UserId,
                CreatedDate = cart.CreatedDate,
                CartItems = cart.CartItems.Select(ci => new CartitemDTO
                {
                    ProductId = ci.ProductId,
                    Quantity = ci.Quantity,
                    Price = ci.Price,
                    CartId = ci.CartId
                }).ToList()
            };

            return Ok(cartDTO);
        }

        // Update a single cart item
        [HttpPut("cartitem/updateitem/{id}")]
        public IActionResult EditProduct(int id, [FromBody] CartitemDTO obj)
        {
            var cartItem = _context.CartItems.Find(id);
            if (cartItem == null)
            {
                return NotFound("Cart item not found");
            }

            cartItem.Quantity = obj.Quantity;

            _context.Update(cartItem);
            _context.SaveChanges();
            return Ok(cartItem);
        }

        // Update multiple cart items
        //[HttpPut("cartitem/updateMulti")]
        //public IActionResult UpdateCartItems([FromBody] List<CartitemDTO> cartItems)
        //{
        //    foreach (var item in cartItems)
        //    {
        //        var cartItem = _context.CartItems
        //            .FirstOrDefault(ci => ci.ProductId == item.ProductId && ci.Cart.UserId == item.ProductId);

        //        if (cartItem != null)
        //        {
        //            cartItem.Quantity = item.Quantity;
        //            _context.Update(cartItem);
        //        }
        //        else
        //        {
        //            var newCartItem = new CartItem
        //            {
        //                ProductId = item.ProductId,
        //                Quantity = item.Quantity,
        //                CartId = _context.Carts.FirstOrDefault(c => c.UserId == item.ProductId)?.Id
        //            };

        //            _context.CartItems.Add(newCartItem);
        //        }
        //    }

        //    _context.SaveChanges();
        //    return Ok(cartItems);
        //}

        // Delete a cart item
        [HttpDelete("cartitem/deleteitem/{id}")]
        public IActionResult DeleteItem(int id)
        {
            var cartItem = _context.CartItems.Find(id);
            if (cartItem == null)
            {
                return NotFound("Cart item not found");
            }

            _context.CartItems.Remove(cartItem);
            _context.SaveChanges();
            return Ok();
        }

        // Get total number of items in the cart for a user
        [HttpGet("cartItemsSum/{id}")]
        public IActionResult CartItemsSum(int id)
        {
            var count = _context.Carts
                .Where(c => c.UserId == id)
                .SelectMany(c => c.CartItems)
                .Count();

            return Ok(count);
        }
    }
}
