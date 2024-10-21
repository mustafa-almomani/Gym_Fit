using Project_Fitness.Server.Models;

namespace Project_Fitness.Server.DTO
{
    public class registerDTO
    {
        public string UserName { get; set; } = null!;
        public string UserEmail { get; set; } = null!;
        public string? UserPassword { get; set; }
        public string? confirmPassword { get; set; }

        public DateTime? CreatedAt { get; set; }



    }
}
