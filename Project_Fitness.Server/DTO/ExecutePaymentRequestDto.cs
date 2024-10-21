namespace Project_Fitness.Server.DTO
{
    public class ExecutePaymentRequestDto
    {
        public string PaymentId { get; set; }
        public string PayerId { get; set; }
        public long UserId { get; set; }
        public int? GymId { get; set; }
        public int? FitnessClassId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal Total { get; set; }
    }
}
