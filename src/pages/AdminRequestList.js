import React, { useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import theme from '../theme/theme';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminRequestList = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || user?.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    axios.get("http://localhost:3001/api/leaves/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => setRequests(res.data))
      .catch((err) => console.error("İzin talepleri alınamadı:", err));
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Onaylandı': return theme.colors.success;
      case 'Reddedildi': return theme.colors.danger;
      case 'Bekliyor':
      default: return theme.colors.warning;
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`http://localhost:3001/api/leaves/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
      alert(`✅ İzin durumu "${newStatus}" olarak güncellendi.`);
    } catch (err) {
      console.error("Durum güncellenemedi:", err);
      alert("Durum güncellenirken bir hata oluştu.");
    }
  };

const handleAIAnalysis = async (req) => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.post("http://localhost:3001/api/ai/advise", {
      employee: {
        name: req.Employee?.name || "Bilinmiyor",
        department: req.Employee?.department || "Bilinmiyor",
        position: req.Employee?.position || "Bilinmiyor",
        startDate: req.Employee?.startDate || "Bilinmiyor",
        remainingDays: req.Employee?.remainingDays ?? 0,
      },
      leaveRequest: {
        startDate: req.startDate,
        endDate: req.endDate,
        reason: req.reason || "Belirtilmemiş",
      },
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const advice = res.data?.advice;
    const aiMessage = typeof advice === "string"
      ? advice
      : typeof advice === "object"
        ? advice.advice || JSON.stringify(advice, null, 2)
        : String(advice);

    alert("🧠 AI Önerisi:\n\n" + aiMessage);

  } catch (err) {
    console.error("AI önerisi alınamadı:", err);
    alert("AI önerisi alınamadı.");
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
            <th style={styles.th}>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td style={styles.td}>{req.Employee?.name || "-"}</td>
              <td style={styles.td}>{req.Employee?.department || "-"}</td>
              <td style={styles.td}>{req.startDate?.split("T")[0]}</td>
              <td style={styles.td}>{req.endDate?.split("T")[0]}</td>
              <td style={{ ...styles.td, color: getStatusColor(req.status), fontWeight: 'bold' }}>
                {req.status}
              </td>
              <td style={styles.td}>
                <div style={styles.buttonGroup}>
                  <button onClick={() => handleStatusChange(req.id, "Onaylandı")}>✅ Onayla</button>
                  <button onClick={() => handleStatusChange(req.id, "Reddedildi")}>❌ Reddet</button>
                  <button onClick={() => handleAIAnalysis(req)}>🧠 AI Öner</button>
                </div>
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
  buttonGroup: {
    display: "flex",
    gap: "8px",
  }
};

export default AdminRequestList;
