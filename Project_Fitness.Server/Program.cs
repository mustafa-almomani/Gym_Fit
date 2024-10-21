using Microsoft.EntityFrameworkCore;
using Project_Fitness.Server.Controllers;
using Project_Fitness.Server.Models;
using Project_Fitness.Server.services;
using Project_Fitness.Server.Services;
using System.Text.Json.Serialization;
using Project_Fitness.Server.DTO;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    // Prevent circular references in JSON serialization
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;

    // Optionally, ignore null values in JSON serialization
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("YourConnectionString")));
builder.Services.AddScoped<PayPalPaymentService>();
builder.Services.AddScoped<PayPalPaymentServiceForSub>();
builder.Services.AddCors(options =>

options.AddPolicy("Development", builder =>
{
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
})
);
builder.Services.AddTransient<EmailServiceR>();
builder.Services.AddScoped<registeruserController>(); // Register ClassesController
builder.Services.AddHostedService<EmailReminderService>();
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("Development");


app.MapFallbackToFile("/index.html");

app.Run();
