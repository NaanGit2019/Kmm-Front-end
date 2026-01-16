import type { Grade, Profile, Technology, Skill, Subskill, MapTechnologySkill, MapSkillmap, Employee, MapTechnologyProfile, MapProfileUser } from '@/types';

// Mock data for development - will be replaced with API calls
export const mockGrades: Grade[] = [
  { id: 1, title: 'Junior', gradelevel: 'L1', isactive: true, createdAt: '2024-01-15' },
  { id: 2, title: 'Mid-Level', gradelevel: 'L2', isactive: true, createdAt: '2024-01-15' },
  { id: 3, title: 'Senior', gradelevel: 'L3', isactive: true, createdAt: '2024-01-15' },
  { id: 4, title: 'Lead', gradelevel: 'L4', isactive: true, createdAt: '2024-01-15' },
  { id: 5, title: 'Principal', gradelevel: 'L5', isactive: false, createdAt: '2024-01-15' },
];

export const mockProfiles: Profile[] = [
  { id: 1, title: 'Frontend Developer', isactive: true, createdAt: '2024-01-10' },
  { id: 2, title: 'Backend Developer', isactive: true, createdAt: '2024-01-10' },
  { id: 3, title: 'Full Stack Developer', isactive: true, createdAt: '2024-01-10' },
  { id: 4, title: 'DevOps Engineer', isactive: true, createdAt: '2024-01-10' },
  { id: 5, title: 'QA Engineer', isactive: true, createdAt: '2024-01-10' },
  { id: 6, title: 'Data Engineer', isactive: false, createdAt: '2024-01-10' },
];

export const mockTechnologies: Technology[] = [
  { id: 1, title: 'React', type: 'Frontend', isactive: true, createdAt: '2024-01-05' },
  { id: 2, title: 'Angular', type: 'Frontend', isactive: true, createdAt: '2024-01-05' },
  { id: 3, title: '.NET Core', type: 'Backend', isactive: true, createdAt: '2024-01-05' },
  { id: 4, title: 'Node.js', type: 'Backend', isactive: true, createdAt: '2024-01-05' },
  { id: 5, title: 'PostgreSQL', type: 'Database', isactive: true, createdAt: '2024-01-05' },
  { id: 6, title: 'AWS', type: 'Cloud', isactive: true, createdAt: '2024-01-05' },
  { id: 7, title: 'Docker', type: 'DevOps', isactive: true, createdAt: '2024-01-05' },
  { id: 8, title: 'Kubernetes', type: 'DevOps', isactive: false, createdAt: '2024-01-05' },
];

export const mockSkills: Skill[] = [
  { id: 1, title: 'Component Development', isactive: true, createdAt: '2024-01-08' },
  { id: 2, title: 'State Management', isactive: true, createdAt: '2024-01-08' },
  { id: 3, title: 'API Integration', isactive: true, createdAt: '2024-01-08' },
  { id: 4, title: 'Database Design', isactive: true, createdAt: '2024-01-08' },
  { id: 5, title: 'Testing', isactive: true, createdAt: '2024-01-08' },
  { id: 6, title: 'CI/CD', isactive: true, createdAt: '2024-01-08' },
  { id: 7, title: 'Performance Optimization', isactive: true, createdAt: '2024-01-08' },
];

export const mockSubskills: Subskill[] = [
  { id: 1, skillId: 1, title: 'Functional Components', isactive: true },
  { id: 2, skillId: 1, title: 'Custom Hooks', isactive: true },
  { id: 3, skillId: 1, title: 'Component Patterns', isactive: true },
  { id: 4, skillId: 2, title: 'Redux', isactive: true },
  { id: 5, skillId: 2, title: 'Context API', isactive: true },
  { id: 6, skillId: 2, title: 'React Query', isactive: true },
  { id: 7, skillId: 3, title: 'REST APIs', isactive: true },
  { id: 8, skillId: 3, title: 'GraphQL', isactive: true },
  { id: 9, skillId: 4, title: 'Schema Design', isactive: true },
  { id: 10, skillId: 4, title: 'Query Optimization', isactive: true },
  { id: 11, skillId: 5, title: 'Unit Testing', isactive: true },
  { id: 12, skillId: 5, title: 'Integration Testing', isactive: true },
  { id: 13, skillId: 6, title: 'GitHub Actions', isactive: true },
  { id: 14, skillId: 6, title: 'Azure DevOps', isactive: true },
];

export const mockTechnologySkills: MapTechnologySkill[] = [
  { id: 1, technologyId: 1, skillId: 1, isactive: true },
  { id: 2, technologyId: 1, skillId: 2, isactive: true },
  { id: 3, technologyId: 1, skillId: 3, isactive: true },
  { id: 4, technologyId: 3, skillId: 3, isactive: true },
  { id: 5, technologyId: 3, skillId: 4, isactive: true },
  { id: 6, technologyId: 5, skillId: 4, isactive: true },
];

export const mockTechnologyProfiles: MapTechnologyProfile[] = [
  { id: 1, technologyId: 1, profileId: 1, isactive: true },
  { id: 2, technologyId: 2, profileId: 1, isactive: true },
  { id: 3, technologyId: 3, profileId: 2, isactive: true },
  { id: 4, technologyId: 4, profileId: 2, isactive: true },
  { id: 5, technologyId: 1, profileId: 3, isactive: true },
  { id: 6, technologyId: 3, profileId: 3, isactive: true },
  { id: 7, technologyId: 5, profileId: 3, isactive: true },
  { id: 8, technologyId: 7, profileId: 4, isactive: true },
  { id: 9, technologyId: 8, profileId: 4, isactive: true },
];

