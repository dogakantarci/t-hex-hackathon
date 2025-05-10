import React, { useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import theme from '../theme/theme';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [user, setUser] = useState(null);
  const [leaveBalance, setLeaveBalance] = useState(10); // Şimdilik sabit
  const [recentRequests, setRecentRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('user'));

    if (stored) {
      setUser(stored);

      if (stored.role === 'employee') {
        navigate('/admin/requests');
        return;
      }

      // Sadece çalışanlar için talepleri göster
      setRecentRequests([
        { id: 1, start: '2024-07-01', end: '2024-07-03', status: 'Onaylandı' },
        { id: 2, start: '2024-06-15', end: '2024-06-16', status: 'Bekliyor' },
        { id: 3, start: '2024-05-10', end: '2024-05-11', status: 'Reddedildi' },
      ]);
    }
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Onaylandı':
        return theme.colors.success;
      case 'Reddedildi':
        return theme.colors.danger;
      case 'Bekliyor':
      default:
        return theme.colors.warning;
    }
  };

  return (
    <PageWrapper>
      <h2 style={{ color: theme.colors.primary }}>
        Hoş geldiniz, {user?.username}
      </h2>
      <p style={{ fontWeight: 'bold' }}>
        Kalan izin hakkınız: <span style={{ color: theme.colors.success }}>{leaveBalance} gün</span>
      </p>

      <h3 style={{ marginTop: theme.spacing.lg }}>Son İzin Talepleriniz</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: theme.colors.secondary }}>
            <th style={styles.th}>Başlangıç</th>
            <th style={styles.th}>Bitiş</th>
            <th style={styles.th}>Durum</th>
          </tr>
        </thead>
        <tbody>
          {recentRequests.map((req) => (
            <tr key={req.id}>
              <td style={styles.td}>{req.start}</td>
              <td style={styles.td}>{req.end}</td>
              <td style={{ ...styles.td, color: getStatusColor(req.status), fontWeight: 'bold' }}>
                {req.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageWrapper>
  );
};

const styles = {
  th: {
    textAlign: 'left',
    padding: theme.spacing.sm,
    borderBottom: `2px solid ${theme.colors.primary}`,
    backgroundColor: theme.colors.secondary,
  },
  td: {
    padding: theme.spacing.sm,
    borderBottom: `1px solid ${theme.colors.secondary}`,
  },
};

export default EmployeeDashboard;
