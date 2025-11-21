import React, { useState } from 'react';
import { Play, FileText, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const mediaItems = Array.isArray(project.media) ? project.media : [project.media];

  // Default cover index: prefer first video if present, otherwise 0
  const defaultIndex = mediaItems.findIndex(m => m.type === 'video');
  const [coverIndex, setCoverIndex] = useState(defaultIndex >= 0 ? defaultIndex : 0);
  const cover = mediaItems[coverIndex];

  const getIcon = (m = cover) => {
    switch (m.type) {
      case 'video': return <Play size={20} />;
      case 'pdf': return <FileText size={20} />;
      case 'image': default: return <ImageIcon size={20} />;
    }
  };

  const thumbnailUrl = cover.thumbnail || cover.url;
  // Ensure we don't try to use a PDF as an image source if no thumbnail
  const validThumbnail = cover.type === 'pdf' && !cover.thumbnail
    ? 'https://via.placeholder.com/600x400/1e293b/94a3b8?text=PDF+Document'
    : thumbnailUrl;

  return (
    <div 
      className="group relative glass-panel rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col"
      onClick={() => onClick(project)}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={validThumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

        {/* Category Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur-md rounded border border-white/10 text-xs text-slate-200 uppercase tracking-wider font-semibold">
          {project.category}
        </div>

        

        {/* Media Type Icon (bottom-right) */}
        <div className="absolute bottom-3 right-3 p-2 bg-cyan-500/20 backdrop-blur-md rounded-full text-cyan-300 border border-cyan-500/30">
          {getIcon()}
        </div>

        {/* Thumbnail selector (if multiple media items) */}
        {mediaItems.length > 1 && (
          <div className="absolute left-3 bottom-3 flex gap-2">
            {mediaItems.map((m, i) => {
              const thumb = m.thumbnail || (m.type === 'image' ? m.url : undefined) || 'https://via.placeholder.com/120x80/0f172a/94a3b8?text=Asset';
              const isActive = i === coverIndex;
              return (
                <button
                  key={`thumb-${i}`}
                  onClick={(e) => { e.stopPropagation(); setCoverIndex(i); }}
                  className={`w-12 h-8 rounded overflow-hidden border-2 ${isActive ? 'border-cyan-400' : 'border-transparent'} focus:outline-none`}
                  title={`Show ${m.type}`}
                >
                  <img src={thumb} alt={`${project.title}-thumb-${i}`} className="w-full h-full object-cover" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">
          {project.description}
        </p>
        
        <div className="flex items-center text-cyan-500 text-sm font-medium mt-auto opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Explore Project <ArrowRight size={16} className="ml-1" />
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/20 rounded-xl pointer-events-none transition-colors duration-500" />
    </div>
  );
};

export default ProjectCard;