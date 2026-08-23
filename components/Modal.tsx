import React, { useCallback, useEffect, useState } from 'react';
import { X, ExternalLink, FileText, Film, Image as ImageIcon } from 'lucide-react';
import { Project, ProjectMedia } from '../types';

interface ModalProps {
  project: Project;
  onClose: () => void;
}

const MEDIA_LABEL: Record<ProjectMedia['type'], string> = {
  video: '视频演示',
  pdf: '作品集 PDF',
  image: '图片',
};

const MediaIcon: React.FC<{ type: ProjectMedia['type'] }> = ({ type }) => {
  if (type === 'video') return <Film size={13} />;
  if (type === 'pdf') return <FileText size={13} />;
  return <ImageIcon size={13} />;
};

const CLOSE_DURATION = 420;

const Modal: React.FC<ModalProps> = ({ project, onClose }) => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => setShown(true), 20);
    return () => {
      document.body.style.overflow = '';
      window.clearTimeout(t);
    };
  }, []);

  const handleClose = useCallback(() => {
    setShown(false);
    window.setTimeout(onClose, CLOSE_DURATION);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  const mediaItems = project.media
    ? Array.isArray(project.media)
      ? project.media
      : [project.media]
    : [];

  const renderFrame = (m: ProjectMedia, idx: number) => {
    if (m.type === 'video') {
      return (
        <video controls poster={m.thumbnail} preload="metadata">
          <source src={m.url} type="video/mp4" />
          当前浏览器不支持内嵌视频播放。
        </video>
      );
    }
    if (m.type === 'pdf') {
      return <iframe src={m.url} title={`${project.title}-pdf-${idx}`} />;
    }
    return <img src={m.url} alt={project.title} />;
  };

  return (
    <div className="modal-root" role="dialog" aria-modal="true" aria-label={project.title}>
      <div className={`modal-veil${shown ? ' in' : ''}`} onClick={handleClose} />

      <div className={`modal-panel${shown ? ' in' : ''}`}>
        <div className="modal-head">
          <div>
            <h2>{project.title}</h2>
            <p className="sub">
              {project.category}
              {project.role ? ` · ${project.role}` : ''}
            </p>
          </div>
          <button className="modal-close" onClick={handleClose} aria-label="关闭">
            <X size={17} />
          </button>
        </div>

        <div className="modal-body">
          {mediaItems.length > 0 && (
            <div className="modal-media">
              {mediaItems.map((m, idx) => (
                <div className="modal-media-frame" key={`${m.type}-${idx}`}>
                  {renderFrame(m, idx)}
                  <div className="modal-media-label">
                    <MediaIcon type={m.type} />
                    {m.label ?? MEDIA_LABEL[m.type]}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="modal-info">
            <div>
              <h3>项目说明</h3>
              <p>{project.description}</p>
            </div>

            <div className="modal-meta">
              <p className="modal-date">{project.period ?? project.date}</p>
              <div className="tag-cloud">
                {project.tags.map(tag => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              {project.link && (
                <a className="modal-link" href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} />
                  查看项目主页
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
