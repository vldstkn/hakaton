using Gateway.Logic;
using Gateway.Logic.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
builder.AddGatewayLogic();

builder.Services.AddTransient<IAccountProvider, AccountProvider>();
builder.Services.AddTransient<IProductProvider, ProductProvider>();
builder.Services.AddTransient<IParserProvider, ParserProvider>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
