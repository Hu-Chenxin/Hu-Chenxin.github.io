import React from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import Bullets from './Bullets';
import { Project, ProjectMedia } from '../types';

interface FeaturedCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

const firstThumbnail = (project: Project): string | undefined => {
  if (project.cover) return project.cover;
  const items = project.media ? (Array.isArray(project.media) ? project.media : [project.media]) : [];
  const withThumb = items.find((m: ProjectMedia) => m.thumbnail || m.type === 'image');
  return withThumb?.thumbnail ?? (withThumb?.type === 'image' ? withThumb.url : undefined);
};

const FeaturedCard: React.FC<FeaturedCardProps> = ({ project, index, onOpen }) => {
  const thumbnail = firstThumbnail(project);
  const hasMedia = Boolean(project.media);

  return (
    <article className="project-card">
      <div className={`project-cover${thumbnail ? ' has-photo' : ''}${project.coverMark ? ' has-marks' : ''}${project.coverFit === 'contain' ? ' cover-contain' : ''}`}>
        <div className="cover-back" aria-hidden="true">
          <span className="cover-idx">{String(index + 1).padStart(2, '0')}</span>
          {project.coverMark && (
            <span className="cover-marks">
              <img src={project.coverMark} alt="" />
              <img src={project.coverMark} alt="" />
              <img src={project.coverMark} alt="" />
              <img src={project.coverMark} alt="" />
            </span>
          )}
          <span className="cover-orbs">
            {(project.coverOrbs ?? []).map(cls => (
              <span className={`orb ${cls}`} key={cls} />
            ))}
          </span>
        </div>
        <div className="cover-frame">
          {thumbnail ? (
            <img className="cover-photo" src={thumbnail} alt={project.title} loading="lazy" />
          ) : (
            project.coverWord && <span className="cover-word">{project.coverWord}</span>
          )}
        </div>
        {project.org && <span className="project-cover-tag">{project.org}</span>}
      </div>

      <div className="project-body">
        <div className="project-head">
          <h3>{project.title}</h3>
          <span className="pill pill-date">{project.period ?? project.date}</span>
        </div>
        {project.role && <p className="project-role">{project.role}</p>}
        <p className="project-desc">{project.description}</p>
        {project.bullets && <Bullets items={project.bullets} />}

        {project.links && (
          <>
            <p className="link-label">上线作品</p>
            <div className="link-grid">
              {project.links.map(link => (
                <a
                  className={`link-item${link.cover ? ' has-cover' : ''}${link.coverTone === 'light' ? ' is-light' : ''}`}
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={link.cover ? ({ '--link-cover': `url(${link.cover})` } as React.CSSProperties) : undefined}
                >
                  {link.genre && <span className="link-genre">{link.genre}</span>}
                  <span className="link-name">
                    {link.label}
                    <ArrowUpRight size={13} />
                  </span>
                </a>
              ))}
            </div>
          </>
        )}

        <div className="tag-cloud">
          {project.tags.map(tag => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        {hasMedia && (
          <button className="project-open" onClick={() => onOpen(project)}>
            <Play size={13} />
            查看视频与作品集
          </button>
        )}
      </div>
    </article>
  );
};

export default FeaturedCard;
