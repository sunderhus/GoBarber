import React from 'react';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <>
      <h1>DashBoard</h1>
      <button type="button" onClick={signOut}>
        voltar
      </button>
    </>
  );
};

export default Dashboard;
