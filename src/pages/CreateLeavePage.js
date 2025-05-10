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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role === 'admin') {
      navigate('/admin/requests');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      startDate,
      endDate,
      reason,
    };
  
    try {
      // Simüle edilmiş API isteği
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      alert('İzin talebiniz başarıyla gönderildi! (Fake API)');
      console.log('Sahte gönderilen veri:', data);
  
      setStartDate('');
      setEndDate('');
      setReason('');
    } catch (error) {
      console.error('Simüle edilmiş hata:', error);
      alert('Bir hata oluştu, lütfen tekrar deneyin.');
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
