import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../Header";
import { Sidebar } from "@design-system";
import { FolderKanban, Calendar } from "lucide-react";

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          MenuOptions={[
            {
              title: "Interno",
              items: [
                {
                  label: "Projetos",
                  icon: FolderKanban,
                  onClick: () => {
                    navigate("/projetos");
                  },
                },
              ]
            },
            {
              title: "Externo",
              items: [
                {
                  label: "Eventos",
                  icon: Calendar,
                  onClick: () => {
                    navigate("/eventos");
                  },
                },
              ]
            }
          ]}
        />
        <main className="flex-1 overflow-y-auto p-6"><Outlet /></main>
      </div>
    </div>
  );
}