// Common fields for all entities
export interface CommonFields {
  id: number;
  isactive?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface Grade extends CommonFields {
  title?: string;
  gradelevel?: string;
}

export interface Profile extends CommonFields {
  title?: string;
}

export interface Technology extends CommonFields {
  title?: string;
  type?: string;
}

export interface Skill extends CommonFields {
  title?: string;
}

export interface Subskill extends CommonFields {
  skillId: number;
  title?: string;
  skill?: Skill;
}

export interface MapSkillmap extends CommonFields {
  subskillId: number;
  userId?: number;
  gradeid?: number;
  grade?: Grade;
  subskill?: Subskill;
}

export interface MapTechnologySkill extends CommonFields {
  technologyId: number;
  skillId: number;
  skill?: Skill;
  technology?: Technology;
}

export interface MapTechnologyProfile extends CommonFields {
  profileId: number;
  technologyId: number;
  profile?: Profile;
  technology?: Technology;
}

export interface MapProfileUser extends CommonFields {
  userId: number;
  profileId: number;
  profile?: Profile;
}

// User and Auth types
export type UserRole = 'manager' | 'employee';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  profileId?: number;
  profile?: Profile;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Employee type for manager view
export interface Employee extends User {
  department?: string;
  skillMaps?: MapSkillmap[];
  averageSkillLevel?: number;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
