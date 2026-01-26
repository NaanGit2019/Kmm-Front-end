import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { 
  useGrades, 
  useSkills, 
  useSubskills, 
  useProfiles,
  useUsers,
  useSkillMaps,
  useProfileUsers,
  useTechnologyProfiles,
  useTechnologySkills,
  useTechnologies,
  useSkillMapMutation
} from '@/hooks/useApi';
import { 
  EmployeeSelector, 
  EmployeeInfoCard, 
  GradeLegend, 
  StatsCards, 
  TechnologyTabs 
} from '@/components/employee-grades';
import type { MapSkillmap } from '@/types';

export default function EmployeeGrades() {
  // Fetch all data
  const { data: grades = [], isLoading: gradesLoading } = useGrades();
  const { data: skills = [], isLoading: skillsLoading } = useSkills();
  const { data: subskills = [], isLoading: subskillsLoading } = useSubskills();
  const { data: profiles = [], isLoading: profilesLoading } = useProfiles();
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { data: skillMaps = [], isLoading: skillMapsLoading } = useSkillMaps();
  const { data: profileUsers = [], isLoading: profileUsersLoading } = useProfileUsers();
  const { data: technologyProfiles = [], isLoading: techProfilesLoading } = useTechnologyProfiles();
  const { data: technologySkills = [], isLoading: techSkillsLoading } = useTechnologySkills();
  const { data: technologies = [], isLoading: techLoading } = useTechnologies();
  const { insertUpdate } = useSkillMapMutation();

  const isLoading = gradesLoading || skillsLoading || subskillsLoading || profilesLoading || 
                    usersLoading || skillMapsLoading || profileUsersLoading || 
                    techProfilesLoading || techSkillsLoading || techLoading;

  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [pendingChanges, setPendingChanges] = useState<Map<number, number>>(new Map());
  const [hasChanges, setHasChanges] = useState(false);

  // Get user's profile
  const userProfile = useMemo(() => 
    profileUsers.find(pu => pu.userId === selectedUserId),
    [profileUsers, selectedUserId]
  );

  const profile = useMemo(() => 
    userProfile ? profiles.find(p => p.id === userProfile.profileId) : null,
    [profiles, userProfile]
  );

  // Get technologies for user's profile (hierarchical: User → Profile → Technologies)
  const userTechnologies = useMemo(() => {
    if (!userProfile) return [];
    const techIds = technologyProfiles
      .filter(tp => tp.profileId === userProfile.profileId)
      .map(tp => tp.technologyId);
    return technologies.filter(t => techIds.includes(t.id) && t.isactive);
  }, [technologyProfiles, technologies, userProfile]);

  // Get user's skill maps
  const userSkillMaps = useMemo(() => 
    skillMaps.filter(sm => sm.userId === selectedUserId),
    [skillMaps, selectedUserId]
  );

  // Calculate total subskills for all assigned technologies
  const totalSubskills = useMemo(() => {
    const techSkillIds = technologySkills
      .filter(ts => userTechnologies.some(t => t.id === ts.technologyId))
      .map(ts => ts.skillId);
    
    return subskills.filter(ss => 
      techSkillIds.includes(ss.skillId) && ss.isactive
    ).length;
  }, [technologySkills, userTechnologies, subskills]);

  // Get grade for a subskill (check pending first, then existing)
  const getGradeForSubskill = (subskillId: number) => {
    if (pendingChanges.has(subskillId)) {
      return pendingChanges.get(subskillId) || 0;
    }
    const mapping = userSkillMaps.find(sm => sm.subskillId === subskillId);
    return mapping?.gradeid || 0;
  };

  const handleGradeChange = (subskillId: number, gradeId: number) => {
    setHasChanges(true);
    const newPendingChanges = new Map(pendingChanges);
    newPendingChanges.set(subskillId, gradeId);
    setPendingChanges(newPendingChanges);
  };

  const handleUserChange = (userId: number) => {
    setSelectedUserId(userId);
    setHasChanges(false);
    setPendingChanges(new Map());
  };

  const handleSave = async () => {
    const promises: Promise<void>[] = [];
    
    pendingChanges.forEach((gradeId, subskillId) => {
      const existingMapping = userSkillMaps.find(sm => sm.subskillId === subskillId);
      
      const data: MapSkillmap = {
        id: existingMapping?.id || 0,
        subskillId,
        userId: selectedUserId,
        gradeid: gradeId,
        isactive: true
      };
      
      promises.push(
        new Promise((resolve, reject) => {
          insertUpdate.mutate(data, {
            onSuccess: () => resolve(),
            onError: (error) => reject(error)
          });
        })
      );
    });

    try {
      await Promise.all(promises);
      toast.success('Employee grades saved successfully!');
      setHasChanges(false);
      setPendingChanges(new Map());
    } catch (error) {
      toast.error('Failed to save some grades');
    }
  };

  const calculateAverageGrade = () => {
    const allGrades = [...userSkillMaps.map(sm => sm.gradeid || 0)];
    pendingChanges.forEach((grade) => allGrades.push(grade));
    const validGrades = allGrades.filter(g => g > 0);
    if (validGrades.length === 0) return '0';
    const total = validGrades.reduce((acc, grade) => acc + grade, 0);
    return (total / validGrades.length).toFixed(1);
  };

  const selectedUser = users.find(u => u.id === selectedUserId);
  const skillsGradedCount = userSkillMaps.length + pendingChanges.size;

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Header title="Employee Grades" subtitle="Apply and manage competency grades for individual employees" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header 
        title="Employee Grades" 
        subtitle="Apply and manage competency grades for individual employees"
      />

      {/* Employee Selection */}
      <div className="grid gap-4 md:grid-cols-3">
        <EmployeeSelector
          users={users}
          selectedUserId={selectedUserId}
          onUserChange={handleUserChange}
        />

        {selectedUser && (
          <>
            <div className="md:col-span-2">
              <GradeLegend grades={grades} />
            </div>
          </>
        )}
      </div>

      {/* Employee Info and Stats */}
      {selectedUser && (
        <>
          <EmployeeInfoCard
            user={selectedUser}
            profile={profile}
            hasChanges={hasChanges}
            isSaving={insertUpdate.isPending}
            onSave={handleSave}
          />

          <StatsCards
            skillsGraded={skillsGradedCount}
            totalSkills={totalSubskills}
            averageGrade={calculateAverageGrade()}
            technologiesCount={userTechnologies.length}
          />

          {/* Technology Tabs with Skills */}
          <TechnologyTabs
            technologies={userTechnologies}
            technologySkills={technologySkills}
            skills={skills}
            subskills={subskills}
            grades={grades}
            getGradeForSubskill={getGradeForSubskill}
            onGradeChange={handleGradeChange}
          />
        </>
      )}
    </div>
  );
}
