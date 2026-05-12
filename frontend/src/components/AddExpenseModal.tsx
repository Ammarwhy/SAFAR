import React, { useState } from 'react';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (amount: number, category: string) => void;
  loading?: boolean;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ isOpen, onClose, onAdd, loading }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Dining');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    onAdd(Number(amount), category);
    setAmount('');
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(37, 24, 22, 0.6)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.3s ease-out'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)',
          animation: 'slideUp 0.3s ease-out'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="h2" style={{ fontSize: '20px' }}>Add Expense</h2>
          <button 
            onClick={onClose}
            className="material-icons" 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label>Amount (PKR)</label>
            <input 
              type="text" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
              placeholder="0.00"
              autoFocus
              style={{ fontSize: '24px', fontWeight: 700, textAlign: 'center', padding: '16px' }}
            />
          </div>

          <div className="input-group">
            <label>Category</label>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                background: 'var(--bg)',
                fontFamily: 'inherit',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Dining">Dining</option>
              <option value="Transport">Transport</option>
              <option value="Stay">Stay</option>
              <option value="Activity">Activity</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ marginTop: '12px', padding: '12px', backgroundColor: 'var(--bg)', borderRadius: 'var(--radius-sm)', fontSize: '12px', color: 'var(--text-muted)' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="material-icons" style={{ fontSize: '16px' }}>info</span>
              This expense will be split equally among all trip participants.
            </p>
          </div>

          <button 
            type="submit" 
            className="premium-btn" 
            disabled={loading || !amount} 
            style={{ width: '100%', marginTop: '12px' }}
          >
            {loading ? 'Adding...' : 'Add to Ledger'}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default AddExpenseModal;
