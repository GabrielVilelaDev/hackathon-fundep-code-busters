using Hackathon.InscricaoEvento.Application.DTOs;
using Hackathon.InscricaoEvento.Domain.Entities;
using Hackathon.InscricaoEvento.Domain.Interfaces;

namespace Hackathon.InscricaoEvento.Application.Handlers;

public class CadastrarEventoHandler
{
    private readonly IEventoRepository _eventoRepository;

    public CadastrarEventoHandler(IEventoRepository eventoRepository)
    {
        _eventoRepository = eventoRepository;
    }

    public async Task<Guid> ExecutarAsync(CadastrarEventoDto dto)
    {
        var evento = new Evento
        {
            Id = Guid.NewGuid(),
            Titulo = dto.Titulo,
            Descricao = dto.Descricao,
            Local = dto.Local,
            Ministrantes = dto.Ministrantes,
            DataInicioMatricula = dto.DataInicioMatricula,
            DataFimMatricula = dto.DataFimMatricula,
            DataInicioEvento = dto.DataInicioEvento,
            DataFimEvento = dto.DataFimEvento,
            NumeroMaximoInscritos = dto.NumeroMaximoInscritos,
            Valor = dto.Valor,
            DataCriacao = DateTime.UtcNow
        };

        await _eventoRepository.AdicionarAsync(evento);
        return evento.Id;
    }
}