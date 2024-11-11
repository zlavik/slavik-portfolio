import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import Section from '../components/Section';
import { blogPosts } from '../data/blogPosts';

const BlogPostContainer = styled.div`
  padding: 80px 20px 40px;
  max-width: 800px;
  margin: 0 auto;
  
`;

const BlogHeader = styled.div`
  margin-bottom: 3rem;
  text-align: left;
  
  p {
    color: ${props => props.theme.colors.darkGray};
    font-size: 0.9rem;
  }
`;

const BlogContent = styled.div`
  line-height: 1.8;
  text-align: left;
  
  h2 {
    margin: 2.5rem 0 1rem;
    color: ${props => props.theme.colors.primary};
    font-size: 1.8rem;
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  code {
    background: ${props => props.theme.colors.lightGray};
    padding: 1.5rem;
    border-radius: 8px;
    display: block;
    margin: 1.5rem 0;
    white-space: pre-wrap;
    font-size: 0.9rem;
    font-family: 'Fira Code', monospace;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug && blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <BlogPostContainer>
      <Section title={post.title}>
        <BlogHeader>
          <p>{post.date}</p>
        </BlogHeader>
        <BlogContent dangerouslySetInnerHTML={{ __html: post.content }} />
      </Section>
    </BlogPostContainer>
  );
};

export default BlogPost;