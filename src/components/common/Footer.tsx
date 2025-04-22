import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 1.5rem 0;
  text-align: center;
  border-top: 1px solid #e9ecef;
  margin-top: 2rem;
  color: #6c757d;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: #495057;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Copyright = styled.p`
  font-size: 0.875rem;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink href="#about">About</FooterLink>
          <FooterLink href="#privacy">Privacy</FooterLink>
          <FooterLink href="#terms">Terms of Service</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </FooterLinks>
        <Copyright>
          &copy; {currentYear} Lexigo. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 