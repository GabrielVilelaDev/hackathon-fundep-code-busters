interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "muted";
  fullScreen?: boolean;
  className?: string;
}

export const LoadingSpinner = ({
  message = "Carregando...",
  size = "md",
  variant = "primary",
  fullScreen = false,
  className = ""
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const variantClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    muted: "text-muted-foreground"
  };

  const containerClass = fullScreen
    ? "fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    : "flex items-center justify-center p-4";

  return (
    <div className={`${containerClass} ${className}`}>
      <div
        className="flex flex-col items-center gap-4"
        role="status"
        aria-label={message}
      >
        <svg
          className={`${sizeClasses[size]} ${
            variantClasses[variant]
          } animate-spin`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>

        {message && (
          <p className="text-body-medium-medium text-muted-foreground text-center animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
