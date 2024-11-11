import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const ContactPage = styled.div`
  min-height: calc(100vh - 140px);
  padding: 80px 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.white};
`;

const ContactHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.darkGray};
  max-width: 600px;
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  width: 100%;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
`;
const Input = styled.input`
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s ease;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`;

const StatusMessage = styled(motion.div)`
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  
  &.success {
    background-color: #e6ffe6;
    color: #008000;
  }
  
  &.error {
    background-color: #ffe6e6;
    color: #ff0000;
  }
`;

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setStatus('success');
        form.current.reset();
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <ContactPage>
      <ContactHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Let's Connect</Title>
        <Subtitle>Have a question or want to work together? Drop me a message!</Subtitle>
      </ContactHeader>

      <ContactForm 
        ref={form} 
        onSubmit={sendEmail}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <InputGroup>
          <Label>Name</Label>
          <Input 
            type="text" 
            name="user_name" 
            required 
          />
        </InputGroup>

        <InputGroup>
          <Label>Email</Label>
          <Input 
            type="email" 
            name="user_email" 
            required 
          />
        </InputGroup>

        <InputGroup>
          <Label>Message</Label>
          <TextArea 
            name="message" 
            required 
          />
        </InputGroup>

        <SubmitButton 
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </SubmitButton>

        {status === 'success' && (
          <StatusMessage 
            className="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Message sent successfully!
          </StatusMessage>
        )}
        
        {status === 'error' && (
          <StatusMessage 
            className="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Something went wrong. Please try again.
          </StatusMessage>
        )}
      </ContactForm>
    </ContactPage>
  );
};

export default Contact;
