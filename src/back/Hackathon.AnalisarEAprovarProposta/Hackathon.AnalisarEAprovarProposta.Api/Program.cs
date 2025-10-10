
using Hackathon.AnalisarEAprovarProposta.Application.DTOs;
using Hackathon.AnalisarEAprovarProposta.Application.Interfaces;
using Hackathon.AnalisarEAprovarProposta.Domain.Enums;
using Hackathon.AnalisarEAprovarProposta.Domain.Interfaces;
using Hackathon.AnalisarEAprovarProposta.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configuração do Swagger/Explorer
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//// --- BLOC DE REGISTRO DE SERVIÇOS (Local Corrigido) ---

builder.Services.AddSingleton<IPropostaRepository, PropostaRepository>();
//builder.Services.AddScoped<IAnalisarPropostaService, AnalisarPropostaService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// GET /api/propostas — listar todas as propostas (com filtro opcional por status)
app.MapGet("/api/propostas", async (
    IAnalisarPropostaService service,
    StatusProposta? status
    ) =>
{
    var response = await service.ListarPropostasAsync(status);
    return Results.Ok(response);
})
.WithName("ListarPropostas")
.WithTags("Propostas");

// GET /api/propostas/{id} — buscar proposta por ID
app.MapGet("/api/propostas/{id:guid}", async (
    long id,
    IAnalisarPropostaService service
    ) =>
{
    var response = await service.ObterPorIdAsync(id);
    return response is null ? Results.NotFound() : Results.Ok(response);
})
.WithName("BuscarPropostaPorId")
.WithTags("Propostas");

// POST /api/propostas/{id}/analysis — registra análise (aprovação ou devolução)
app.MapPost("/api/propostas/{id}/analysis", async (
    long id,
    AnalisarPropostaRequest request,
    IAnalisarPropostaService service
    ) =>
{
    try
    {
        var response = await service.AnalisarAsync(id, request);
        return Results.Ok(response);
    }
    catch (InvalidOperationException ex)
    {
        return Results.BadRequest(new { erro = ex.Message });
    }
})
.WithName("AnalisarProposta")
.WithTags("Propostas");

app.Run();

