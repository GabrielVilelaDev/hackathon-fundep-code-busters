using FluentValidation;
using Hackathon.InscricaoEvento.Application.DTOs;

namespace Hackathon.InscricaoEvento.Application.Validators;

public class CadastrarEventoDtoValidator : AbstractValidator<CadastrarEventoDto>
{
    public CadastrarEventoDtoValidator()
    {
        RuleFor(x => x.Titulo)
            .NotEmpty()
            .WithMessage("Título é obrigatório")
            .MaximumLength(200)
            .WithMessage("Título deve ter no máximo 200 caracteres");

        RuleFor(x => x.Descricao)
            .NotEmpty()
            .WithMessage("Descrição é obrigatória")
            .MaximumLength(1000)
            .WithMessage("Descrição deve ter no máximo 1000 caracteres");

        RuleFor(x => x.Local)
            .NotEmpty()
            .WithMessage("Local é obrigatório")
            .MaximumLength(200)
            .WithMessage("Local deve ter no máximo 200 caracteres");

        RuleFor(x => x.Ministrantes)
            .NotEmpty()
            .WithMessage("Ministrantes são obrigatórios")
            .MaximumLength(500)
            .WithMessage("Ministrantes deve ter no máximo 500 caracteres");

        RuleFor(x => x.DataInicioMatricula)
            .NotEmpty()
            .WithMessage("Data de início da matrícula é obrigatória")
            .GreaterThan(DateTime.Now)
            .WithMessage("Data de início da matrícula deve ser futura");

        RuleFor(x => x.DataFimMatricula)
            .NotEmpty()
            .WithMessage("Data de fim da matrícula é obrigatória")
            .GreaterThan(x => x.DataInicioMatricula)
            .WithMessage("Data de fim da matrícula deve ser posterior à data de início");

        RuleFor(x => x.DataInicioEvento)
            .NotEmpty()
            .WithMessage("Data de início do evento é obrigatória")
            .GreaterThan(x => x.DataFimMatricula)
            .WithMessage("Data de início do evento deve ser posterior ao fim da matrícula");

        RuleFor(x => x.DataFimEvento)
            .NotEmpty()
            .WithMessage("Data de fim do evento é obrigatória")
            .GreaterThan(x => x.DataInicioEvento)
            .WithMessage("Data de fim do evento deve ser posterior à data de início");

        RuleFor(x => x.NumeroMaximoInscritos)
            .GreaterThan(0)
            .WithMessage("Número máximo de inscritos deve ser maior que zero");

        RuleFor(x => x.Valor)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Valor deve ser maior ou igual a zero");
    }
}