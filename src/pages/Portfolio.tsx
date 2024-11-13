import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import { useState } from 'react';

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

const ProjectsCard = styled(motion.article)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;

const ProjectCard = styled.div`
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &:hover {
    color: ${props => props.theme.colors.text};

  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    color: ${props => props.theme.mode === 'dark' ? props.theme.colors.primary : props.theme.colors.secondary};

    margin-bottom: 0.5rem;
    font-size: 1.4rem;
  }

  p {
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const TechTag = styled.span`
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.colors.accent : props.theme.colors.lightText};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
  color: ${props => props.theme.mode === 'dark' ? props.theme.colors.darkGray : props.theme.colors.white};

`;

const CTAButton = styled(motion.button)`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  margin-top: auto;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const LiveButton = styled(motion.button)`
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.colors.accent : props.theme.colors.white};
  color: ${props => props.theme.mode === 'dark' ? props.theme.colors.primary : props.theme.colors.secondary};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  margin-top: auto;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.mode === 'dark' ? props.theme.colors.accent : props.theme.colors.white};
    color: ${props => props.theme.mode === 'dark' ? props.theme.colors.secondary : props.theme.colors.primary};
  }
  &:focus {
    outline: none;
  }
`;

const ProjectDescription = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  line-height: 1.6;
`;
const projects = [
  {
    title: "Modern React Portfolio",
    description: "Built a dynamic portfolio website featuring dark/light theme switching, interactive animations, and a technical blog system. Implements modern React patterns and responsive design. Features a secure contact form with EmailJS integration and spam prevention through a 5-minute cooldown system.",
    tech: ["React", "TypeScript", "Emotion CSS", "Framer Motion", "EmailJS"],
    image: "/portfolio-site.jpg",
    gitHubLink: "https://github.com/zlavik/slavik-portfolio",
    liveLink: "https://www.slavikferris.com/",
    isLive: true
  },
  {
    title: "AdhSkillD - Gamified Skill Development Platform",
    description: "Built an interactive skill development platform that transforms learning into an engaging journey. Features dynamic skill trees, achievement systems, and real-time progress tracking.",
    tech: ["React", "TypeScript", "Firebase", "Tailwind CSS", "Zustand", "React Flow"],
    image: "/adhskilld.jpg",
    gitHubLink: "https://github.com/zlavik/adhskilld",
    liveLink: "",
    isLive: false
  }
];
const Portfolio = () => {
  const [buttonTexts, setButtonTexts] = useState<{ [key: number]: string }>(
    projects.reduce((acc, _, index) => ({ ...acc, [index]: 'View Live Page →' }), {})
  );
  const handleLiveClick = (project: {
    isLive: boolean;
    liveLink: string;
  }, index: number) => {
    if (project.isLive) {
      window.open(project.liveLink, '_blank');
    } else {
      setButtonTexts(prev => ({ ...prev, [index]: 'Coming Soon →' }));
    }
  };
  return (
    <PortfolioContainer>
      <Section title="Featured Projects">
        <ProjectGrid>
          {projects.map((project, index) => (
              <ProjectsCard key={index}>
                <ProjectCard>
                  <ProjectImage style={{ backgroundImage: `url(${project.image})` }} />
                  <ProjectContent>
                    <h3>{project.title}</h3>
                    <ProjectDescription>
                      {project.description}<br />
                    </ProjectDescription>
                    <TechStack>
                      {project.tech.map((tech, i) => (
                        <TechTag key={i}>{tech}</TechTag>
                      ))}
                    </TechStack>
                    <ButtonContainer>
                      <CTAButton onClick={() => window.open(project.gitHubLink, '_blank')}>
                        View Github Page →
                      </CTAButton>
                      <LiveButton
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        animate={!projects[index].isLive && buttonTexts[index] === 'Coming Soon →' ? {
                          scale: [1, 1.1, 1],
                          color: ['#ffffff', '#f39c12', '#ffffff'],
                          transition: { 
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse"
                           }
                        } : {}}
                        onClick={() => handleLiveClick(project, index)}
                      >
                        {buttonTexts[index]}
                      </LiveButton>
                    </ButtonContainer>
                  </ProjectContent>
                </ProjectCard>
              </ProjectsCard>
          ))}        
        </ProjectGrid>
      </Section>
    </PortfolioContainer>
  );
};

export default Portfolio;
