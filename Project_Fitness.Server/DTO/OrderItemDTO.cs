using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.DTO
{
    public class OrderItemDTO
    {

        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        public virtual Product Product { get; set; }
        public virtual Order Order { get; set; }
    }
}

