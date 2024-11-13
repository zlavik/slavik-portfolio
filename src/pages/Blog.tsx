import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../components/Section';

const BlogContainer = styled.div`
  padding: 80px 0 0;
  height: calc(100vh - 140px);
  overflow-y: auto;
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.colors.accent : props.theme.colors.white};
  color: ${props => props.theme.mode === 'dark' ? props.theme.colors.lightText : props.theme.colors.text};
  
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
  transition: background-color 0.3s ease, color 0.3s ease;

`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const BlogPost = styled(motion.article)`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
  }
  
  p {
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
`;
const BlogCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  &:hover {
    color: ${props => props.theme.mode === 'dark' ? props.theme.colors.primary : props.theme.colors.secondary};
  }
`;
const BlogImage = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
  ${BlogCard}:hover & {
    transform: scale(1.05);
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
  }
`;

const BlogMeta = styled.div`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;



const Blog = () => {
  const blogPosts = [
    {
      slug: 'llm-security-challenges',
      title: "The Hidden Security Risks in Large Language Models",
      date: "2024-01-25",
      excerpt: "Exploring the critical security challenges in LLM implementation, from prompt injection attacks to model theft, and how organizations can protect their AI systems.",
      image: "/blog-images/llm-security.jpg",
      category: "Security",
      readTime: "8 min read"
    },
    {
      slug: 'modern-full-stack-architecture',
      title: "Modern Full-Stack Architecture in 2024",
      date: "2024-01-10",
      excerpt: "Exploring the synergy between Angular, React, and Vue.js for frontend, coupled with Python and Node.js backends. Real-world examples from enterprise applications.",
      image: "/blog-images/modern-architecture.jpg",
      category: "Development",
      readTime: "6 min read"
    },
    {
      slug: 'aws-cost-optimization',
      title: "AWS Cost Optimization Techniques",
      date: "2023-12-28",
      excerpt: "Strategic approaches to reducing cloud costs while maintaining high performance. Real examples of achieving significant savings through smart architecture.",
      image: "/blog-images/aws-optimization.jpg",
      category: "Cloud",
      readTime: "7 min read"
    }
  ];
  return (
    <BlogContainer>
      <Section title="Technical Insights">
        <BlogGrid>
          {blogPosts.map((post, index) => (
            <BlogPost
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <BlogCard to={`/blog/${post.slug}`}>
                <BlogImage style={{ backgroundImage: `url(${post.image})` }} />
                <BlogContent>
                  <BlogMeta>
                    {post.date} | {post.category} | {post.readTime}
                  </BlogMeta>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </BlogContent>
              </BlogCard>
            </BlogPost>
          ))}
        </BlogGrid>
      </Section>
    </BlogContainer>
  );
};
export default Blog;