using Microsoft.EntityFrameworkCore;
using WaterProject.API.Data;

var builder = WebApplication.CreateBuilder(args);

// --- Register services ---

// Connect the database context to SQLite using the connection string from appsettings.json
builder.Services.AddDbContext<WaterDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("water_connection")));

// CORS policy — browsers block requests between different origins by default.
// This tells the backend to allow requests coming from our React app on port 3000.
builder.Services.AddCors(options =>
    options.AddPolicy("AllowReact", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod()));

// Register controllers so .NET knows to look for API endpoints in the Controllers folder
builder.Services.AddControllers();

builder.Services.AddOpenApi();

var app = builder.Build();

// --- Configure the request pipeline ---

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Apply the CORS policy — must come before UseAuthorization and MapControllers
app.UseCors("AllowReact");

app.UseAuthorization();

// Map incoming HTTP requests to the right controller actions
app.MapControllers();

app.Run();
