namespace Project_Fitness.Server.DTO
{
    public class TipDTO
    {
        public string TipsName { get; set; } = null!;

        public string TipsDescription { get; set; } = null!;

        public IFormFile? TipsImage { get; set; }
    }
}
