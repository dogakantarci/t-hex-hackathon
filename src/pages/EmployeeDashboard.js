import React, { useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import theme from '../theme/theme';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [user, setUser] = useState(null);
  const [leaveBalance, setLeaveBalance] = useState(10); // Şimdilik sabit
  const [recentRequests, setRecentRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const stored = JSON.parse(localStorage.getItem('user'));

  if (stored) {
    setUser(stored);

    if (stored.role === 'admin') {
      navigate('/admin/requests');
      return;
    }

    const token = localStorage.getItem('token');

    // 🟢 Kalan izin gününü getir
    axios.get("http://localhost:3001/api/employees/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setLeaveBalance(res.data.remainingDays);
    });

    // 🟢 İzin taleplerini getir
    axios.get("http://localhost:3001/api/leaves", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setRecentRequests(res.data);
    })
    .catch((err) => {
      console.error("İzin verisi alınamadı:", err);
    });
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
      Hoş geldiniz, {user?.name || "Kullanıcı"}
      </h2>


      <p style={{ fontWeight: 'bold' }}>
        Kalan izin hakkınız: <span style={{ color: theme.colors.success }}>{leaveBalance} gün</span>
      </p>

      {/* ✅ Yeni izin talebi için buton */}
      <button onClick={() => navigate('/create-leave')} style={{ marginTop: 10 }}>
        Yeni İzin Talebi Oluştur
      </button>

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
              <td style={styles.td}>{req.startDate?.split("T")[0]}</td>
              <td style={styles.td}>{req.endDate?.split("T")[0]}</td>
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
