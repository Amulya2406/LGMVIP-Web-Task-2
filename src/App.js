import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width:auto;
  margin: 0 auto;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  background-color: #007bff;
  color: #fff;
`;

const BrandName = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: #007bff;
  }
`;

const UserGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const UserCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

const UserName = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  font-size: 0.8rem;
  color: #777;
  margin: 0;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
`;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://reqres.in/api/users?page=1');
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Navbar>
        <BrandName>KIA-TECH</BrandName>
        <Button onClick={getUsers}>Get Users</Button>
      </Navbar>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <UserGridContainer>
          {users.map((user) => (
            <UserCard key={user.id}>
              <Avatar src={user.avatar} alt={`Avatar of ${user.first_name}`} />
              <UserName>{`${user.first_name} ${user.last_name}`}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </UserCard>
          ))}
        </UserGridContainer>
      )}
    </Container>
  );
};

export default App;