import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import theme from '../theme/theme';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null; // Giriş yapılmamışsa menü gösterme

  return (
    <nav style={styles.navbar}>
      <span style={styles.username}>👤 {user.username}</span>

      {user.role === 'employee' && (
        <>
          <Link to="/dashboard" style={styles.link}>Dashboard</Link>
          <Link to="/create-leave" style={styles.link}>İzin Talep Et</Link>
          <Link to="/my-requests" style={styles.link}>Taleplerim</Link>
        </>
      )}

      {user.role === 'admin' && (
        <>
          <Link to="/admin/requests" style={styles.link}>Tüm Talepler</Link>
          <Link to="/admin/analysis" style={styles.link}>AI Analiz</Link>
        </>
      )}

      <button onClick={handleLogout} style={styles.logout}>Çıkış</button>
    </nav>
  );
};

const styles = {
    navbar: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing.md,
      padding: theme.navbar.padding,
      backgroundColor: theme.navbar.backgroundColor,
      color: theme.navbar.color,
      justifyContent: 'space-between',
    },
    link: theme.link,
    logout: theme.button.outlineLight,
    username: {
      fontWeight: 'bold',
      marginRight: 'auto',
    },
  };
  

export default Navbar;
