import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../Header";
import { Sidebar } from "@design-system";
import { LayoutDashboard, FolderKanban } from "lucide-react";

export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar MenuOptions={[
          // {
          //   label: "Dashboard",
          //   icon: LayoutDashboard,
          //   onClick: () => {
          //     navigate("/");
          //   },
          // },
          {
            label: "Projetos",
            icon: FolderKanban,
            onClick: () => {
              navigate("/projetos");
            },
          },
        ]} />
        <main className="flex-1 overflow-y-auto p-6"><Outlet /></main>
      </div>
    </div>
  );
}