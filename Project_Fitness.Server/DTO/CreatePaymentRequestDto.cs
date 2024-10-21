namespace Project_Fitness.Server.DTO
{
    public class CreatePaymentRequestDto
    {
        public string RedirectUrl { get; set; }
        public decimal Total { get; set; }
        public string? Message { get; set; }
        public long UserId { get; set; }
    }
}
