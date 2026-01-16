import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Save, User, Edit2 } from 'lucide-react';
import { 
  mockEmployees, 
  mockSubskills, 
  mockSkills, 
  mockGrades, 
  mockSkillMaps,
  getSkillAverages,
  calculateAverageGrade 
} from '@/data/mockData';
import type { MapSkillmap } from '@/types';
import { toast } from 'sonner';

export default function EmployeeSkillMapping() {
  const [skillMaps, setSkillMaps] = useState<MapSkillmap[]>(mockSkillMaps);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [editingSubskill, setEditingSubskill] = useState<number | null>(null);
  const [tempGrade, setTempGrade] = useState<string>('');

  const selectedEmployeeData = selectedEmployee 
    ? mockEmployees.find(e => e.id === parseInt(selectedEmployee))
    : null;

  const employeeSkillMaps = selectedEmployee 
    ? skillMaps.filter(sm => sm.userId === parseInt(selectedEmployee))
    : [];

  // Get skills with their subskills and current grades
  const skillsWithGrades = mockSkills.map(skill => {
    const subskills = mockSubskills.filter(ss => ss.skillId === skill.id && ss.isactive);
    return {
      ...skill,
      subskills: subskills.map(ss => {
        const map = employeeSkillMaps.find(m => m.subskillId === ss.id);
        const grade = map ? mockGrades.find(g => g.id === map.gradeid) : null;
        return {
          ...ss,
          mapId: map?.id,
          gradeId: map?.gradeid,
          grade,
        };
      }),
    };
  });

  const handleGradeChange = (subskillId: number, gradeId: number) => {
    const userId = parseInt(selectedEmployee);
    const existingMap = skillMaps.find(m => m.subskillId === subskillId && m.userId === userId);

    if (existingMap) {
      setSkillMaps(skillMaps.map(m => 
        m.id === existingMap.id ? { ...m, gradeid: gradeId } : m
      ));
    } else {
      const newMap: MapSkillmap = {
        id: Math.max(0, ...skillMaps.map(m => m.id)) + 1,
        subskillId,
        userId,
        gradeid: gradeId,
        isactive: true,
      };
      setSkillMaps([...skillMaps, newMap]);
    }

    setEditingSubskill(null);
    toast.success('Grade updated');
  };

  const getGradeColor = (gradeId: number | undefined) => {
    if (!gradeId) return 'bg-secondary text-muted-foreground';
    if (gradeId >= 4) return 'bg-green-500/20 text-green-600';
    if (gradeId >= 3) return 'bg-blue-500/20 text-blue-600';
    if (gradeId >= 2) return 'bg-yellow-500/20 text-yellow-600';
    return 'bg-red-500/20 text-red-600';
  };

  const avgGrade = selectedEmployee ? calculateAverageGrade(parseInt(selectedEmployee)) : 0;
  const skillAverages = selectedEmployee ? getSkillAverages(parseInt(selectedEmployee)) : [];

  return (
    <div className="min-h-screen">
      <Header 
        title="Employee Skill Mapping" 
        subtitle="Assign and manage skill grades for employees"
      />
      
      <div className="p-6 space-y-6">
        {/* Employee Selection */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {selectedEmployeeData?.name || 'Select an Employee'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedEmployeeData?.profile?.title || 'Choose from the dropdown'}
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              {selectedEmployeeData && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">L{avgGrade.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">Average Grade</p>
                </div>
              )}
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees.map(emp => (
                    <SelectItem key={emp.id} value={emp.id.toString()}>
                      {emp.name} - {emp.profile?.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Skill Summary */}
        {selectedEmployee && skillAverages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {skillAverages.map(sa => (
              <div key={sa.skillId} className="bg-card rounded-lg border border-border p-3 text-center">
                <p className="text-lg font-bold text-primary">L{sa.average}</p>
                <p className="text-xs text-muted-foreground truncate">{sa.skillTitle}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills Table */}
        {selectedEmployee ? (
          <div className="space-y-6">
            {skillsWithGrades.map(skill => (
              <div key={skill.id} className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
                <div className="bg-secondary/50 px-5 py-3 border-b border-border">
                  <h4 className="font-semibold text-foreground">{skill.title}</h4>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Subskill</TableHead>
                      <TableHead>Current Grade</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skill.subskills.map(ss => (
                      <TableRow key={ss.id}>
                        <TableCell className="font-medium">{ss.title}</TableCell>
                        <TableCell>
                          {editingSubskill === ss.id ? (
                            <Select 
                              value={tempGrade || ss.gradeId?.toString() || ''} 
                              onValueChange={(val) => handleGradeChange(ss.id, parseInt(val))}
                            >
                              <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Select grade" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockGrades.filter(g => g.isactive).map(grade => (
                                  <SelectItem key={grade.id} value={grade.id.toString()}>
                                    {grade.gradelevel} - {grade.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge className={getGradeColor(ss.gradeId)}>
                              {ss.grade ? `${ss.grade.gradelevel} - ${ss.grade.title}` : 'Not Rated'}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {editingSubskill === ss.id ? (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingSubskill(null)}
                            >
                              Cancel
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setEditingSubskill(ss.id);
                                setTempGrade(ss.gradeId?.toString() || '');
                              }}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <User className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Select an employee to view and edit their skill grades
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
