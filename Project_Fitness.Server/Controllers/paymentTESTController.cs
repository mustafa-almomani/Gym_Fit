using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PayPal.Api;
using Project_Fitness.Server.DTO;
using Project_Fitness.Server.Models;
using Project_Fitness.Server.services;
using System.Text;

namespace Project_Fitness.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class paymentTESTController : ControllerBase
    {
        private readonly MyDbContext _db;
        string _redirectUrl;
        private PayPalPaymentService payPalService;
        public paymentTESTController(MyDbContext db, IConfiguration config, PayPalPaymentService paypal)
        {

            _db = db;

            _redirectUrl = config["PayPal:RedirectUrl"] + "/api/paymentTEST";

            payPalService = paypal;

        }

        [HttpGet("createOrder/{id}")]
        public IActionResult createOrder(int id)
        {

            var newOrder = new Project_Fitness.Server.Models.Order()
            {
                UserId = id,
                TotalAmount = 0,
                OrderDate = DateTime.Now,
                Status = "Pending",
                TransactionId = 555,
            };

            _db.Orders.Add(newOrder);
            _db.SaveChanges();

            var cart = _db.Carts.FirstOrDefault(x => x.UserId == id);

            var cartItems = _db.CartItems.Where(l => l.CartId == cart.Id).ToList();
            decimal totalPrice = 0;
            foreach (var cartItem in cartItems)
            {
                var item = new OrderItem()
                {
                    OrderId = newOrder.Id,
                    ProductId = cartItem.ProductId,
                    Quantity = cartItem.Quantity,
                    Price = cartItem.Price,
                };

                _db.OrderItems.Add(item);
                totalPrice += cartItem.Price * cartItem.Quantity;
                _db.CartItems.Remove(cartItem);
                _db.SaveChanges();

            }
            newOrder.TotalAmount = totalPrice + 5;
            _db.Orders.Update(newOrder);
            _db.SaveChanges();



            return Ok(newOrder);

        }

        [HttpGet("checkout/{UserId}")]
        public IActionResult CreatePayment(int UserId)
        {
            if (string.IsNullOrEmpty(_redirectUrl))
                throw new Exception("The redirect link for the paypal should be set correctly on the sitting app.");

            var cart = _db.Carts.FirstOrDefault(x => x.UserId == UserId);
            var cartItems = _db.CartItems.Where(l => l.CartId == cart.Id).ToList();

            decimal totalPriceUser = 0;
            foreach (var cartItem in cartItems)
            {
                totalPriceUser += cartItem.Price * cartItem.Quantity;
            }

            var totalPrice = totalPriceUser +5;
            var payment = payPalService.CreatePayment(_redirectUrl ?? " ", totalPrice, null, UserId);
            var approvalUrl = payment.links.FirstOrDefault(l => l.rel.Equals("approval_url", StringComparison.OrdinalIgnoreCase))?.href;

            return Ok(new { approvalUrl });
        }


        [HttpGet("success")]
        public IActionResult ExecutePayment(string paymentId, string PayerID, string token, int userId)
        {
           

                var newOrder = new Project_Fitness.Server.Models.Order()
                {
                    UserId = userId,
                    TotalAmount = 0,
                    OrderDate = DateTime.Now,
                    Status = "Pending",
                    TransactionId = 555, // Ideally, this should be dynamic
                };

                _db.Orders.Add(newOrder);
                _db.SaveChanges();

                var cart = _db.Carts.FirstOrDefault(x => x.UserId == userId);
                if (cart == null)
                {
                    return BadRequest("Cart not found.");
                }

                var cartItems = _db.CartItems.Where(l => l.CartId == cart.Id).ToList();
                if (!cartItems.Any())
                {
                    return BadRequest("No items in cart.");
                }

                decimal totalPrice = 0;
                foreach (var cartItem in cartItems)
                {
                    var item = new OrderItem()
                    {
                        OrderId = newOrder.Id,
                        ProductId = cartItem.ProductId,
                        Quantity = cartItem.Quantity,
                        Price = cartItem.Price,
                    };

                    _db.OrderItems.Add(item);
                    totalPrice += cartItem.Price * cartItem.Quantity;
                    _db.CartItems.Remove(cartItem);
                }

                // Finalize the total amount
                newOrder.TotalAmount = totalPrice + 5 ;
                _db.Orders.Update(newOrder);
                _db.SaveChanges();  // Ensure changes are saved after all modifications

                // Log or Debug
                Console.WriteLine($"Order created with total amount: {newOrder.TotalAmount}");

                var executedPayment = payPalService.ExecutePayment(paymentId, PayerID);

                const string script = "<script>window.close();</script>";
                return Content(script, "text/html");
            
        }





        [HttpGet("cancel")]
        public IActionResult CancelPayment()
        {
            return BadRequest("Payment canceled.");
        }
    }
}
