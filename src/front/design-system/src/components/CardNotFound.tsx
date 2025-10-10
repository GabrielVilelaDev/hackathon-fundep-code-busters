import { ArrowLeft, Home, Search } from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CardNotFoundProps {
  title?: string;
  message?: string;
  showSearchSuggestion?: boolean;
  showBackButton?: boolean;
  onGoHome?: () => void;
  onGoBack?: () => void;
  disableNavigation?: boolean;
}

export const CardNotFound = ({
  title = "404 - Página não encontrada",
  message = "A página que você está procurando não existe ou foi movida.",
  showSearchSuggestion = true,
  showBackButton = true,
  onGoHome,
  onGoBack,
  disableNavigation = false
}: CardNotFoundProps) => {
  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else if (!disableNavigation) {
      window.history.back();
    }
  };

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    } else if (!disableNavigation) {
      window.location.href = "/home";
    }
  };

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader className="pb-4">
        <div className="mx-auto mb-4 w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
          <Search className="w-10 h-10 text-accent" aria-hidden="true" />
        </div>
        <div className="mb-4">
          <span className="text-6xl font-extrabold text-accent">404</span>
        </div>
        <CardTitle className="text-xl font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-muted-foreground leading-relaxed">{message}</p>

        {showSearchSuggestion && (
          <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
            <p className="text-sm text-secondary-foreground">
              <strong>Dica:</strong> Verifique se o endereço está correto ou use
              a navegação para encontrar o que procura.
            </p>
          </div>
        )}

        <div className="space-y-3">
          <Button
            onClick={handleGoHome}
            className="w-full"
            variant="default"
            icon={<Home className="w-4 h-4 mr-2" />}
          >
            Ir para página inicial
          </Button>

          {showBackButton && (
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="w-full"
              icon={<ArrowLeft className="w-4 h-4 mr-2" />}
            >
              Voltar
            </Button>
          )}
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Se você acredita que isso é um erro, entre em contato conosco.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
