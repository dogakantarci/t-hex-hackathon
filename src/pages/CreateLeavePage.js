import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import Button from '../components/Button';
import theme from '../theme/theme';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateLeavePage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  // ✅ Giriş kontrolü
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token:", token);
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
      alert("Lütfen önce giriş yapın.");
      navigate("/");
      return;
    }

    if (user.role === 'admin') {
      navigate('/admin/requests');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const data = {
      startDate,
      endDate,
      reason,
    };

    try {
      const response = await axios.post("http://localhost:3001/api/leaves", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('İzin talebiniz başarıyla gönderildi!');
      console.log('Sunucuya gönderilen veri:', response.data);

      // Formu temizle
      setStartDate('');
      setEndDate('');
      setReason('');
      navigate("/my-requests");

    } catch (error) {
      console.error('Gerçek hata:', error);
      alert(error.response?.data?.message || 'Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  return (
    <PageWrapper>
      <h2 style={{ color: theme.colors.primary }}>İzin Talep Et</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
        <label>
          Başlangıç Tarihi:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>

        <label>
          Bitiş Tarihi:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>

        <label>
          Açıklama:
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows="4"
            required
          />
        </label>

        <Button type="submit">İzin Talebini Gönder</Button>
      </form>
    </PageWrapper>
  );
};

export default CreateLeavePage;
