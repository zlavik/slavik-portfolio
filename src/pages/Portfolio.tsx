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
      title: "Cirium Data Pipeline Optimization",
      description: "Led optimization of data pipelines processing 200M+ daily events, improving aviation analytics efficiency by 40%.",
      tech: ["Python", "AWS", "PySpark", "PostgreSQL"],
      image: "/cirium-project.jpg"
    },
    {
      title: "Healthcare AI Platform",
      description: "Developed HIPAA-compliant healthcare platform with integrated AI for patient care management.",
      tech: ["React", "Node.js", "TensorFlow", "AWS"],
      image: "/healthcare-ai.jpg"
    },
    {
      title: "FIRST Robotics Mentorship",
      description: "Mentored young developers in coding best practices and collaborative development.",
      tech: ["Python", "Java", "Git", "Agile"],
      image: "/robotics-mentor.jpg"
    }
  ];
  return (
    <PortfolioContainer>
      <Section title="Portfolio">
        <ProjectGrid>
          {projects.map((project, index) => (
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
          ))}
        </ProjectGrid>
      </Section>
    </PortfolioContainer>
  );
};

export default Portfolio;
