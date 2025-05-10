import React, { useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import theme from '../theme/theme';
import { useNavigate } from 'react-router-dom';

const AdminRequestList = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  // Admin olmayanları yönlendir
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role !== 'admin') {
      navigate('/dashboard'); // sadece admin girebilir
    }
  }, [navigate]);

  // Sahte veri yükle
  useEffect(() => {
    setRequests([
      {
        id: 1,
        name: 'Ahmet Yılmaz',
        department: 'Mühendislik',
        start: '2024-07-01',
        end: '2024-07-03',
        status: 'Onaylandı',
      },
      {
        id: 2,
        name: 'Zeynep Demir',
        department: 'Şantiye Yönetimi',
        start: '2024-06-10',
        end: '2024-06-12',
        status: 'Bekliyor',
      },
      {
        id: 3,
        name: 'Mehmet Kaya',
        department: 'Kalite Kontrol',
        start: '2024-05-01',
        end: '2024-05-03',
        status: 'Reddedildi',
      },
    ]);
  }, []);

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
      <h2 style={{ color: theme.colors.primary }}>Tüm İzin Talepleri</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: theme.colors.secondary }}>
            <th style={styles.th}>Çalışan</th>
            <th style={styles.th}>Departman</th>
            <th style={styles.th}>Başlangıç</th>
            <th style={styles.th}>Bitiş</th>
            <th style={styles.th}>Durum</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td style={styles.td}>{req.name}</td>
              <td style={styles.td}>{req.department}</td>
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
  },
  td: {
    padding: theme.spacing.sm,
    borderBottom: `1px solid ${theme.colors.secondary}`,
  },
};

export default AdminRequestList;