export const mockProfileUsers: MapProfileUser[] = [
  { id: 1, userId: 2, profileId: 1, isactive: true },
  { id: 2, userId: 3, profileId: 2, isactive: true },
  { id: 3, userId: 4, profileId: 3, isactive: true },
  { id: 4, userId: 5, profileId: 1, isactive: true },
  { id: 5, userId: 6, profileId: 4, isactive: true },
];

export const mockSkillMaps: MapSkillmap[] = [
  // Employee 2 (Jane Employee - Frontend Developer)
  { id: 1, subskillId: 1, userId: 2, gradeid: 3, isactive: true },
  { id: 2, subskillId: 2, userId: 2, gradeid: 2, isactive: true },
  { id: 3, subskillId: 3, userId: 2, gradeid: 3, isactive: true },
  { id: 4, subskillId: 4, userId: 2, gradeid: 2, isactive: true },
  { id: 5, subskillId: 5, userId: 2, gradeid: 3, isactive: true },
  { id: 6, subskillId: 7, userId: 2, gradeid: 4, isactive: true },
  // Employee 3 (Backend Developer)
  { id: 7, subskillId: 7, userId: 3, gradeid: 4, isactive: true },
  { id: 8, subskillId: 8, userId: 3, gradeid: 3, isactive: true },
  { id: 9, subskillId: 9, userId: 3, gradeid: 4, isactive: true },
  { id: 10, subskillId: 10, userId: 3, gradeid: 3, isactive: true },
  // Employee 4 (Full Stack)
  { id: 11, subskillId: 1, userId: 4, gradeid: 4, isactive: true },
  { id: 12, subskillId: 7, userId: 4, gradeid: 3, isactive: true },
  { id: 13, subskillId: 9, userId: 4, gradeid: 2, isactive: true },
  // Employee 5 (Frontend Developer)
  { id: 14, subskillId: 1, userId: 5, gradeid: 2, isactive: true },
  { id: 15, subskillId: 2, userId: 5, gradeid: 1, isactive: true },
  // Employee 6 (DevOps)
  { id: 16, subskillId: 13, userId: 6, gradeid: 4, isactive: true },
  { id: 17, subskillId: 14, userId: 6, gradeid: 3, isactive: true },
];

// Mock employees for manager view
export const mockEmployees: Employee[] = [
  { 
    id: 2, 
    email: 'jane@company.com', 
    name: 'Jane Employee', 
    role: 'employee', 
    profileId: 1,
    department: 'Engineering',
    profile: mockProfiles[0],
    averageSkillLevel: 2.8,
  },
  { 
    id: 3, 
    email: 'bob@company.com', 
    name: 'Bob Smith', 
    role: 'employee', 
    profileId: 2,
    department: 'Engineering',
    profile: mockProfiles[1],
    averageSkillLevel: 3.5,
  },
  { 
    id: 4, 
    email: 'alice@company.com', 
    name: 'Alice Johnson', 
    role: 'employee', 
    profileId: 3,
    department: 'Engineering',
    profile: mockProfiles[2],
    averageSkillLevel: 3.0,
  },
  { 
    id: 5, 
    email: 'charlie@company.com', 
    name: 'Charlie Brown', 
    role: 'employee', 
    profileId: 1,
    department: 'Engineering',
    profile: mockProfiles[0],
    averageSkillLevel: 1.5,
  },
  { 
    id: 6, 
    email: 'david@company.com', 
    name: 'David Wilson', 
    role: 'employee', 
    profileId: 4,
    department: 'Operations',
    profile: mockProfiles[3],
    averageSkillLevel: 3.5,
  },
];

// Dashboard stats
export const dashboardStats = {
  totalTechnologies: mockTechnologies.filter(t => t.isactive).length,
  totalSkills: mockSkills.filter(s => s.isactive).length,
  totalProfiles: mockProfiles.filter(p => p.isactive).length,
  totalGrades: mockGrades.filter(g => g.isactive).length,
  totalEmployees: mockEmployees.length,
};

// Helper function to get employee skill maps
export function getEmployeeSkillMaps(userId: number): MapSkillmap[] {
  return mockSkillMaps.filter(sm => sm.userId === userId);
}

// Helper to calculate average grade for an employee
export function calculateAverageGrade(userId: number): number {
  const maps = getEmployeeSkillMaps(userId);
  if (maps.length === 0) return 0;
  const total = maps.reduce((sum, m) => sum + (m.gradeid || 0), 0);
  return Math.round((total / maps.length) * 10) / 10;
}

// Helper to get skill averages for an employee
export function getSkillAverages(userId: number): { skillId: number; skillTitle: string; average: number }[] {
  const maps = getEmployeeSkillMaps(userId);
  const skillGroups: Record<number, { total: number; count: number; title: string }> = {};
  
  maps.forEach(map => {
    const subskill = mockSubskills.find(s => s.id === map.subskillId);
    if (subskill) {
      const skill = mockSkills.find(s => s.id === subskill.skillId);
      if (skill) {
        if (!skillGroups[skill.id]) {
          skillGroups[skill.id] = { total: 0, count: 0, title: skill.title || '' };
        }
        skillGroups[skill.id].total += map.gradeid || 0;
        skillGroups[skill.id].count += 1;
      }
    }
  });

  return Object.entries(skillGroups).map(([skillId, data]) => ({
    skillId: parseInt(skillId),
    skillTitle: data.title,
    average: Math.round((data.total / data.count) * 10) / 10,
  }));
}
