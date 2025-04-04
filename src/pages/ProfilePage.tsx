import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  FaUser as RawFaUser,
  FaEnvelope as RawFaEnvelope,
  FaLock as RawFaLock,
  FaSignOutAlt as RawFaSignOutAlt,
  FaChartBar as RawFaChartBar,
  FaStar as RawFaStar,
  FaBook as RawFaBook,
  FaCheck as RawFaCheck,
  FaEdit as RawFaEdit
} from 'react-icons/fa';

const FaUser = RawFaUser as unknown as React.FC;
const FaEnvelope = RawFaEnvelope as unknown as React.FC;
const FaLock = RawFaLock as unknown as React.FC;
const FaSignOutAlt = RawFaSignOutAlt as unknown as React.FC;
const FaChartBar = RawFaChartBar as unknown as React.FC;
const FaStar = RawFaStar as unknown as React.FC;
const FaBook = RawFaBook as unknown as React.FC;
const FaCheck = RawFaCheck as unknown as React.FC;
const FaEdit = RawFaEdit as unknown as React.FC;

import { useAuth } from '../hooks/useAuth';

// Styled components
const ProfileContainer = styled.div`
  padding: 2rem 0;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #212529;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const ProfileCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ProfileAvatar = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: #e9ecef;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border: 3px solid #0070f3;
  color: #0070f3;
  font-size: 2.5rem;
`;

const ProfileName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ProfileEmail = styled.p`
  color: #6c757d;
  margin-bottom: 0.25rem;
`;

const ProfileJoinDate = styled.p`
  color: #6c757d;
  font-size: 0.875rem;
`;

const ProfileActions = styled.div`
  margin-top: 1.5rem;
`;

const InfoList = styled.div`
  margin-top: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
`;

const InfoIcon = styled.div`
  color: #6c757d;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  min-width: 1.5rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.p`
  font-size: 0.875rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
`;

const InfoValue = styled.p`
  color: #212529;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #212529;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: #0070f3;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (min-width: 576px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0070f3;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #6c757d;
`;

const Form = styled.form`
  margin-top: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #212529;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  
  &:focus {
    border-color: #0070f3;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 112, 243, 0.25);
  }
`;

const SubmitButton = styled.button`
  display: inline-block;
  background-color: #0070f3;
  color: white;
  font-weight: 500;
  text-align: center;
  border: 1px solid transparent;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  
  &:hover {
    background-color: #0051a8;
  }
  
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  display: inline-block;
  background-color: #f8f9fa;
  color: #212529;
  font-weight: 500;
  text-align: center;
  border: 1px solid #dee2e6;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  margin-right: 1rem;
  
  &:hover {
    background-color: #e2e6ea;
    border-color: #dae0e5;
  }
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: #f8f9fa;
  color: #495057;
  border: none;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 0.5rem;
  width: 100%;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: #e9ecef;
  }
  
  &.danger {
    color: #dc3545;
    
    &:hover {
      background-color: #f8d7da;
    }
  }
`;

const PasswordFields = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
`;

const RecentActivityList = styled.div`
  margin-top: 1rem;
`;

const ActivityItem = styled.div`
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #f8f9fa;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ActivityDate = styled.div`
  font-size: 0.75rem;
  color: #6c757d;
  margin-bottom: 0.25rem;
`;

const ActivityDescription = styled.div`
  color: #212529;
  font-size: 0.875rem;
