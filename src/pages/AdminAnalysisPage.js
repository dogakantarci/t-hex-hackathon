import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import theme from '../theme/theme';
import Button from '../components/Button';
import axios from 'axios';

const AdminAnalysisPage = () => {
  const [analysisResult, setAnalysisResult] = useState([]);
  const [filter, setFilter] = useState('Tümü');

  const handleRunAnalysis = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/analyze');
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('AI analiz hatası:', error);
      alert('Analiz yapılamadı, lütfen daha sonra tekrar deneyin.');
    }
  };

  const getDecisionColor = (decision) => {
    return decision === 'KABUL' ? theme.colors.success : theme.colors.danger;
  };

  return (
    <PageWrapper>
      <h2 style={{ color: theme.colors.primary }}>AI Analizi</h2>
      <Button onClick={handleRunAnalysis}>AI Analizini Başlat</Button>

      {analysisResult.length > 0 && (
        <>
          {/* Filtre Butonları */}
          <div style={{ marginTop: theme.spacing.md, marginBottom: theme.spacing.md }}>
            <Button onClick={() => setFilter('Tümü')}>Tümü</Button>{' '}
            <Button onClick={() => setFilter('KABUL')}>Sadece KABUL</Button>{' '}
            <Button onClick={() => setFilter('RED')}>Sadece RED</Button>
          </div>

          {/* Sonuç Tablosu */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: theme.colors.secondary }}>
                <th style={styles.th}>Çalışan</th>
                <th style={styles.th}>Tarih</th>
                <th style={styles.th}>Karar</th>
                <th style={styles.th}>Gerekçe</th>
              </tr>
            </thead>
            <tbody>
              {analysisResult
                .filter((item) => filter === 'Tümü' || item.decision === filter)
                .map((item) => (
                  <tr key={item.id}>
                    <td style={styles.td}>{item.name}</td>
                    <td style={styles.td}>{item.dates}</td>
                    <td
                      style={{
                        ...styles.td,
                        color: getDecisionColor(item.decision),
                        fontWeight: 'bold',
                      }}
                    >
                      {item.decision}
                    </td>
                    <td style={styles.td}>{item.reason}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
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

export default AdminAnalysisPage;
