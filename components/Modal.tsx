import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Project } from '../types';

interface ModalProps {
  project: Project;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ project, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Animation stages: 0 = initial (unused), 1 = opened (pop), 2 = settled, 3 = closing
  // To use the exit animation reversed as the entry animation, start in the
  // closing pose (stage 3) and then transition to settled (stage 2) on mount.
  const [stage, setStage] = React.useState<number>(3);

  // Play reversed exit -> settled on mount: this makes entry look like the
  // exit animation played backwards.
  React.useEffect(() => {
    const t = setTimeout(() => setStage(2), 20);
    return () => clearTimeout(t);
  }, []);

  // Handle close with reverse animation: set closing stage, wait, then call onClose
  const handleClose = React.useCallback(() => {
    // If already closing, ignore
    if (stage === 3) return;
    setStage(3);
    // match duration below (closing animation duration)
    const closeDuration = 540; // ms (matches transition below; slightly longer to ensure animation completes)
    setTimeout(() => {
      onClose();
    }, closeDuration);
  }, [onClose, stage]);

  // Close on Escape with the same animated path
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  // Render media content based on type
  const renderMedia = () => {
    const mediaItems = Array.isArray(project.media) ? project.media : [project.media];

    return (
      <div className="w-full space-y-4">
        {mediaItems.map((m, idx) => {
          const key = `${m.type}-${idx}`;
          if (m.type === 'video') {
            return (
              <div key={key} className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-slate-700">
                <video
                  controls
                  className="w-full h-full object-contain"
                  poster={m.thumbnail}
                >
                  <source src={m.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            );
          }

          if (m.type === 'pdf') {
            return (
              <div key={key} className="w-full h-[60vh] bg-slate-800 rounded-lg overflow-hidden shadow-2xl border border-slate-700">
                <iframe
                  src={m.url}
                  className="w-full h-full"
                  title={`${project.title}-pdf-${idx}`}
                >
                  This browser does not support PDFs. Please download the PDF to view it: <a href={m.url}>Download PDF</a>
                </iframe>
              </div>
            );
          }

          // image or fallback
          return (
            <div key={key} className="w-full max-h-[70vh] rounded-lg overflow-hidden shadow-2xl border border-slate-700 flex items-center justify-center bg-black">
              <img
                src={m.url}
                alt={project.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={handleClose} 
      />
      
      <div
        className="relative w-full max-w-5xl glass-panel rounded-2xl flex flex-col max-h-full overflow-hidden"
        style={{
          transformOrigin: 'center top',
          transform: stage === 0
            ? 'perspective(900px) translateY(-18px) scale(0.98) rotateX(8deg)'
            : stage === 1
              ? 'perspective(900px) translateY(6px) scale(1) rotateX(1.5deg)'
              : stage === 2
                ? 'perspective(900px) translateY(0px) scale(1) rotateX(0deg)'
                : 'perspective(900px) translateY(-12px) scale(0.97) rotateX(6deg)',
          transition: stage === 0
            ? 'transform 0ms, opacity 0ms'
            : stage === 1
              ? 'transform 320ms cubic-bezier(.22,1.2,.36,1), opacity 220ms linear'
              : stage === 2
                ? 'transform 220ms cubic-bezier(.2,1,.3,1), opacity 200ms linear'
                : 'transform 520ms cubic-bezier(.22,1.2,.36,1), opacity 420ms linear',
          opacity: stage === 0 ? 0 : (stage === 3 ? 0 : 1)
        }}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {project.title}
          </h2>
          <button 
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {renderMedia()}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-xl font-semibold text-cyan-400">About the Project</h3>
              <p className="text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-6">
              {/* Metadata Side Panel */}
              <div className="bg-white/5 p-4 rounded-xl space-y-4 border border-white/5">
                <div className="flex items-center text-slate-400">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">{project.date}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-cyan-900/30 text-cyan-300 text-xs rounded-full border border-cyan-800/50 flex items-center">
                      <Tag size={10} className="mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all font-medium"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;