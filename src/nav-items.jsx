import { Gamepad2 } from "lucide-react";
import Index from "./pages/Index.jsx";

export const navItems = [
  {
    title: "Psychedelic 3D Game",
    to: "/",
    icon: <Gamepad2 className="h-4 w-4" />,
    page: <Index />,
  },
];