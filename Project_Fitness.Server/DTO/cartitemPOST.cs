namespace Project_Fitness.Server.DTO
{
    public class cartitemPOST
    {
        public int? ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int? CartId { get; set; }
        public string email { get; set; }
    }
}
