using FluentValidation;
using Hackathon.InscricaoEvento.Application.DTOs;

namespace Hackathon.InscricaoEvento.Application.Validators;

public class RealizarMatriculaDtoValidator : AbstractValidator<RealizarMatriculaDto>
{
    public RealizarMatriculaDtoValidator()
    {
        RuleFor(x => x.CodigoAluno)
            .NotEmpty()
            .WithMessage("Código do aluno é obrigatório")
            .MaximumLength(50)
            .WithMessage("Código do aluno deve ter no máximo 50 caracteres");

        RuleFor(x => x.EventoId)
            .NotEmpty()
            .WithMessage("ID do evento é obrigatório");

        RuleFor(x => x.TipoPagamento)
            .IsInEnum()
            .WithMessage("Tipo de pagamento inválido");
    }
}