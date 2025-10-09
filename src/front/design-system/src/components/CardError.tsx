import { AlertCircle } from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CardErrorProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showRetryButton?: boolean;
  onRetry?: () => void;
  onGoHome?: () => void;
  onGoBack?: () => void;
  disableNavigation?: boolean;
}

export const CardError = ({
  title = "Ops! Algo deu errado",
  message = "Ocorreu um erro inesperado. Tente novamente ou volte para a página inicial.",
  showHomeButton = true,
  showRetryButton = true,
  onRetry,
  onGoHome,
  onGoBack,
  disableNavigation = false
}: CardErrorProps) => {
  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else if (!disableNavigation) {
      window.location.href = "/";
    }
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else if (!disableNavigation) {
      window.history.back();
    }
  };

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader className="pb-4">
        <div className="mx-auto mb-4 w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle
            className="w-10 h-10 text-destructive"
            aria-hidden="true"
          />
        </div>
        <CardTitle className="text-xl font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-muted-foreground leading-relaxed">{message}</p>

        <div className="space-y-3">
          {showRetryButton && (
            <Button onClick={handleRetry} className="w-full" variant="default">
              Tentar novamente
            </Button>
          )}

          <Button onClick={handleGoBack} variant="outline" className="w-full">
            Voltar
          </Button>

          {showHomeButton && (
            <Button onClick={handleGoHome} variant="ghost" className="w-full">
              Ir para página inicial
            </Button>
          )}
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Se o problema persistir, entre em contato com o suporte.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
