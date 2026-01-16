import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
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
import { Plus, Trash2, User } from 'lucide-react';
import { mockProfiles, mockEmployees, mockProfileUsers } from '@/data/mockData';
import type { MapProfileUser } from '@/types';
import { toast } from 'sonner';

export default function ProfileUserMapping() {
  const [mappings, setMappings] = useState<MapProfileUser[]>(mockProfileUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [filterProfile, setFilterProfile] = useState<string>('all');

  const handleAdd = () => {
    if (!selectedProfile || !selectedEmployee) {
      toast.error('Please select both profile and employee');
      return;
    }

    const profileId = parseInt(selectedProfile);
    const userId = parseInt(selectedEmployee);

    const exists = mappings.some(m => m.profileId === profileId && m.userId === userId);
    if (exists) {
      toast.error('This mapping already exists');
      return;
    }

    const newMapping: MapProfileUser = {
      id: Math.max(...mappings.map(m => m.id)) + 1,
      profileId: profileId,
      userId: userId,
      isactive: true,
    };

    setMappings([...mappings, newMapping]);
    setIsDialogOpen(false);
    setSelectedProfile('');
    setSelectedEmployee('');
    toast.success('Employee assigned to profile');
  };

  const handleDelete = (id: number) => {
    setMappings(mappings.filter(m => m.id !== id));
    toast.success('Assignment removed');
  };

  const filteredMappings = filterProfile === 'all' 
    ? mappings 
    : mappings.filter(m => m.profileId === parseInt(filterProfile));

  // Group mappings by profile
  const groupedMappings = filteredMappings.reduce((acc, mapping) => {
    const profile = mockProfiles.find(p => p.id === mapping.profileId);
    const profileTitle = profile?.title || 'Unknown';
    if (!acc[profileTitle]) {
      acc[profileTitle] = { profile, employees: [] };
    }
    const employee = mockEmployees.find(e => e.id === mapping.userId);
    if (employee) {
      acc[profileTitle].employees.push({ ...employee, mappingId: mapping.id });
    }
    return acc;
  }, {} as Record<string, { profile: typeof mockProfiles[0] | undefined; employees: (typeof mockEmployees[0] & { mappingId: number })[] }>);

  return (
    <div className="min-h-screen">
      <Header 
        title="Profile-User Assignment" 
        subtitle="Assign employees to their job profiles"
      />
      
      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Select value={filterProfile} onValueChange={setFilterProfile}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Filter by profile" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Profiles</SelectItem>
              {mockProfiles.filter(p => p.isactive).map(profile => (
                <SelectItem key={profile.id} value={profile.id.toString()}>
                  {profile.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Assign Employee
          </Button>
        </div>

        {/* Mappings Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Object.entries(groupedMappings).map(([profileTitle, data]) => (
            <div key={profileTitle} className="bg-card rounded-xl border border-border p-5 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{profileTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    {data.employees.length} employee{data.employees.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {data.employees.map(emp => (
                  <div 
                    key={emp.mappingId}
                    className="flex items-center justify-between px-3 py-2 bg-secondary/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">{emp.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(emp.mappingId)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {data.employees.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">No employees assigned</p>
                )}
              </div>
            </div>
          ))}
          
          {Object.keys(groupedMappings).length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No assignments found. Click "Assign Employee" to create one.
            </div>
          )}
        </div>
      </div>

      {/* Add Mapping Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Employee to Profile</DialogTitle>
            <DialogDescription>
              Select a profile and an employee to assign
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Profile</label>
              <Select value={selectedProfile} onValueChange={setSelectedProfile}>
                <SelectTrigger>
                  <SelectValue placeholder="Select profile" />
                </SelectTrigger>
                <SelectContent>
                  {mockProfiles.filter(p => p.isactive).map(profile => (
                    <SelectItem key={profile.id} value={profile.id.toString()}>
                      {profile.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Employee</label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {mockEmployees.map(emp => (
                    <SelectItem key={emp.id} value={emp.id.toString()}>
                      {emp.name} ({emp.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
