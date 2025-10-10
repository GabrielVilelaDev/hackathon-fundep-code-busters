using Hackathon.InscricaoEvento.Application.DTOs;
using Hackathon.InscricaoEvento.Domain.Entities;
using Hackathon.InscricaoEvento.Domain.Enums;
using Hackathon.InscricaoEvento.Domain.Interfaces;

namespace Hackathon.InscricaoEvento.Application.Handlers;

public class RealizarMatriculaHandler
{
    private readonly IEventoRepository _eventoRepository;
    private readonly IMatriculaRepository _matriculaRepository;

    public RealizarMatriculaHandler(IEventoRepository eventoRepository, IMatriculaRepository matriculaRepository)
    {
        _eventoRepository = eventoRepository;
        _matriculaRepository = matriculaRepository;
    }

    public async Task<Guid?> ExecutarAsync(RealizarMatriculaDto dto)
    {
        var evento = await _eventoRepository.ObterPorIdAsync(dto.EventoId);
        if (evento == null)
        {
            return null;
        }

        // Verificar se o período de matrícula está ativo
        var agora = DateTime.UtcNow;
        if (agora < evento.DataInicioMatricula || agora > evento.DataFimMatricula)
        {
            throw new InvalidOperationException("Período de matrícula não está ativo.");
        }

        // Verificar se já existe matrícula do aluno para este evento
        var matriculasAluno = await _matriculaRepository.ObterPorCodigoAlunoAsync(dto.CodigoAluno);
        var matriculaExistente = matriculasAluno.FirstOrDefault(m => m.EventoId == dto.EventoId);
        if (matriculaExistente != null)
        {
            throw new InvalidOperationException("Aluno já possui matrícula para este evento.");
        }

        // Verificar se há vagas disponíveis
        var totalMatriculasConfirmadas = await _matriculaRepository.ContarMatriculasConfirmadasPorEventoAsync(dto.EventoId);
        if (totalMatriculasConfirmadas >= evento.NumeroMaximoInscritos)
        {
            throw new InvalidOperationException("Evento já atingiu o número máximo de inscrições.");
        }

        var matricula = new Matricula
        {
            Id = Guid.NewGuid(),
            CodigoAluno = dto.CodigoAluno,
            EventoId = dto.EventoId,
            Status = StatusMatricula.Pendente,
            TipoPagamento = dto.TipoPagamento,
            DataMatricula = DateTime.UtcNow
        };

        await _matriculaRepository.AdicionarAsync(matricula);
        return matricula.Id;
    }
}