import { useNotificationStore } from '../stores/notificationStore';
import { useNavigate } from 'react-router-dom';

const NotificationContainer = () => {
  const { toasts, removeToast } = useNotificationStore();
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      left: '32px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      pointerEvents: 'none'
    }}>
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          onClick={() => {
            navigate('/chat');
            removeToast(toast.id);
          }}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(55, 27, 23, 0.1)',
            padding: '16px',
            borderRadius: '16px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            minWidth: '300px',
            maxWidth: '400px',
            cursor: 'pointer',
            pointerEvents: 'auto',
            animation: 'slideInLeft 0.3s ease-out'
          }}
        >
          <img 
            src={toast.avatarUrl || `https://i.pravatar.cc/100?u=${toast.senderName}`} 
            alt="" 
            style={{ width: '44px', height: '44px', borderRadius: '12px', objectFit: 'cover' }}
          />
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <p style={{ fontWeight: 800, fontSize: '14px', color: 'var(--brand)', marginBottom: '2px' }}>{toast.senderName}</p>
            <p style={{ fontSize: '13px', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {toast.content}
            </p>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); removeToast(toast.id); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <span className="material-icons" style={{ fontSize: '18px' }}>close</span>
          </button>
        </div>
      ))}

      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default NotificationContainer;
