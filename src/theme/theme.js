const theme = {
    colors: {
      primary: '#1e88e5',
      secondary: '#f5f5f5',
      text: '#333',
      background: '#ffffff',
      success: '#4caf50',
      danger: '#f44336',
      warning: '#ff9800',
      white: '#ffffff',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '32px',
    },
    borderRadius: '8px',
    fontFamily: `'Segoe UI', sans-serif`,
  
    // 🎯 Yeni eklenen tematik alanlar:
    navbar: {
      backgroundColor: '#1e88e5',
      color: '#ffffff',
      padding: '16px',
    },
    link: {
      color: '#ffffff',
      textDecoration: 'none',
      fontWeight: 'bold',
      marginRight: '16px',
    },
    button: {
      primary: {
        backgroundColor: '#1e88e5',
        color: '#ffffff',
        borderRadius: '8px',
        padding: '8px 16px',
      },
      outlineLight: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        border: '1px solid white',
        borderRadius: '6px',
        padding: '6px 12px',
      }
    }
  };
  
  export default theme;
  