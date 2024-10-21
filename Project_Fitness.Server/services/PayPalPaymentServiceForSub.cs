using PayPal;
using PayPal.Api;
using Project_Fitness.Server.Models;
using System;
using Payment = PayPal.Api.Payment;

namespace Project_Fitness.Server.Services
{
    public class PayPalPaymentServiceForSub
    {
        private readonly string clientId;
        private readonly string clientSecret;
        private readonly MyDbContext _context;

        public PayPalPaymentServiceForSub(IConfiguration config, MyDbContext context)
        {
            this.clientId = config["PayPal:ClientId"];
            this.clientSecret = config["PayPal:ClientSecret"];
            _context = context;
        }

        
        private APIContext GetAPIContext()
        {
            var oauthToken = new OAuthTokenCredential(clientId, clientSecret).GetAccessToken();
            return new APIContext(oauthToken);
        }


        public Payment CreatePayment(string redirectUrl, decimal total, string? message, long userId)
        {
            try
            {
                var apiContext = GetAPIContext();

                var payment = new Payment
                {
                    intent = "sale",
                    payer = new PayPal.Api.Payer { payment_method = "paypal" },
                    transactions = new List<Transaction>
            {
                new Transaction
                {
                    amount = new Amount
                    {
                        currency = "USD",
                        total = $"{total}" // Amount to charge
                    },
                    description = message ?? "Subscription payment"
                }
            },
                    redirect_urls = new RedirectUrls
                    {
                        cancel_url = $"{redirectUrl}/cancel",
                        return_url = $"{redirectUrl}/Thankyou"
                    }
                };

                return payment.Create(apiContext);
            }
            catch (PayPalException ex)
            {
                // Log the PayPal-specific error message for better understanding
                Console.WriteLine($"PayPal API Error: {ex.Message}");
                throw;
            }
            catch (Exception ex)
            {
                // Log any other general exceptions
                Console.WriteLine($"Error creating PayPal payment: {ex.Message}");
                throw;
            }
        }

        public Payment ExecutePayment(string paymentId, string payerId)
        {
            var apiContext = GetAPIContext();
            var paymentExecution = new PaymentExecution { payer_id = payerId };
            var payment = new Payment { id = paymentId };

            
            return payment.Execute(apiContext, paymentExecution);
        }

       
        public void CreateSubscriptionAndPayment(int userId, int? gymId, int? fitnessClassId, DateTime startDate, DateTime endDate, decimal price, string paymentMethod, string paymentId, string transactionId)
        {
           
            var subscription = new Project_Fitness.Server.Models.Subscription
            {
                UserId = userId,
                GymId = gymId,
                FitnessClassesId = fitnessClassId,
                SubscriptionStartDate = DateOnly.FromDateTime(startDate),
                SubscriptionEndDate = DateOnly.FromDateTime(endDate),
                Price = price,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Subscriptions.Add(subscription);
            _context.SaveChanges();

           
            var payment = new Project_Fitness.Server.Models.Payment
            {
                OrderId = null, 
                PaymentMethod = paymentMethod,
                PaymentAmount = price,
                PaymentDate = DateTime.UtcNow,
                PaymentStatus = "Completed",
                TransactionId = transactionId
            };

            _context.Payments.Add(payment);
            _context.SaveChanges();
        }
    }
}
