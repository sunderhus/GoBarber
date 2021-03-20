import React, { useCallback } from 'react';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);
  return (
    <>
      <h1>DashBoard</h1>
      <button type="button" onClick={handleSignOut}>
        voltar
      </button>
    </>
  );
};

export default Dashboard;
