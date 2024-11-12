import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Section from '../components/Section';

const PortfolioContainer = styled.div`
  padding: 80px 0 0;
  height: calc(100vh - 140px);
  overflow-y: auto;
  background-color: ${props => props.theme.colors.white};
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.secondary};
    border-radius: 4px;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProjectImage = styled.div`
  height: 200px;
  background-color: ${props => props.theme.colors.secondary};
  background-size: cover;
  background-position: center;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;

  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1rem;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.background};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.text};
`;

const Portfolio = () => {
  const projects = [
    {
      title: "Modern React Portfolio",
      description: "Built a dynamic portfolio website featuring dark/light theme switching, interactive animations, and a technical blog system. Implements modern React patterns and responsive design.",
      tech: ["React", "TypeScript", "Emotion CSS", "Framer Motion"],
      image: "/portfolio-site.jpg",
      link: "https://github.com/zlavik/slavik-portfolio"
    },
    {
      title: "AdhSkillD - Gamified Skill Development Platform",
      description: "Built an interactive skill development platform that transforms learning into an engaging journey. Features dynamic skill trees, achievement systems, and real-time progress tracking. Implements advanced React patterns, custom animations, and secure user authentication.",
      tech: ["React", "TypeScript", "Firebase", "Tailwind CSS", "Zustand", "React Flow"],
      image: "/adhskilld.jpg",
      link: "https://github.com/zlavik/adhskilld"
    }
];
  return (
    <PortfolioContainer>
      <Section title="Portfolio">
        <ProjectGrid>
          {projects.map((project, index) => (
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <ProjectCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <ProjectImage style={{ backgroundImage: `url(${project.image})` }} />
                <ProjectContent>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <TechStack>
                    {project.tech.map((tech, i) => (
                      <TechTag key={i}>{tech}</TechTag>
                    ))}
                  </TechStack>
                </ProjectContent>
              </ProjectCard>
            </a>
          ))}
        </ProjectGrid>
      </Section>
    </PortfolioContainer>
  );
};

export default Portfolio;
