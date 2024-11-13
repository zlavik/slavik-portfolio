import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const ContactPage = styled.div`
  min-height: calc(100vh - 140px);
  padding: 80px 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;
const ContactHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 1rem;
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.mode === 'dark' ? props.theme.colors.text : props.theme.colors.lightText};
  max-width: 600px;
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  width: 100%;
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.colors.lightText : props.theme.colors.primary};
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
  color: ${props => props.theme.colors.white};
  font-weight: 600;
`;
const Input = styled.input`
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.colors.accent : props.theme.colors.white};
  color: ${props => props.theme.mode === 'dark' ? props.theme.colors.text : props.theme.colors.lightText};
  border-color: ${props => props.theme.mode === 'dark' ? '#404040' : props.theme.colors.lightGray};

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
  background-color: ${props => props.theme.mode === 'dark' ? props.theme.colors.accent : props.theme.colors.white};
  color: ${props => props.theme.mode === 'dark' ? props.theme.colors.text : props.theme.colors.lightText};
  border-color: ${props => props.theme.mode === 'dark' ? '#404040' : props.theme.colors.lightGray};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SubmitButton = styled(motion.button)<{ $isActive: boolean }>`
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.secondary};

  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${props => props.$isActive ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;
  box-shadow: ${props => props.$isActive ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover {
    transform: ${props => props.$isActive ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.$isActive ? '0 6px 16px rgba(0, 0, 0, 0.2)' : 'none'};
  }
`

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
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState('');
  const [countdown, setCountdown] = useState<number>(0);
  const COOLDOWN_TIME = 5 * 60; // 5 minutes in seconds

  useEffect(() => {
    // Check localStorage on component mount
    const lastSubmitTime = localStorage.getItem('lastSubmitTime');
    if (lastSubmitTime) {
      const timePassed = Math.floor((Date.now() - parseInt(lastSubmitTime)) / 1000);
      const remainingTime = COOLDOWN_TIME - timePassed;
      if (remainingTime > 0) {
        setCountdown(remainingTime);
      }
    }
  }, [COOLDOWN_TIME]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    if (form.current) {
      emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
        .then(() => {
          setStatus('success');
          localStorage.setItem('lastSubmitTime', Date.now().toString());
          setCountdown(COOLDOWN_TIME);
          form.current?.reset();
        })
        .catch(() => {
          setStatus('error');
        });
    }
  };

  return (
    <ContactPage>
      <ContactGrid>
        <ContactHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Let's Connect</Title>
          <Subtitle>Have a question or want to work together? <br/> Drop me a message!</Subtitle>
          
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
            whileHover={{ scale: countdown > 0 ? 1 : 1.02 }}
            whileTap={{ scale: countdown > 0 ? 1 : 0.98 }}
            disabled={countdown > 0 || status === 'sending'}
            $isActive={countdown === 0}
          >
            {status === 'sending' ? 'Sending...' : 
            countdown > 0 ? `Wait ${formatTime(countdown)}` : 'Send Message'}
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

          {status === 'cooldown' && (
            <StatusMessage 
              className="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Please wait 5 minutes before sending another message
            </StatusMessage>
          )}
        </ContactForm>
      </ContactGrid>

    </ContactPage>
  );
};
;export default Contact;
