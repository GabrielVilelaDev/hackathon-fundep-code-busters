using Hackathon.InscricaoEvento.Application.DTOs;
using Hackathon.InscricaoEvento.Domain.Interfaces;

namespace Hackathon.InscricaoEvento.Application.Handlers;

public class ListarEventosHandler
{
    private readonly IEventoRepository _eventoRepository;
    private readonly IMatriculaRepository _matriculaRepository;

    public ListarEventosHandler(IEventoRepository eventoRepository, IMatriculaRepository matriculaRepository)
    {
        _eventoRepository = eventoRepository;
        _matriculaRepository = matriculaRepository;
    }

    public async Task<List<EventoResponseDto>> ExecutarAsync()
    {
        var eventos = await _eventoRepository.ObterTodosAsync();
        var resultado = new List<EventoResponseDto>();

        foreach (var evento in eventos)
        {
            var totalMatriculasConfirmadas = await _matriculaRepository.ContarMatriculasConfirmadasPorEventoAsync(evento.Id);
            
            resultado.Add(new EventoResponseDto
            {
                Id = evento.Id,
                Titulo = evento.Titulo,
                Descricao = evento.Descricao,
                Local = evento.Local,
                Ministrantes = evento.Ministrantes,
                DataInicioMatricula = evento.DataInicioMatricula,
                DataFimMatricula = evento.DataFimMatricula,
                DataInicioEvento = evento.DataInicioEvento,
                DataFimEvento = evento.DataFimEvento,
                NumeroMaximoInscritos = evento.NumeroMaximoInscritos,
                Valor = evento.Valor,
                DataCriacao = evento.DataCriacao,
                TotalMatriculasConfirmadas = totalMatriculasConfirmadas
            });
        }

        return resultado;
    }
}