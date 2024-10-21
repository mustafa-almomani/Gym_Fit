namespace Project_Fitness.Server.DTO
{
    public class GetAllTestimonialsDTO
    {
        public int Id { get; set; }

        public string UserName { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string? TheTestimonial { get; set; }

        public bool? IsAccepted { get; set; }
    }
}
