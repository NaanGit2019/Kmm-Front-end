import { Header } from '@/components/layout/Header';
import { mockEmployees, mockProfiles, calculateAverageGrade } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Employees() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Header title="Employees" subtitle="Manage team members and their skill assessments" />
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockEmployees.map(emp => {
            const avgGrade = calculateAverageGrade(emp.id);
            return (
              <div key={emp.id} className="bg-card rounded-xl border border-border p-5 animate-fade-in">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-foreground">{emp.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{emp.name}</h3>
                    <p className="text-sm text-muted-foreground">{emp.email}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{emp.profile?.title}</Badge>
                  <span className="text-lg font-bold text-primary">L{avgGrade.toFixed(1)}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 gap-2"
                  onClick={() => navigate(`/mappings/employee-skills?employee=${emp.id}`)}
                >
                  <BarChart3 className="w-4 h-4" />
                  View Skills
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
