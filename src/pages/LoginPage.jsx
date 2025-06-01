import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../utils/auth';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      const user = await googleLogin();
      if (user) {
        navigate('/');
      }
    };
    handleLogin();
  }, [navigate]);

  return (
    <div className="login-page">
      <h1>Login</h1>
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
