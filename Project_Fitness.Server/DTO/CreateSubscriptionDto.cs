namespace Project_Fitness.Server.DTO
{
    public class CreateSubscriptionDto
    {
        public int UserId { get; set; }
        public decimal Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string PaymentMethod { get; set; } = "PayPal"; 
        public string PaymentId { get; set; }
        public string TransactionId { get; set; }
    }
}
