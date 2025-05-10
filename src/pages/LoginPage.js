import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import theme from '../theme/theme';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password || !role) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ username, role }));

    if (role === 'admin') {
      navigate('/admin/requests');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <PageWrapper>
      <h2 style={{ color: theme.colors.primary }}>Talenteer Giriş</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
        <input
          type="text"
          placeholder="Kullanıcı adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Rol Seçiniz</option>
          <option value="employee">Çalışan</option>
          <option value="admin">İK (Admin)</option>
        </select>

        <Button type="submit">Giriş Yap</Button>
      </form>
    </PageWrapper>
  );
};

export default LoginPage;
