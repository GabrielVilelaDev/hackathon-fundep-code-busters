using Hackathon.InscricaoEvento.Application.DTOs;
using Hackathon.InscricaoEvento.Domain.Interfaces;

namespace Hackathon.InscricaoEvento.Application.Handlers;

public class ListarMatriculasHandler
{
    private readonly IMatriculaRepository _matriculaRepository;

    public ListarMatriculasHandler(IMatriculaRepository matriculaRepository)
    {
        _matriculaRepository = matriculaRepository;
    }

    public async Task<List<MatriculaResponseDto>> ExecutarAsync(string codigoAluno)
    {
        var matriculas = await _matriculaRepository.ObterPorCodigoAlunoAsync(codigoAluno);

        return matriculas.Select(m => new MatriculaResponseDto
        {
            Id = m.Id,
            CodigoAluno = m.CodigoAluno,
            EventoId = m.EventoId,
            TituloEvento = m.Evento?.Titulo ?? string.Empty,
            Status = m.Status,
            TipoPagamento = m.TipoPagamento,
            DataMatricula = m.DataMatricula
        }).ToList();
    }
}