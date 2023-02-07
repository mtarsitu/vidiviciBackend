using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using Microsoft.OpenApi.Models;
using API_VidiVici.Repositories.Implementation;

using Microsoft.AspNetCore.Authentication.JwtBearer;

using Microsoft.IdentityModel.Tokens;
using System.Text;
using API_VidiVici.data;
using API_VidiVici.Model;

using API_VidiVici.Services;
using API_VidiVici.Data;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(x=>x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

string? connString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddCors(cors=>{
    cors.AddPolicy(name: MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:3000").AllowCredentials().AllowAnyHeader().AllowAnyMethod();
    });
    
    
});

builder.Services.AddDbContext<VidiviciDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
    
});
builder.Services.AddIdentityCore<User>().AddRoles<IdentityRole>().AddSignInManager().AddEntityFrameworkStores<VidiviciDbContext>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
            
        };
        opt.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    context.Token = context.Request.Cookies["Token"];
                    return Task.CompletedTask;
                }
            };
    });


builder.Services.AddAuthorization();
builder.Services.AddScoped<NotificationRepository>();
builder.Services.AddScoped<NotificationService>();
builder.Services.AddScoped<EventRepository>();
builder.Services.AddScoped<EventService>();
builder.Services.AddScoped<InformationsRepository>();
builder.Services.AddScoped<InformationsServices>();
builder.Services.AddScoped<ApplicationRepository>();
builder.Services.AddScoped<ApplicationService>();
builder.Services.AddScoped<FundsRepository>();
builder.Services.AddScoped<FundsServices>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<InvestmentsServices>();
builder.Services.AddScoped<InvestementsRepository>();
builder.Services.AddScoped<UserManager<User>>();


builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Jwt auth header",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
               Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

//app.MapPost("/security/createToken");

app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
});

app.UseAuthentication();
app.UseAuthorization();
//adasa
app.MapControllers();


using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<VidiviciDbContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
var userManager = (UserManager<User>)scope.ServiceProvider.GetService(typeof(UserManager<User>));

try
{
    context.Database.Migrate();
    DbInitializer.Initialize(context,  userManager);
}
catch(Exception ex)
{
    logger.LogError(ex, "Problem migrating data");
}

await app.RunAsync();