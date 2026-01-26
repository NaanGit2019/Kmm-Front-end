import type { Grade, Profile, Technology, Skill, Subskill, MapTechnologySkill, MapTechnologyProfile, MapProfileUser, MapSkillmap } from '@/types';
import type { User } from '@/types/user';

// Mock Users
export const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@company.com', department: 'Engineering', isactive: true },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@company.com', department: 'Design', isactive: true },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@company.com', department: 'Engineering', isactive: true },
  { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@company.com', department: 'QA', isactive: true },
];

// Mock Profiles
export const mockProfiles: Profile[] = [
  { id: 1, title: 'Full Stack Developer', isactive: true },
  { id: 2, title: 'Frontend Developer', isactive: true },
  { id: 3, title: 'Backend Developer', isactive: true },
  { id: 4, title: 'QA Engineer', isactive: true },
];

// Mock Technologies
export const mockTechnologies: Technology[] = [
  { id: 1, title: 'React', type: 'Frontend', isactive: true },
  { id: 2, title: 'Node.js', type: 'Backend', isactive: true },
  { id: 3, title: 'TypeScript', type: 'Language', isactive: true },
  { id: 4, title: '.NET', type: 'Backend', isactive: true },
  { id: 5, title: 'SQL Server', type: 'Database', isactive: true },
];

// Mock Grades
export const mockGrades: Grade[] = [
  { id: 1, title: 'Beginner', gradelevel: 'L1', isactive: true },
  { id: 2, title: 'Intermediate', gradelevel: 'L2', isactive: true },
  { id: 3, title: 'Advanced', gradelevel: 'L3', isactive: true },
  { id: 4, title: 'Expert', gradelevel: 'L4', isactive: true },
  { id: 5, title: 'Master', gradelevel: 'L5', isactive: true },
];

// Mock Skills
export const mockSkills: Skill[] = [
  { id: 1, title: 'Component Development', isactive: true },
  { id: 2, title: 'State Management', isactive: true },
  { id: 3, title: 'API Integration', isactive: true },
  { id: 4, title: 'Database Design', isactive: true },
  { id: 5, title: 'Testing', isactive: true },
  { id: 6, title: 'Performance Optimization', isactive: true },
];

// Mock Subskills
export const mockSubskills: Subskill[] = [
  // Component Development subskills
  { id: 1, skillId: 1, title: 'Functional Components', isactive: true },
  { id: 2, skillId: 1, title: 'Class Components', isactive: true },
  { id: 3, skillId: 1, title: 'Custom Hooks', isactive: true },
  { id: 4, skillId: 1, title: 'HOC Patterns', isactive: true },
  // State Management subskills
  { id: 5, skillId: 2, title: 'useState/useReducer', isactive: true },
  { id: 6, skillId: 2, title: 'Context API', isactive: true },
  { id: 7, skillId: 2, title: 'Redux/Zustand', isactive: true },
  { id: 8, skillId: 2, title: 'React Query', isactive: true },
  // API Integration subskills
  { id: 9, skillId: 3, title: 'REST APIs', isactive: true },
  { id: 10, skillId: 3, title: 'GraphQL', isactive: true },
  { id: 11, skillId: 3, title: 'WebSockets', isactive: true },
  // Database Design subskills
  { id: 12, skillId: 4, title: 'Schema Design', isactive: true },
  { id: 13, skillId: 4, title: 'Normalization', isactive: true },
  { id: 14, skillId: 4, title: 'Indexing', isactive: true },
  { id: 15, skillId: 4, title: 'Query Optimization', isactive: true },
  // Testing subskills
  { id: 16, skillId: 5, title: 'Unit Testing', isactive: true },
  { id: 17, skillId: 5, title: 'Integration Testing', isactive: true },
  { id: 18, skillId: 5, title: 'E2E Testing', isactive: true },
  // Performance subskills
  { id: 19, skillId: 6, title: 'Code Splitting', isactive: true },
  { id: 20, skillId: 6, title: 'Memoization', isactive: true },
  { id: 21, skillId: 6, title: 'Lazy Loading', isactive: true },
];

// Mock Profile-User mappings
export const mockProfileUsers: MapProfileUser[] = [
  { id: 1, userId: 1, profileId: 1, isactive: true }, // John -> Full Stack
  { id: 2, userId: 2, profileId: 2, isactive: true }, // Jane -> Frontend
  { id: 3, userId: 3, profileId: 3, isactive: true }, // Mike -> Backend
  { id: 4, userId: 4, profileId: 4, isactive: true }, // Sarah -> QA
];

// Mock Technology-Profile mappings
export const mockTechnologyProfiles: MapTechnologyProfile[] = [
  // Full Stack Developer gets React, Node.js, TypeScript, SQL Server
  { id: 1, profileId: 1, technologyId: 1, isactive: true },
  { id: 2, profileId: 1, technologyId: 2, isactive: true },
  { id: 3, profileId: 1, technologyId: 3, isactive: true },
  { id: 4, profileId: 1, technologyId: 5, isactive: true },
  // Frontend Developer gets React, TypeScript
  { id: 5, profileId: 2, technologyId: 1, isactive: true },
  { id: 6, profileId: 2, technologyId: 3, isactive: true },
  // Backend Developer gets Node.js, .NET, SQL Server
  { id: 7, profileId: 3, technologyId: 2, isactive: true },
  { id: 8, profileId: 3, technologyId: 4, isactive: true },
  { id: 9, profileId: 3, technologyId: 5, isactive: true },
  // QA Engineer gets React, TypeScript (for testing)
  { id: 10, profileId: 4, technologyId: 1, isactive: true },
  { id: 11, profileId: 4, technologyId: 3, isactive: true },
];

// Mock Technology-Skill mappings
export const mockTechnologySkills: MapTechnologySkill[] = [
  // React skills
  { id: 1, technologyId: 1, skillId: 1, isactive: true }, // Component Development
  { id: 2, technologyId: 1, skillId: 2, isactive: true }, // State Management
  { id: 3, technologyId: 1, skillId: 6, isactive: true }, // Performance
  // Node.js skills
  { id: 4, technologyId: 2, skillId: 3, isactive: true }, // API Integration
  { id: 5, technologyId: 2, skillId: 5, isactive: true }, // Testing
  // TypeScript skills
  { id: 6, technologyId: 3, skillId: 1, isactive: true }, // Component Development
  { id: 7, technologyId: 3, skillId: 5, isactive: true }, // Testing
  // .NET skills
  { id: 8, technologyId: 4, skillId: 3, isactive: true }, // API Integration
  { id: 9, technologyId: 4, skillId: 4, isactive: true }, // Database Design
  // SQL Server skills
  { id: 10, technologyId: 5, skillId: 4, isactive: true }, // Database Design
];

// Mock Skill Maps (existing grades for users)
export const mockSkillMaps: MapSkillmap[] = [
  // John's grades
  { id: 1, userId: 1, subskillId: 1, gradeid: 4, isactive: true },
  { id: 2, userId: 1, subskillId: 2, gradeid: 3, isactive: true },
  { id: 3, userId: 1, subskillId: 5, gradeid: 4, isactive: true },
  { id: 4, userId: 1, subskillId: 9, gradeid: 3, isactive: true },
  // Jane's grades
  { id: 5, userId: 2, subskillId: 1, gradeid: 5, isactive: true },
  { id: 6, userId: 2, subskillId: 3, gradeid: 4, isactive: true },
  { id: 7, userId: 2, subskillId: 6, gradeid: 3, isactive: true },
];
