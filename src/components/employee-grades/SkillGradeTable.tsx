import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Minus, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import type { Grade, Skill, Subskill } from '@/types';

interface SkillWithSubskills extends Skill {
  subskills: Subskill[];
}

interface SkillGradeTableProps {
  skills: SkillWithSubskills[];
  grades: Grade[];
  getGradeForSubskill: (subskillId: number) => number;
  onGradeChange: (subskillId: number, gradeId: number) => void;
}

const getGradeColor = (gradeIndex: number) => {
  const colors = [
    'bg-chart-1/20 text-chart-1 border-chart-1/30',
    'bg-chart-2/20 text-chart-2 border-chart-2/30',
    'bg-chart-3/20 text-chart-3 border-chart-3/30',
    'bg-chart-4/20 text-chart-4 border-chart-4/30',
    'bg-chart-5/20 text-chart-5 border-chart-5/30',
  ];
  return colors[gradeIndex % colors.length];
};

export function SkillGradeTable({ skills, grades, getGradeForSubskill, onGradeChange }: SkillGradeTableProps) {
  const activeGrades = grades.filter(g => g.isactive);
  const [expandedSkills, setExpandedSkills] = useState<number[]>([]);

  const toggleSkill = (skillId: number) => {
    setExpandedSkills(prev =>
      prev.includes(skillId) ? prev.filter(id => id !== skillId) : [...prev, skillId]
    );
  };

  if (skills.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">
            No skills found for the selected technology.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left p-3 md:p-4 font-semibold text-foreground min-w-[160px] md:min-w-[200px] sticky left-0 bg-secondary/50 z-10">
                Skill / Sub-skill
              </th>
              {activeGrades.map((grade, index) => (
                <th key={grade.id} className="p-2 md:p-4 text-center min-w-[60px] md:min-w-[100px]">
                  <Badge
                    variant="outline"
                    className={cn("text-[10px] md:text-xs", getGradeColor(index))}
                  >
                    {grade.gradelevel}
                  </Badge>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {skills.map((skill) => {
              const isExpanded = expandedSkills.includes(skill.id);
              const gradedCount = skill.subskills.filter(ss => getGradeForSubskill(ss.id) > 0).length;

              return (
                <Collapsible key={`skill-${skill.id}`} open={isExpanded} onOpenChange={() => toggleSkill(skill.id)} asChild>
                  <>
                    {/* Skill Row (Header) - clickable toggle */}
                    <CollapsibleTrigger asChild>
                      <tr className="bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors">
                        <td className="p-3 md:p-4 font-semibold text-foreground sticky left-0 bg-muted/30 z-10">
                          <div className="flex items-center gap-2">
                            <ChevronRight className={cn(
                              "w-4 h-4 transition-transform shrink-0",
                              isExpanded && "rotate-90"
                            )} />
                            <span className="text-sm md:text-base">{skill.title}</span>
                            <Badge variant="secondary" className="text-[10px] md:text-xs">
                              {gradedCount}/{skill.subskills.length}
                            </Badge>
                          </div>
                        </td>
                        {activeGrades.map((grade) => (
                          <td key={grade.id} className="p-2 md:p-4 text-center">
                            <Minus className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground/30 mx-auto" />
                          </td>
                        ))}
                      </tr>
                    </CollapsibleTrigger>

                    {/* Subskill Rows - only visible when expanded */}
                    <CollapsibleContent asChild>
                      <>
                        {skill.subskills.map((subskill) => {
                          const currentGradeId = getGradeForSubskill(subskill.id);

                          return (
                            <tr
                              key={`subskill-${subskill.id}`}
                              className="hover:bg-secondary/30 transition-colors"
                            >
                              <td className="p-3 md:p-4 pl-10 md:pl-12 text-muted-foreground text-sm sticky left-0 bg-card z-10">
                                {subskill.title}
                              </td>
                              {activeGrades.map((grade, index) => {
                                const isSelected = currentGradeId === grade.id;

                                return (
                                  <td key={grade.id} className="p-2 md:p-4 text-center">
                                    <button
                                      onClick={() => onGradeChange(subskill.id, isSelected ? 0 : grade.id)}
                                      className={cn(
                                        "w-7 h-7 md:w-8 md:h-8 rounded-lg border-2 transition-all duration-200 mx-auto",
                                        "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50",
                                        isSelected
                                          ? cn(getGradeColor(index), "border-2")
                                          : "border-border bg-background hover:border-muted-foreground/50"
                                      )}
                                    >
                                      {isSelected && (
                                        <Check className="w-3 h-3 md:w-4 md:h-4 mx-auto" />
                                      )}
                                    </button>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
