import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/ui/stat-card';
import { Cpu, Layers, Users, Award, TrendingUp, Activity, UserCircle } from 'lucide-react';
import { dashboardStats, mockTechnologies, mockSkills, mockProfiles, mockEmployees, getSkillAverages, mockGrades, getEmployeeSkillMaps, mockSubskills } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const technologyTypeData = [
  { name: 'Frontend', count: mockTechnologies.filter(t => t.type === 'Frontend').length },
  { name: 'Backend', count: mockTechnologies.filter(t => t.type === 'Backend').length },
  { name: 'Database', count: mockTechnologies.filter(t => t.type === 'Database').length },
  { name: 'Cloud', count: mockTechnologies.filter(t => t.type === 'Cloud').length },
  { name: 'DevOps', count: mockTechnologies.filter(t => t.type === 'DevOps').length },
];

const CHART_COLORS = [
  'hsl(217, 91%, 35%)',
  'hsl(174, 62%, 40%)',
  'hsl(142, 71%, 45%)',
  'hsl(38, 92%, 50%)',
  'hsl(262, 83%, 58%)',
  'hsl(0, 84%, 60%)',
];

// Manager Dashboard Component
function ManagerDashboard() {
  const skillDistribution = [
    { name: 'Component Dev', value: 25 },
    { name: 'State Mgmt', value: 20 },
    { name: 'API Integration', value: 18 },
    { name: 'Database', value: 15 },
    { name: 'Testing', value: 12 },
    { name: 'CI/CD', value: 10 },
  ];

  const employeePerformance = mockEmployees.map(emp => ({
    name: emp.name.split(' ')[0],
    avgLevel: emp.averageSkillLevel || 0,
    profile: emp.profile?.title || 'N/A',
  }));

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Employees"
          value={dashboardStats.totalEmployees}
          icon={Users}
          trend={{ value: 3, label: 'new this month' }}
        />
        <StatCard
          title="Technologies"
          value={dashboardStats.totalTechnologies}
          icon={Cpu}
          trend={{ value: 12, label: 'from last month' }}
        />
        <StatCard
          title="Skills"
          value={dashboardStats.totalSkills}
          icon={Layers}
          trend={{ value: 8, label: 'from last month' }}
        />
        <StatCard
          title="Profiles"
          value={dashboardStats.totalProfiles}
          icon={UserCircle}
          trend={{ value: 5, label: 'from last month' }}
        />
        <StatCard
          title="Grades"
          value={dashboardStats.totalGrades}
          icon={Award}
          trend={{ value: 0, label: 'no change' }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Performance Chart */}
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Employee Skill Levels</h3>
              <p className="text-sm text-muted-foreground">Average competency by employee</p>
            </div>
            <Activity className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employeePerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  domain={[0, 5]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  dataKey="name" 
                  type="category"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  width={80}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`Level ${value}`, 'Avg Skill']}
                />
                <Bar 
                  dataKey="avgLevel" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Distribution Pie Chart */}
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Skill Distribution</h3>
              <p className="text-sm text-muted-foreground">Team competency breakdown</p>
            </div>
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {skillDistribution.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={CHART_COLORS[index % CHART_COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Technology Distribution */}
      <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Technologies by Type</h3>
            <p className="text-sm text-muted-foreground">Distribution across categories</p>
          </div>
          <Cpu className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={technologyTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-foreground mb-4">Team Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockEmployees.slice(0, 6).map((emp) => (
            <div 
              key={emp.id}
              className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">{emp.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{emp.name}</p>
                <p className="text-sm text-muted-foreground truncate">{emp.profile?.title}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-primary">L{emp.averageSkillLevel?.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Avg</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Employee Dashboard Component
function EmployeeDashboard() {
  const { user } = useAuth();
  const userId = user?.id || 2; // Default to mock employee ID
  
  const skillAverages = getSkillAverages(userId);
  const employeeSkillMaps = getEmployeeSkillMaps(userId);
  const profile = mockProfiles.find(p => p.id === user?.profileId);
  
  // Prepare radar chart data
  const radarData = skillAverages.map(sa => ({
    skill: sa.skillTitle,
    level: sa.average,
    fullMark: 5,
  }));

  // Get detailed skill breakdown
  const skillBreakdown = mockSkills.map(skill => {
    const subskills = mockSubskills.filter(ss => ss.skillId === skill.id);
    const userSubskills = subskills.map(ss => {
      const map = employeeSkillMaps.find(m => m.subskillId === ss.id);
      const grade = map ? mockGrades.find(g => g.id === map.gradeid) : null;
      return {
        ...ss,
        grade,
        gradeId: map?.gradeid,
      };
    });
    const avgGrade = userSubskills.filter(ss => ss.gradeId).reduce((sum, ss) => sum + (ss.gradeId || 0), 0) / 
      (userSubskills.filter(ss => ss.gradeId).length || 1);
    return {
      ...skill,
      subskills: userSubskills,
      averageGrade: Math.round(avgGrade * 10) / 10,
    };
  }).filter(skill => skill.subskills.some(ss => ss.gradeId));

  const overallAverage = skillAverages.length > 0 
    ? (skillAverages.reduce((sum, sa) => sum + sa.average, 0) / skillAverages.length).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">
              {user?.name?.charAt(0) || 'E'}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-foreground">{user?.name || 'Employee'}</h2>
            <p className="text-muted-foreground">{profile?.title || 'Developer'}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">L{overallAverage}</p>
            <p className="text-sm text-muted-foreground">Overall Level</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Skills Assessed"
          value={skillAverages.length}
          icon={Layers}
        />
        <StatCard
          title="Subskills Rated"
          value={employeeSkillMaps.length}
          icon={Award}
        />
        <StatCard
          title="Avg Grade Level"
          value={overallAverage}
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Radar */}
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">Skill Radar</h3>
          <div className="h-[300px]">
            {radarData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis 
                    dataKey="skill" 
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 5]} 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Radar
                    name="Level"
                    dataKey="level"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No skill data available
              </div>
            )}
          </div>
        </div>

        {/* Skill Levels Bar Chart */}
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">Skill Levels</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillAverages} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  type="number" 
                  domain={[0, 5]}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  dataKey="skillTitle" 
                  type="category"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  width={100}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`Level ${value}`, 'Average']}
                />
                <Bar 
                  dataKey="average" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Skill Breakdown */}
      <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
        <h3 className="text-lg font-semibold text-foreground mb-4">Detailed Skill Breakdown</h3>
        <div className="space-y-4">
          {skillBreakdown.map(skill => (
            <div key={skill.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{skill.title}</h4>
                <span className="text-sm font-semibold text-primary">Avg: L{skill.averageGrade}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {skill.subskills.filter(ss => ss.gradeId).map(ss => (
                  <div 
                    key={ss.id}
                    className="flex items-center justify-between px-3 py-2 bg-secondary/50 rounded-md"
                  >
                    <span className="text-sm text-foreground truncate">{ss.title}</span>
                    <span className={`text-xs font-semibold ml-2 px-2 py-0.5 rounded ${
                      (ss.gradeId || 0) >= 4 ? 'bg-green-500/20 text-green-600' :
                      (ss.gradeId || 0) >= 3 ? 'bg-blue-500/20 text-blue-600' :
                      (ss.gradeId || 0) >= 2 ? 'bg-yellow-500/20 text-yellow-600' :
                      'bg-red-500/20 text-red-600'
                    }`}>
                      {ss.grade?.gradelevel || `L${ss.gradeId}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { isManager, user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header 
        title={isManager ? "Manager Dashboard" : "My Dashboard"} 
        subtitle={isManager ? "Overview of team performance and knowledge matrix" : `Welcome back, ${user?.name || 'Employee'}`}
      />
      
      <div className="p-6">
        {isManager ? <ManagerDashboard /> : <EmployeeDashboard />}
      </div>
    </div>
  );
}
