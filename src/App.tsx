import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Technologies from "./pages/Technologies";
import Skills from "./pages/Skills";
import Profiles from "./pages/Profiles";
import Grades from "./pages/Grades";
import SkillMatrix from "./pages/SkillMatrix";
import Mappings from "./pages/Mappings";
import EmployeeGrades from "./pages/EmployeeGrades";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<MainLayout><Index /></MainLayout>} path="/" />
          <Route path="/technologies" element={<MainLayout><Technologies /></MainLayout>} />
          <Route path="/skills" element={<MainLayout><Skills /></MainLayout>} />
          <Route path="/profiles" element={<MainLayout><Profiles /></MainLayout>} />
          <Route path="/grades" element={<MainLayout><Grades /></MainLayout>} />
          <Route path="/mappings" element={<MainLayout><Mappings /></MainLayout>} />
          <Route path="/employee-grades" element={<MainLayout><EmployeeGrades /></MainLayout>} />
          <Route path="/matrix" element={<MainLayout><SkillMatrix /></MainLayout>} />
          <Route path="/analytics" element={<MainLayout><Analytics /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
