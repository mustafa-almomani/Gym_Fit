using System;
using System.Collections.Generic;

namespace Project_Fitness.Server.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string UserEmail { get; set; } = null!;

    public string? UserImage { get; set; }

    public string? UserPassword { get; set; }

    public string? UserPhone { get; set; }

    public string? UserAddress { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string? HashPassword { get; set; }

    public string? SaltPassword { get; set; }

    public bool? IsBlocked { get; set; }

    public bool? IsAdmin { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<ContactU> ContactUs { get; set; } = new List<ContactU>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();

    public virtual ICollection<Testimonial> Testimonials { get; set; } = new List<Testimonial>();
}
