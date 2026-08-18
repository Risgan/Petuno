using Microsoft.EntityFrameworkCore;
using Petuno.Infrastructure.Data;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Register EF Core with PostgreSQL
builder.Services.AddDbContext<PetunoDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PetunoDb")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
