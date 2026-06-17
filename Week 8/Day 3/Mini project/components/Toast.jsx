import { useWeather } from '../hooks/useWeather';

function Toast({ message, type }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        background: type === 'error' ? '#ef4444' : '#10b981',
        color: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        animation: 'slideIn 0.3s ease-out',
      }}
    >
      {message}
    </div>
  );
}

export default Toast;
