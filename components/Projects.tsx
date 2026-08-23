import React, { useMemo, useState } from 'react';
import { Atom, BookOpen, Building2, Grid, Palette, Rocket } from 'lucide-react';
import SectionTitle from './SectionTitle';
import FeaturedCard from './FeaturedCard';
import ProjectCard from './ProjectCard';
import Modal from './Modal';
import { ARCHIVE_PROJECTS, CATEGORIES, FEATURED_PROJECTS } from '../constants';
import { Project, ProjectCategory } from '../types';

const categoryIcon = (category: ProjectCategory) => {
  switch (category) {
    case ProjectCategory.Game:
      return <Rocket size={14} />;
    case ProjectCategory.AI:
      return <Atom size={14} />;
    case ProjectCategory.Art:
      return <Palette size={14} />;
    case ProjectCategory.Architecture:
      return <Building2 size={14} />;
    case ProjectCategory.Research:
      return <BookOpen size={14} />;
    default:
      return <Grid size={14} />;
  }
};

const Projects: React.FC = () => {
  const [category, setCategory] = useState<ProjectCategory>(ProjectCategory.All);
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      category === ProjectCategory.All
        ? ARCHIVE_PROJECTS
        : ARCHIVE_PROJECTS.filter(p => p.category === category),
    [category]
  );

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionTitle cn="作品回顾" en="Selected Works" />
        <p className="section-sub">
          AI × 游戏设计的落地实践———底层系统、Agent架构、原生玩法、内容管线
        </p>

        <div className="projects-grid">
          {FEATURED_PROJECTS.map((project, index) => (
            <FeaturedCard key={project.id} project={project} index={index} onOpen={setSelected} />
          ))}
        </div>

        <div className="archive">
          <div className="archive-head">
            <h3 className="sub-title">
              更多档案 <span className="sub-en">Archive</span>
            </h3>
            <span className="archive-count">
              {filtered.length} / {ARCHIVE_PROJECTS.length} works
            </span>
          </div>
          <p className="section-sub">
            早期的游戏开发、AI 产品、插画与建筑作品，点击卡片查看更多
          </p>

          <div className="filter-bar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-btn${category === cat ? ' active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {categoryIcon(cat)}
                {cat}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="archive-grid">
              {filtered.map(project => (
                <ProjectCard key={project.id} project={project} onOpen={setSelected} />
              ))}
            </div>
          ) : (
            <p className="archive-empty">currently in production</p>
          )}

        </div>
      </div>

      {selected && <Modal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default Projects;
