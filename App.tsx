import React, { useState, useMemo } from 'react';
import { Rocket, Atom, Palette, Building2, BookOpen, Grid, Filter } from 'lucide-react';
import StarBackground from './components/StarBackground';
import ProjectCard from './components/ProjectCard';
import Modal from './components/Modal';
import { PROJECTS, CATEGORIES, HERO_SLOGAN, SUB_SLOGAN } from './constants';
import { Project, ProjectCategory } from './types';

// Category icon mapping
const getCategoryIcon = (category: string) => {
  switch (category) {
    case ProjectCategory.Game: return <Rocket size={18} />;
    case ProjectCategory.AI: return <Atom size={18} />;
    case ProjectCategory.Art: return <Palette size={18} />;
    case ProjectCategory.Architecture: return <Building2 size={18} />;
    case ProjectCategory.Research: return <BookOpen size={18} />;
    default: return <Grid size={18} />;
  }
};

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(ProjectCategory.All);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on selection
  const filteredProjects = useMemo(() => {
    if (selectedCategory === ProjectCategory.All) return PROJECTS;
    return PROJECTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden text-slate-200 selection:bg-cyan-500/30">
      <StarBackground />

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* Hero Section */}
        <section className="flex flex-col justify-center items-center text-center pt-20 pb-10 mb-10 space-y-6 animate-[fadeIn_1s_ease-out]">
          <div className="inline-block p-1 px-3 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4 backdrop-blur-sm">
            Welcome, Traveler
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            {HERO_SLOGAN}
          </h1>
          <div className="max-w-3xl px-6 pt-14 flex items-start justify-center gap-4 text-slate-300">
            <span className="text-cyan-400 text-lg md:text-xl flex-shrink-0 mt-0.5 leading-relaxed">✦</span>
            <p className="text-sm md:text-base leading-relaxed text-left indent-8">
              胡晨欣，哈工大数字媒体工学硕士在读，实习于腾讯光子、网易互娱。研究方向为AI游戏系统架构和Multi-Agent，是AI深度用户与开发者，对技术实现文化创意的事业具有强烈热爱与毅力。
            </p>
            <span className="text-cyan-400 text-lg md:text-xl flex-shrink-0 mt-0.5 leading-relaxed">✦</span>
          </div>
        </section>

        {/* Filter Navigation (Sticky) */}
        <div className="sticky top-4 z-40 mb-12">
          <div className="glass-panel rounded-2xl p-2 mx-auto max-w-max overflow-x-auto shadow-2xl shadow-black/20">
            <div className="flex items-center space-x-1 min-w-max">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat as ProjectCategory)}
                    className={`
                      flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                      ${isActive 
                        ? 'bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                        : 'text-slate-400 hover:text-white hover:bg-white/10'}
                    `}
                  >
                    <span className="mr-2">{getCategoryIcon(cat as string)}</span>
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={setSelectedProject} 
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-32 text-slate-500">
            <Filter size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-xl font-light">Currently in production...</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-32 text-center text-slate-500 text-sm py-12 border-t border-white/5 space-y-2">
          <p className="text-slate-400">{SUB_SLOGAN}</p>
          <p>&copy; {new Date().getFullYear()} Hu Chenxin's Portfolio. Built with React & Tailwind.</p>
        </footer>
      </main>

      {/* Modal Detail View */}
      {selectedProject && (
        <Modal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
};

export default App;