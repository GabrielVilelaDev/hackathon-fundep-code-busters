import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@design-system";

const RootLayout = lazy(
  () => import("@/shared/components/templates/RootLayout")
);
const AuthLayout = lazy(
  () => import("@/shared/components/templates/AuthLayout")
);

const LoginPage = lazy(() => import("@/modules/auth/pages/LoginPage"));

const DashboardPage = lazy(
  () => import("@/modules/prospeccao/pages/DashboardPage")
);
const AprovacoesPage = lazy(
  () => import("@/modules/prospeccao/pages/AprovacoesPage")
);
const RelatoriosPage = lazy(
  () => import("@/modules/prospeccao/pages/RelatoriosPage")
);
const ConfiguracoesPage = lazy(
  () => import("@/modules/prospeccao/pages/ConfiguracoesPage")
);
const ProspeccaoDashboard = lazy(
  () => import("@/modules/prospeccao/pages/Dashboard")
);
const PropostasListPage = lazy(
  () => import("@/modules/prospeccao/pages/PropostasListPage")
);
const PropostaDetailPage = lazy(
  () => import("@/modules/prospeccao/pages/PropostaDetailPage")
);
const NovaPropostaPage = lazy(
  () => import("@/modules/prospeccao/pages/NovaPropostaPage")
);

// Projeto Pages
const ProjetosListPage = lazy(
  () => import("@/modules/projeto/pages/ProjetosListPage")
);
const NovoProjetoPage = lazy(
  () => import("@/modules/projeto/pages/NovoProjetoPage")
);
const ProjetoDetailPage = lazy(
  () => import("@/modules/projeto/pages/ProjetoDetailPage")
);
const EditarProjetoPage = lazy(
  () => import("@/modules/projeto/pages/EditarProjetoPage")
);

// Evento Pages
const EventosListPage = lazy(
  () => import("@/modules/evento/pages/EventosListPage")
);
const NovoEventoPage = lazy(
  () => import("@/modules/evento/pages/NovoEventoPage")
);
const EventoDetailPage = lazy(
  () => import("@/modules/evento/pages/EventoDetailPage")
);
const MinhasMatriculasPage = lazy(
  () => import("@/modules/evento/pages/MinhasMatriculasPage")
);

const LazyRoute = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<LoadingSpinner fullScreen />}>{children}</Suspense>;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <LazyRoute>
        <AuthLayout />
      </LazyRoute>
    ),
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },

  {
    path: "/",
    element: (
      <LazyRoute>
        <RootLayout />
      </LazyRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/projetos" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "aprovacoes",
        element: <AprovacoesPage />,
      },
      {
        path: "relatorios",
        element: <RelatoriosPage />,
      },
      {
        path: "configuracoes",
        element: <ConfiguracoesPage />,
      },
      {
        path: "prospeccao",
        children: [
          {
            index: true,
            element: <ProspeccaoDashboard />,
          },
          {
            path: "propostas",
            children: [
              {
                index: true,
                element: <PropostasListPage />,
              },
              {
                path: "nova",
                element: <NovaPropostaPage />,
              },
              {
                path: ":id",
                element: <PropostaDetailPage />,
              },
            ],
          },
        ],
      },
      {
        path: "projetos",
        children: [
          {
            index: true,
            element: <ProjetosListPage />,
          },
          {
            path: "novo",
            element: <NovoProjetoPage />,
          },
          {
            path: ":id",
            element: <ProjetoDetailPage />,
          },
          {
            path: ":id/editar",
            element: <EditarProjetoPage />,
          },
        ],
      },
      {
        path: "eventos",
        children: [
          {
            index: true,
            element: <EventosListPage />,
          },
          {
            path: "novo",
            element: <NovoEventoPage />,
          },
          {
            path: ":id",
            element: <EventoDetailPage />,
          },
        ],
      },
      {
        path: "matriculas",
        element: <MinhasMatriculasPage />,
      },
    ],
  },

  {
    path: "*",
    element: (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-2 text-muted-foreground">Página não encontrada</p>
        </div>
      </div>
    ),
  },
]);
