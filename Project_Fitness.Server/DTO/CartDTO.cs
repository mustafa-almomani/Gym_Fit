namespace Project_Fitness.Server.DTO
{
    public class CartDTO
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public DateTime? CreatedDate { get; set; }
        public List<CartitemDTO> CartItems { get; set; } = new List<CartitemDTO>();
    }
}
