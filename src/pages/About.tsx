import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import profilePic from '../assets/profile-pic.png';

const AboutContainer = styled.div`
  padding: 80px 0 60px; // Adjusted to account for fixed footer
  height: calc(100vh - 140px); // Subtracting nav and footer heights
  overflow-y: auto;
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  background-color: ${props => props.theme.colors.white};
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.secondary};
    border-radius: 4px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  margin-bottom: 3rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

const ContentSection = styled.div`
  text-align: left;
  flex: 1;
  
  h2 {
    color: ${props => props.theme.colors.primary};
    margin: 2rem 0 1rem;
  }
  
  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

const SkillsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    position: relative;
    
    &:before {
      content: "•";
      color: ${props => props.theme.colors.secondary};
      position: absolute;
      left: 0;
    }
  }
`;

const ConnectLink = styled(Link)`
  color: ${props => props.theme.colors.secondary};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: ${props => props.theme.colors.accent};
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <Section title="About Me">
        <ProfileSection>
          <ProfileImage
            src={profilePic}
            alt="Slavik Ferris"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <ContentSection>
            <h2>Who I Am</h2>
            <p>I'm Slavik Ferris, a Full-Stack Software Engineer passionate about tackling complex technical challenges and creating solutions that make a lasting impact. My journey in software engineering is driven by a constant curiosity—not just to understand the "how" but the "why" behind each problem, which often opens the door to smarter, more innovative solutions.</p>
            
            <h2>What I Do</h2>
            <p>In my previous role at Cirium, I was a core member of the data acquisition team, contributing to aviation analytics by acquiring high-volume data through advanced web scraping techniques and strategic partnerships with airlines. My work helped ensure data consistency and quality, enabling comprehensive analytics for aviation industry insights. I thrive on finding elegant solutions to complex problems, like reducing our team's downtime issue resolution from 360 to 30 hours annually through innovative automation.</p>
            
            <h2>My Technical Expertise</h2>
            <SkillsList>
              <li><strong>Full-Stack Development:</strong> Proficient in modern JavaScript/TypeScript, Python, and Java</li>
              <li><strong>Frontend Technologies:</strong> React, Angular, Vue.js, HTML5, CSS3, Vite</li>
              <li><strong>Backend Development:</strong> Node.js, Express.js, RESTful APIs</li>
              <li><strong>Cloud & DevOps:</strong> AWS, Docker, Kubernetes</li>
              <li><strong>Data Processing:</strong> Real-time data pipelines, PySpark, Kafka</li>
              <li><strong>Machine Learning:</strong> TensorFlow, PyTorch, Scikit-learn</li>
              <li><strong>Prompt Engineering:</strong> Skilled in crafting prompts for various AI applications</li>
            </SkillsList>
            
            <h2>My Approach</h2>
            <p>I believe in writing code that's not just functional but maintainable, scalable, and future-ready. My colleagues describe me as someone who:</p>
            <SkillsList>
              <li>Constantly questions the status quo with "Why do we do it this way?" to find better solutions</li>
              <li>Takes initiative in adopting new technologies and best practices to improve products and team productivity</li>
              <li>Develops automated solutions that create long-lasting value</li>
              <li>Brings both technical expertise and a collaborative spirit to every project, creating a positive and productive environment for the team</li>
            </SkillsList>
            
            <h2>Beyond the Code</h2>
            <p>When I'm not coding, you'll find me:</p>
            <SkillsList>
              <li>Exploring the outdoors through camping, hiking, and rock climbing</li>
              <li>Learning about the latest advancements in AI and machine learning, staying on top of emerging trends</li>
            </SkillsList>
            
            <h2>What Drives Me</h2>
            <p>I'm passionate about creating technology that has a real impact. Whether optimizing a data pipeline that improves the experience for millions of travelers or developing efficient, high-performance systems, I believe in using technology to create meaningful, positive change.</p>
            
            <h2>Let's Connect</h2>
            <p>I'm always eager to connect with fellow tech enthusiasts and explore new opportunities. If you're interested in discussing a project, exchanging ideas, or exploring potential collaborations, <ConnectLink to="/contact">feel free to reach out!</ConnectLink></p>
          </ContentSection>
        </ProfileSection>
      </Section>
    </AboutContainer>
  );
};

export default About;