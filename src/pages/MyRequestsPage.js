import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import theme from '../theme/theme';
import axios from 'axios';


const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'employee') {
  navigate('/');
}

  }, [navigate]);

  useEffect(() => {
  axios.get('http://localhost:3001/api/leaves', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })
  .then((response) => {
    setRequests(response.data); // ❗ Eksik olan kısım burası
  })
  .catch((error) => {
    console.error('İzin talepleri alınamadı:', error);
  });
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
      <h2 style={{ color: theme.colors.primary }}>Tüm İzin Taleplerim</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: theme.colors.secondary }}>
            <th style={styles.th}>Başlangıç</th>
            <th style={styles.th}>Bitiş</th>
            <th style={styles.th}>Durum</th>
            <th style={styles.th}>Açıklama</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td style={styles.td}>{req.start}</td>
              <td style={styles.td}>{req.end}</td>
              <td style={{ ...styles.td, color: getStatusColor(req.status), fontWeight: 'bold' }}>
                {req.status}
              </td>
              <td style={styles.td}>{req.reason}</td>
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

export default MyRequestsPage;
