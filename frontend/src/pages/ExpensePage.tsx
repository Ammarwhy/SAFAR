import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTripStore } from '../stores/tripStore';
import { useAuthStore } from '../stores/authStore';
import { calculateBalances, getSettlementSummary } from '../lib/expenseCalc';
import AddExpenseModal from '../components/AddExpenseModal';

const ExpensePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tripDetails, loadTripById, loading, addExpense, settleUp } = useTripStore();
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const details = id ? tripDetails[id] : null;

  useEffect(() => {
    if (id) {
      loadTripById(id);
    }
  }, [id, loadTripById]);

  if (loading && !details) return (
    <div className="page-container flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <span className="material-icons" style={{ fontSize: '48px', color: 'var(--brand)' }}>account_balance</span>
        <p className="h2" style={{ fontSize: '18px' }}>Auditing ledger...</p>
      </div>
    </div>
  );

  if (!details || !details.trip) return (
    <div className="page-container p-12 text-center">
      <h2 className="h2">Trip not found</h2>
      <button onClick={() => navigate('/')} className="section-link mt-4">Back to Home</button>
    </div>
  );

  const { trip, expenses, participants } = details;
  const participantIds = participants.map(p => p.user_id);
  
  const formattedExpenses = expenses.map(e => ({
    id: e.id,
    paidByUserId: e.paid_by_user_id || '',
    amountPKR: Number(e.amount_pkr) || 0,
    splitMethod: (e.split_method as any) || 'Equal',
    splitData: e.split_data,
    participants: participantIds
  }));

  const balances = calculateBalances(formattedExpenses, participantIds);
  const mySummary = user ? getSettlementSummary(balances, user.id) : '';
  const myBalance = user ? (balances[user.id] || 0) : 0;

  const handleAddExpense = async (amount: number, category: string) => {
    if (id) {
      await addExpense(id, amount, category, 'Equal');
    }
  };

  const handleSettleUp = async () => {
    if (id && window.confirm('Are you sure you want to settle up? This will create a settlement record.')) {
      await settleUp(id);
    }
  };

  return (
    <div className="page-container animate-fade custom-scrollbar">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <button 
          onClick={() => navigate(-1)} 
          className="section-link"
          style={{ marginBottom: '40px', padding: '10px 20px', borderRadius: '14px' }}
        >
          Back to Expedition
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '48px' }}>
          <div className="space-y-8">
            <header style={{ marginBottom: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span className="material-icons" style={{ color: 'var(--brand)', fontSize: '28px' }}>receipt_long</span>
                <h1 className="h1" style={{ margin: 0 }}>{trip.title} Ledger</h1>
              </div>
              <p className="body" style={{ opacity: 0.8 }}>Track group spending and split costs fairly among {participants.length} travelers.</p>
            </header>

            <div className="card" style={{ padding: 0, border: 'none', boxShadow: 'var(--shadow-md)', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)' }}>
              <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="h2" style={{ fontSize: '18px', margin: 0 }}>Recent Expenses</h3>
                <button 
                  className="premium-btn" 
                  style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '12px' }}
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="material-icons" style={{ fontSize: '18px' }}>add</span>
                  Add Expense
                </button>
              </div>
              <div className="custom-scrollbar" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {expenses.length > 0 ? (
                  [...expenses].reverse().map((exp) => (
                    <div key={exp.id} style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.2s' }}>
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ 
                          width: '48px', 
                          height: '48px', 
                          borderRadius: '14px', 
                          backgroundColor: (exp.category === 'Other' && exp.split_method === 'Custom') ? 'var(--brand)' : 'var(--bg)', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          <span className="material-icons" style={{ color: (exp.category === 'Other' && exp.split_method === 'Custom') ? '#fff' : 'var(--brand)', fontSize: '24px' }}>
                            {exp.category === 'Dining' ? 'restaurant' : 
                             exp.category === 'Transport' ? 'directions_car' : 
                             exp.category === 'Stay' ? 'hotel' :
                             exp.category === 'Activity' ? 'local_activity' :
                             (exp.category === 'Other' && exp.split_method === 'Custom') ? 'handshake' : 'receipt'}
                          </span>
                        </div>
                        <div>
                          <p style={{ fontWeight: 800, fontSize: '15px', color: 'var(--text-primary)' }}>{exp.category || 'General'}</p>
                          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                            {(exp.category === 'Other' && exp.split_method === 'Custom') ? 
                              `Settled by ${participants.find(p => p.user_id === exp.paid_by_user_id)?.name || 'Someone'}` :
                              `Paid by ${participants.find(p => p.user_id === exp.paid_by_user_id)?.name || 'Someone'}`
                            }
                          </p>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 900, color: (exp.category === 'Other' && exp.split_method === 'Custom') ? 'var(--text-secondary)' : 'var(--brand)', fontSize: '16px' }}>
                          PKR {Number(exp.amount_pkr).toLocaleString()}
                        </p>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{exp.expense_date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '80px 32px', textAlign: 'center', opacity: 0.6 }}>
                    <div style={{ 
                      width: '80px', 
                      height: '80px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--bg)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      margin: '0 auto 24px'
                    }}>
                      <span className="material-icons" style={{ fontSize: '40px', color: 'var(--brand)' }}>account_balance_wallet</span>
                    </div>
                    <p className="h2" style={{ fontSize: '20px', marginBottom: '8px' }}>Clean Slate!</p>
                    <p className="body" style={{ fontSize: '14px' }}>No expenses logged yet. Start splitting costs with your group.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="card" style={{ 
              backgroundColor: 'var(--brand)', 
              color: '#fff', 
              padding: '40px 32px', 
              border: 'none', 
              boxShadow: 'var(--shadow-lg)',
              backgroundImage: 'linear-gradient(135deg, var(--brand) 0%, #4A2823 100%)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '8px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>Personal Summary</h3>
                <p style={{ fontSize: '32px', fontWeight: 900, lineHeight: 1.2, marginBottom: '24px' }}>{mySummary}</p>
                <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.15)', marginBottom: '24px' }}></div>
                
                <button 
                  onClick={handleSettleUp}
                  disabled={Math.abs(myBalance) < 1}
                  style={{ 
                    width: '100%', 
                    padding: '16px', 
                    borderRadius: '14px', 
                    border: 'none', 
                    backgroundColor: '#fff', 
                    color: 'var(--brand)', 
                    fontWeight: 800, 
                    fontSize: '15px',
                    cursor: Math.abs(myBalance) < 1 ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s',
                    opacity: Math.abs(myBalance) < 1 ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span className="material-icons" style={{ fontSize: '20px' }}>handshake</span>
                  Settle Up
                </button>
              </div>
              
              {/* Decorative elements */}
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', bottom: '-40px', left: '-20px', width: '150px', height: '150px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
            </div>

            <div className="card" style={{ padding: '32px', border: 'none', boxShadow: 'var(--shadow-md)', background: 'var(--bg-card)' }}>
              <h3 className="h2" style={{ fontSize: '18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="material-icons" style={{ fontSize: '20px', color: 'var(--brand)' }}>groups</span>
                Group Balances
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {participants.map(p => {
                  const balance = balances[p.user_id] || 0;
                  const isPositive = balance > 0;
                  const isZero = Math.abs(balance) < 1;
                  
                  return (
                    <div key={p.user_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ position: 'relative' }}>
                          <img 
                            src={p.profile_photo_url || `https://i.pravatar.cc/100?u=${p.user_id}`} 
                            alt="" 
                            style={{ width: '40px', height: '40px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--bg)' }} 
                          />
                          {p.user_id === user?.id && (
                            <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%', border: '2px solid #fff' }}></div>
                          )}
                        </div>
                        <div>
                          <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>{p.name} {p.user_id === user?.id ? '(You)' : ''}</span>
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{isZero ? 'Settled' : isPositive ? 'Is owed' : 'Owes'}</p>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ 
                          fontWeight: 900, 
                          fontSize: '14px', 
                          color: isZero ? 'var(--text-muted)' : isPositive ? '#059669' : '#dc2626',
                          backgroundColor: isZero ? 'var(--bg)' : isPositive ? 'rgba(5, 150, 105, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                          padding: '4px 10px',
                          borderRadius: '8px'
                        }}>
                          {isZero ? '' : isPositive ? '+' : ''}PKR {Math.abs(balance).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddExpenseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddExpense}
        loading={loading}
      />
    </div>
  );
};

export default ExpensePage;
