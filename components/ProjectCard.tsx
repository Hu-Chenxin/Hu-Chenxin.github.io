import React from 'react';
import { FileText, Film, Image as ImageIcon } from 'lucide-react';
import { Project, ProjectMedia } from '../types';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

const PLACEHOLDER_COVER =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'><rect width='4' height='3' fill='%23f7f6f3'/></svg>";

/** 档案卡的封面优先取视频，其次取第一个资产 */
const pickCover = (project: Project): ProjectMedia | undefined => {
  const items = project.media ? (Array.isArray(project.media) ? project.media : [project.media]) : [];
  return items.find(m => m.type === 'video') ?? items[0];
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen }) => {
  const cover = pickCover(project);
  const thumbnail = cover?.thumbnail ?? (cover?.type === 'image' ? cover.url : PLACEHOLDER_COVER);

  const icon = () => {
    if (cover?.type === 'video') return <Film size={14} />;
    if (cover?.type === 'pdf') return <FileText size={14} />;
    return <ImageIcon size={14} />;
  };

  return (
    <article
      className="archive-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(project);
        }
      }}
    >
      <div className="archive-cover">
        <img src={thumbnail} alt={project.title} loading="lazy" />
        <span className="archive-cat">{project.category}</span>
        {cover && <span className="archive-media">{icon()}</span>}
      </div>

      <div className="archive-body">
        <h3 className="archive-title">{project.title}</h3>
        <p className="archive-date">{project.date}</p>
        <p className="archive-desc">{project.description}</p>
        <div className="tag-cloud">
          {project.tags.slice(0, 3).map(tag => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