`;

// Mock user stats
const mockUserStats = {
  wordsLearned: 127,
  quizzesTaken: 15,
  favoriteWords: 43,
  streakDays: 7
};

// Mock recent activity
const mockRecentActivity = [
  {
    id: 1,
    type: 'quiz',
    description: 'Completed Vocabulary Quiz with 8/10 score',
    date: '2023-03-22T14:30:00Z'
  },
  {
    id: 2,
    type: 'favorite',
    description: 'Added "Ephemeral" to favorites',
    date: '2023-03-21T10:15:00Z'
  },
  {
    id: 3,
    type: 'search',
    description: 'Looked up "Ubiquitous" in dictionary',
    date: '2023-03-20T16:45:00Z'
  },
  {
    id: 4,
    type: 'login',
    description: 'Logged in from new device',
    date: '2023-03-19T09:30:00Z'
  }
];

// Format date for display
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
};

// Calculate time since registration
const calculateTimeSince = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    return `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
  }
};

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: 'Lexigo',
        lastName: 'Project :D',
        email: user.email || 'hello@lexigo.com',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [user, navigate]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Profile update:', formData);
    
    // Reset password fields and exit edit mode
    setFormData(prevData => ({
      ...prevData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!user) {
    return null; // This should be handled by the useEffect redirect
  }
  
  return (
    <ProfileContainer>
      <PageTitle>Your Profile</PageTitle>
      
      <ProfileGrid>
        <div>
          <ProfileCard>
            <ProfileHeader>
              <ProfileAvatar>
                <FaUser />
              </ProfileAvatar>
              <ProfileName>{formData.firstName} {formData.lastName}</ProfileName>
              <ProfileEmail>{formData.email}</ProfileEmail>
              <ProfileJoinDate>Member for {calculateTimeSince('2023-01-15T00:00:00Z')}</ProfileJoinDate>
            </ProfileHeader>
            
            {!isEditing && (
              <>
                <InfoList>
                  <InfoItem>
                    <InfoIcon>
                      <FaUser />
                    </InfoIcon>
                    <InfoContent>
                      <InfoLabel>Name</InfoLabel>
                      <InfoValue>{formData.firstName} {formData.lastName}</InfoValue>
                    </InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoIcon>
                      <FaEnvelope />
                    </InfoIcon>
                    <InfoContent>
                      <InfoLabel>Email</InfoLabel>
                      <InfoValue>{formData.email}</InfoValue>
                    </InfoContent>
                  </InfoItem>
                  <InfoItem>
                    <InfoIcon>
                      <FaLock />
                    </InfoIcon>
                    <InfoContent>
                      <InfoLabel>Password</InfoLabel>
                      <InfoValue>••••••••</InfoValue>
                    </InfoContent>
                  </InfoItem>
                </InfoList>
                
                <ProfileActions>
                  <ActionButton onClick={() => setIsEditing(true)}>
                    <FaEdit />
                    Edit Profile
                  </ActionButton>
                  <ActionButton className="danger" onClick={handleLogout}>
                    <FaSignOutAlt />
                    Logout
                  </ActionButton>
                </ProfileActions>
              </>
            )}
            
            {isEditing && (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                
                <PasswordFields>
                  <FormGroup>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Enter your current password to make changes"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="newPassword">New Password (optional)</Label>
                    <Input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Leave blank to keep current password"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat new password"
                    />
                  </FormGroup>
                </PasswordFields>
                
                <div>
                  <CancelButton type="button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </CancelButton>
                  <SubmitButton type="submit">
                    Save Changes
                  </SubmitButton>
                </div>
              </Form>
            )}
          </ProfileCard>
        </div>
        
        <div>
          <ProfileCard>
            <SectionTitle>
              <FaChartBar />
              Your Learning Stats
            </SectionTitle>
            
            <StatsGrid>
              <StatCard>
                <StatValue>{mockUserStats.wordsLearned}</StatValue>
                <StatLabel>Words Learned</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{mockUserStats.quizzesTaken}</StatValue>
                <StatLabel>Quizzes Taken</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{mockUserStats.favoriteWords}</StatValue>
                <StatLabel>Favorite Words</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{mockUserStats.streakDays}</StatValue>
                <StatLabel>Day Streak</StatLabel>
              </StatCard>
            </StatsGrid>
          </ProfileCard>
          
          <ProfileCard style={{ marginTop: '1.5rem' }}>
            <SectionTitle>
              <FaBook />
              Recent Activity
            </SectionTitle>
            
            <RecentActivityList>
              {mockRecentActivity.map(activity => (
                <ActivityItem key={activity.id}>
                  <ActivityDate>{formatDate(activity.date)}</ActivityDate>
                  <ActivityDescription>{activity.description}</ActivityDescription>
                </ActivityItem>
              ))}
            </RecentActivityList>
          </ProfileCard>
        </div>
      </ProfileGrid>
    </ProfileContainer>
  );
};

export default ProfilePage; 