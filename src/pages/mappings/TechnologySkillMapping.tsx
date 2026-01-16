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
import { Plus, Trash2, Link2 } from 'lucide-react';
import { mockTechnologies, mockSkills, mockTechnologySkills } from '@/data/mockData';
import type { MapTechnologySkill } from '@/types';
import { toast } from 'sonner';

export default function TechnologySkillMapping() {
  const [mappings, setMappings] = useState<MapTechnologySkill[]>(mockTechnologySkills);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [filterTech, setFilterTech] = useState<string>('all');

  const handleAdd = () => {
    if (!selectedTechnology || !selectedSkill) {
      toast.error('Please select both technology and skill');
      return;
    }

    const techId = parseInt(selectedTechnology);
    const skillId = parseInt(selectedSkill);

    // Check if mapping already exists
    const exists = mappings.some(m => m.technologyId === techId && m.skillId === skillId);
    if (exists) {
      toast.error('This mapping already exists');
      return;
    }

    const newMapping: MapTechnologySkill = {
      id: Math.max(...mappings.map(m => m.id)) + 1,
      technologyId: techId,
      skillId: skillId,
      isactive: true,
    };

    setMappings([...mappings, newMapping]);
    setIsDialogOpen(false);
    setSelectedTechnology('');
    setSelectedSkill('');
    toast.success('Mapping added successfully');
  };

  const handleDelete = (id: number) => {
    setMappings(mappings.filter(m => m.id !== id));
    toast.success('Mapping removed');
  };

  const filteredMappings = filterTech === 'all' 
    ? mappings 
    : mappings.filter(m => m.technologyId === parseInt(filterTech));

  // Group mappings by technology
  const groupedMappings = filteredMappings.reduce((acc, mapping) => {
    const tech = mockTechnologies.find(t => t.id === mapping.technologyId);
    const techTitle = tech?.title || 'Unknown';
    if (!acc[techTitle]) {
      acc[techTitle] = { tech, skills: [] };
    }
    const skill = mockSkills.find(s => s.id === mapping.skillId);
    if (skill) {
      acc[techTitle].skills.push({ ...skill, mappingId: mapping.id });
    }
    return acc;
  }, {} as Record<string, { tech: typeof mockTechnologies[0] | undefined; skills: (typeof mockSkills[0] & { mappingId: number })[] }>);

  return (
    <div className="min-h-screen">
      <Header 
        title="Technology-Skill Mapping" 
        subtitle="Link technologies to their required skills"
      />
      
      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Select value={filterTech} onValueChange={setFilterTech}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="Filter by technology" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Technologies</SelectItem>
              {mockTechnologies.filter(t => t.isactive).map(tech => (
                <SelectItem key={tech.id} value={tech.id.toString()}>
                  {tech.title}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedMappings).map(([techTitle, data]) => (
            <div key={techTitle} className="bg-card rounded-xl border border-border p-5 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Link2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{techTitle}</h3>
                  <p className="text-sm text-muted-foreground">{data.tech?.type}</p>
                </div>
              </div>
              <div className="space-y-2">
                {data.skills.map(skill => (
                  <div 
                    key={skill.mappingId}
                    className="flex items-center justify-between px-3 py-2 bg-secondary/50 rounded-lg"
                  >
                    <span className="text-sm text-foreground">{skill.title}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(skill.mappingId)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {data.skills.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">No skills linked</p>
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
            <DialogTitle>Add Technology-Skill Mapping</DialogTitle>
            <DialogDescription>
              Link a technology to a skill it requires
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Skill</label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  {mockSkills.filter(s => s.isactive).map(skill => (
                    <SelectItem key={skill.id} value={skill.id.toString()}>
                      {skill.title}
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
