import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Technologies from "./pages/Technologies";
import Skills from "./pages/Skills";
import Profiles from "./pages/Profiles";
import Grades from "./pages/Grades";
import SkillMatrix from "./pages/SkillMatrix";
import Employees from "./pages/Employees";
import TechnologySkillMapping from "./pages/mappings/TechnologySkillMapping";
import TechnologyProfileMapping from "./pages/mappings/TechnologyProfileMapping";
import ProfileUserMapping from "./pages/mappings/ProfileUserMapping";
import EmployeeSkillMapping from "./pages/mappings/EmployeeSkillMapping";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><MainLayout><Index /></MainLayout></ProtectedRoute>} />
            <Route path="/technologies" element={<ProtectedRoute requireManager><MainLayout><Technologies /></MainLayout></ProtectedRoute>} />
            <Route path="/skills" element={<ProtectedRoute requireManager><MainLayout><Skills /></MainLayout></ProtectedRoute>} />
            <Route path="/profiles" element={<ProtectedRoute requireManager><MainLayout><Profiles /></MainLayout></ProtectedRoute>} />
            <Route path="/grades" element={<ProtectedRoute requireManager><MainLayout><Grades /></MainLayout></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute requireManager><MainLayout><Employees /></MainLayout></ProtectedRoute>} />
            <Route path="/matrix" element={<ProtectedRoute><MainLayout><SkillMatrix /></MainLayout></ProtectedRoute>} />
            <Route path="/mappings/tech-skills" element={<ProtectedRoute requireManager><MainLayout><TechnologySkillMapping /></MainLayout></ProtectedRoute>} />
            <Route path="/mappings/tech-profiles" element={<ProtectedRoute requireManager><MainLayout><TechnologyProfileMapping /></MainLayout></ProtectedRoute>} />
            <Route path="/mappings/profile-users" element={<ProtectedRoute requireManager><MainLayout><ProfileUserMapping /></MainLayout></ProtectedRoute>} />
            <Route path="/mappings/employee-skills" element={<ProtectedRoute requireManager><MainLayout><EmployeeSkillMapping /></MainLayout></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
