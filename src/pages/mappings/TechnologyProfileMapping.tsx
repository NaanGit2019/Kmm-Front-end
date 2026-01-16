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
import { Plus, Trash2, UserCircle } from 'lucide-react';
import { mockTechnologies, mockProfiles, mockTechnologyProfiles } from '@/data/mockData';
import type { MapTechnologyProfile } from '@/types';
import { toast } from 'sonner';

export default function TechnologyProfileMapping() {
  const [mappings, setMappings] = useState<MapTechnologyProfile[]>(mockTechnologyProfiles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const [filterProfile, setFilterProfile] = useState<string>('all');

  const handleAdd = () => {
    if (!selectedTechnology || !selectedProfile) {
      toast.error('Please select both technology and profile');
      return;
    }

    const techId = parseInt(selectedTechnology);
    const profileId = parseInt(selectedProfile);

    const exists = mappings.some(m => m.technologyId === techId && m.profileId === profileId);
    if (exists) {
      toast.error('This mapping already exists');
      return;
    }

    const newMapping: MapTechnologyProfile = {
      id: Math.max(...mappings.map(m => m.id)) + 1,
      technologyId: techId,
      profileId: profileId,
      isactive: true,
    };

    setMappings([...mappings, newMapping]);
    setIsDialogOpen(false);
    setSelectedTechnology('');
    setSelectedProfile('');
    toast.success('Mapping added successfully');
  };

  const handleDelete = (id: number) => {
    setMappings(mappings.filter(m => m.id !== id));
    toast.success('Mapping removed');
  };

  const filteredMappings = filterProfile === 'all' 
    ? mappings 
    : mappings.filter(m => m.profileId === parseInt(filterProfile));

  // Group mappings by profile
  const groupedMappings = filteredMappings.reduce((acc, mapping) => {
    const profile = mockProfiles.find(p => p.id === mapping.profileId);
    const profileTitle = profile?.title || 'Unknown';
    if (!acc[profileTitle]) {
      acc[profileTitle] = { profile, technologies: [] };
    }
    const tech = mockTechnologies.find(t => t.id === mapping.technologyId);
    if (tech) {
      acc[profileTitle].technologies.push({ ...tech, mappingId: mapping.id });
    }
    return acc;
  }, {} as Record<string, { profile: typeof mockProfiles[0] | undefined; technologies: (typeof mockTechnologies[0] & { mappingId: number })[] }>);

  return (
    <div className="min-h-screen">
      <Header 
        title="Technology-Profile Mapping" 
        subtitle="Define which technologies each profile requires"
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
            Add Mapping
          </Button>
        </div>

        {/* Mappings Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupedMappings).map(([profileTitle, data]) => (
            <div key={profileTitle} className="bg-card rounded-xl border border-border p-5 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UserCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{profileTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    {data.technologies.length} technologies
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.technologies.map(tech => (
                  <div 
                    key={tech.mappingId}
                    className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full group"
                  >
                    <span className="text-sm text-foreground">{tech.title}</span>
                    <span className="text-xs text-muted-foreground">({tech.type})</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDelete(tech.mappingId)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                {data.technologies.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">No technologies linked</p>
                )}
              </div>
            </div>
          ))}
          
          {Object.keys(groupedMappings).length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No mappings found. Click "Add Mapping" to create one.
            </div>
          )}
        </div>
      </div>

      {/* Add Mapping Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Technology-Profile Mapping</DialogTitle>
            <DialogDescription>
              Define which technology is required for a profile
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
              <label className="text-sm font-medium">Technology</label>
              <Select value={selectedTechnology} onValueChange={setSelectedTechnology}>
                <SelectTrigger>
                  <SelectValue placeholder="Select technology" />
                </SelectTrigger>
                <SelectContent>
                  {mockTechnologies.filter(t => t.isactive).map(tech => (
                    <SelectItem key={tech.id} value={tech.id.toString()}>
                      {tech.title} ({tech.type})
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
            <Button onClick={handleAdd}>Add Mapping</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
