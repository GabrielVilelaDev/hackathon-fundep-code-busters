/**
 * Página de matrículas do aluno
 */

import { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
	LoadingSpinner,
	Button,
	Card,
	CardContent,
} from '@design-system';
import { useListarMatriculasPorAluno } from '../hooks/useMatriculas';
import { formatarData, formatarValor, TipoPagamentoLabels } from '../types/evento.types';

export function MinhasMatriculasPage() {
	const [searchTerm, setSearchTerm] = useState('');

	// Busca sempre pelo aluno com código "1"
	const { data: matriculas, isLoading, error, refetch } = useListarMatriculasPorAluno('1', {
		staleTime: 0, // Força busca sempre que entrar na página
		refetchOnMount: true,
	});

	// Filtra pelo nome do evento
	const filteredMatriculas = matriculas?.filter((matricula) => {
		if (!searchTerm) return true;
		const searchLower = searchTerm.toLowerCase();
		const titulo = matricula.evento?.titulo?.toLowerCase() || '';
		const local = matricula.evento?.local?.toLowerCase() || '';
		return titulo.includes(searchLower) || local.includes(searchLower);
	}) || [];

	if (error) {
		toast.error('Erro ao carregar matrículas');
		console.error('Erro ao buscar matrículas:', error);
	}

	// Debug: Log para verificar se está buscando
	useEffect(() => {
		console.log('MinhasMatriculasPage - Estado:', {
			isLoading,
			hasMatriculas: !!matriculas,
			totalMatriculas: matriculas?.length || 0,
			error: error?.message,
		});
	}, [isLoading, matriculas, error]);

	console.log(filteredMatriculas)

	return (
		<div className="container mx-auto py-6 px-4 space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Minhas Matrículas</h1>
				<p className="text-muted-foreground">
					Consulte suas matrículas em eventos
				</p>
				{/* Debug info */}
				{process.env.NODE_ENV === 'development' && (
					<div className="mt-2 text-xs text-muted-foreground">
						Status: {isLoading ? 'Carregando...' : 'Carregado'} |
						Total: {matriculas?.length || 0} |
						Filtrados: {filteredMatriculas.length} |
						Erro: {error ? 'Sim' : 'Não'}
					</div>
				)}
			</div>

			{/* Filtros */}
			<Card>
				<CardContent className="pt-6">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<input
							type="text"
							placeholder="Buscar por nome do evento ou local..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Error */}
			{error && (
				<Card className="border-destructive">
					<CardContent className="pt-6">
						<div className="flex items-center gap-2 text-destructive">
							<AlertCircle className="h-5 w-5" />
							<p>Erro ao carregar matrículas. Tente novamente.</p>
							<Button variant="outline" size="sm" onClick={() => refetch()}>
								Tentar Novamente
							</Button>
						</div>
					</CardContent>
				</Card>
			)}

			{/* Loading */}
			{isLoading ? (
				<div className="flex items-center justify-center py-12">
					<LoadingSpinner />
				</div>
			) : filteredMatriculas.length === 0 ? (
				<Card>
					<CardContent className="pt-6">
						<div className="text-center py-6">
							<p className="text-muted-foreground">
								{searchTerm
									? 'Nenhuma matrícula encontrada com o nome pesquisado.'
									: 'Você ainda não possui matrículas em eventos.'}
							</p>
						</div>
					</CardContent>
				</Card>
			) : (
				<>
					{/* Header com Total */}
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-semibold">
							{filteredMatriculas.length} {filteredMatriculas.length === 1 ? 'matrícula encontrada' : 'matrículas encontradas'}
						</h2>
					</div>

					{/* Lista de Matrículas */}
					<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{filteredMatriculas.map((matricula) => (
							<Card
								key={matricula.id}
								className="hover:shadow-md transition-shadow w-full"
							>
								<CardContent className="pt-6">
									<div className="space-y-4">
										{/* Header do Card */}
										<div className="space-y-2">
											<div className="flex items-start justify-between gap-2">
												<div className="flex-1 min-w-0">
													<h3 className="font-semibold text-base sm:text-lg line-clamp-2">
														{matricula.evento?.titulo || 'Evento'}
													</h3>
													<p className="text-xs text-muted-foreground">
														Matrícula #{matricula.id.slice(0, 8)}
													</p>
												</div>
												{matricula.status && (
													<span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold whitespace-nowrap shrink-0">
														{matricula.status}
													</span>
												)}
											</div>
										</div>

										{/* Informações do Evento */}
										{matricula.evento && (
											<div className="space-y-2 text-sm min-w-0">
												<div className="flex items-center gap-2 min-w-0">
													<Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
													<span className="truncate">
														{formatarData(matricula.evento.dataInicioEvento)}
													</span>
												</div>
												<div className="flex items-center gap-2 min-w-0">
													<MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
													<span className="truncate">{matricula.evento.local}</span>
												</div>
											</div>
										)}

										{/* Informações da Matrícula */}
										<div className="space-y-2 pt-2 border-t">
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground">Pagamento:</span>
												<span className="font-medium">
													{TipoPagamentoLabels[matricula.tipoPagamento]}
												</span>
											</div>
											{matricula.evento && (
												<div className="flex justify-between text-sm">
													<span className="text-muted-foreground">Valor:</span>
													<span className="font-semibold">
														{formatarValor(matricula.evento.valor)}
													</span>
												</div>
											)}
											{matricula.dataMatricula && (
												<div className="flex justify-between text-sm">
													<span className="text-muted-foreground">Data da matrícula:</span>
													<span>{formatarData(matricula.dataMatricula)}</span>
												</div>
											)}
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default MinhasMatriculasPage;
