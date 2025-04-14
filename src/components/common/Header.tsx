import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid #e9ecef;
`;

const Logo = styled(Link)`
  font-size: 1.75rem;
  font-weight: 700;
  color: #212529;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled.div<{ isOpen: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #212529;
  color: white;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  
  &:hover {
    background-color: #495057;
  }
`;

const DropdownMenu = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 180px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  color: #212529;
  text-decoration: none;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const LogoutButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  color: #dc3545;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const LoginButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #212529;
  color: white;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    background-color: #495057;
  }
`;

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Get user initials for the profile icon
  const getInitials = () => {
    if (user) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
    }
    return '';
  };
  
  return (
    <HeaderContainer>
      <Logo to="/">Lexigo</Logo>
      <Nav>
        {user ? (
          <>
            <ProfileIcon isOpen={menuOpen} onClick={toggleMenu}>
              {getInitials()}
            </ProfileIcon>
            <DropdownMenu isOpen={menuOpen}>
              <DropdownItem to="/profile">Profile</DropdownItem>
              <DropdownItem to="/favorites">Favorites</DropdownItem>
              <DropdownItem to="/flashcards">Flashcards</DropdownItem>
              <DropdownItem to="/quiz">Quizzes</DropdownItem>
              <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
            </DropdownMenu>
          </>
        ) : (
          <LoginButton to="/login">Log In</LoginButton>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 