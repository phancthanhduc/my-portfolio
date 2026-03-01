import { useState, useEffect } from 'react';

export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  techDetails?: string[];
  features?: string[];
  link: string;
}

interface WorkDetailProps {
  project: Project | null;
  onClose: () => void;
}

export function WorkDetail({ project, onClose }: WorkDetailProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (project) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#2a2a2a] border border-[#525252] rounded-lg transition-all duration-300 ${
          isVisible ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#a3a3a3] hover:text-[#f5f5f5] transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-8 border-b border-[#525252]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-px bg-gradient-to-r from-[#fbbf24] to-[#64748b]" />
            <span className="text-xs font-mono text-[#fbbf24] tracking-widest">PROJECT</span>
          </div>
          <h2 className="text-3xl font-light text-[#f5f5f5] mb-4">{project.title}</h2>
          <p className="text-[#a3a3a3] leading-relaxed">{project.description}</p>
        </div>

        {/* Tech Stack */}
        <div className="p-8 border-b border-[#525252]">
          <h3 className="text-sm font-mono text-[#a3a3a3]/50 mb-4 tracking-wider">TECH STACK</h3>
          <div className="flex flex-wrap gap-2">
            {(project.techDetails || project.tech).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-sm font-mono text-[#fbbf24] bg-[#fbbf24]/10 border border-[#fbbf24]/20 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="p-8 border-b border-[#525252]">
            <h3 className="text-sm font-mono text-[#a3a3a3]/50 mb-4 tracking-wider">KEY FEATURES</h3>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-[#a3a3a3]">
                  <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#fbbf24] flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="p-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-mono text-[#a3a3a3] hover:text-[#f5f5f5] border border-[#525252] hover:border-[#fbbf24]/30 transition-colors rounded"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook to manage work detail modal state
export function useWorkDetail() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProject = (project: Project) => setSelectedProject(project);
  const closeProject = () => setSelectedProject(null);

  return {
    selectedProject,
    openProject,
    closeProject,
    WorkDetail: () => <WorkDetail project={selectedProject} onClose={closeProject} />
  };
}
