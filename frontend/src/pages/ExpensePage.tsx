import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTripStore } from '../stores/tripStore';
import { useAuthStore } from '../stores/authStore';
import { calculateBalances, getSettlementSummary } from '../lib/expenseCalc';

const ExpensePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tripDetails, loadTripById, loading } = useTripStore();
  const { user } = useAuthStore();

  const details = id ? tripDetails[id] : null;

  useEffect(() => {
    if (id) {
      loadTripById(id);
    }
  }, [id, loadTripById]);

  if (loading && !details) return <div className="p-8">Auditing ledger...</div>;
  if (!details || !details.trip) return <div className="p-8">Trip not found</div>;

  const { trip, expenses, participants } = details;
  const participantIds = participants.map(p => p.user_id);
  
  // Format store expenses for the calc engine
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

  return (
    <div className="page-container animate-fade">
      <button 
        onClick={() => navigate(-1)} 
        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '32px', color: 'var(--text-muted)', fontWeight: 700 }}
      >
        <span className="material-icons">arrow_back</span>
        Back to Expedition
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
        <div className="space-y-8">
          <header>
            <h1 className="h1">{trip.title} Ledger</h1>
            <p className="body">Track group spending and split costs fairly.</p>
          </header>

          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="h2" style={{ fontSize: '18px' }}>Expenses</h3>
              <button className="premium-btn" style={{ padding: '8px 16px', fontSize: '12px' }}>+ Add Expense</button>
            </div>
            <div>
              {expenses.map((exp) => (
                <div key={exp.id} style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-icons" style={{ color: 'var(--brand)', fontSize: '20px' }}>
                        {exp.category === 'Dining' ? 'restaurant' : exp.category === 'Transport' ? 'directions_car' : 'receipt'}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontWeight: 800, fontSize: '14px' }}>{exp.category || 'General'}</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Paid by {participants.find(p => p.user_id === exp.paid_by_user_id)?.name || 'Someone'}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 800, color: 'var(--brand)' }}>PKR {Number(exp.amount_pkr).toLocaleString()}</p>
                    <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{exp.expense_date}</p>
                  </div>
                </div>
              ))}
              {expenses.length === 0 && (
                <div style={{ padding: '64px', textAlign: 'center', opacity: 0.5 }}>
                  <span className="material-icons" style={{ fontSize: '48px', marginBottom: '12px' }}>account_balance_wallet</span>
                  <p>No expenses logged yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="card" style={{ backgroundColor: 'var(--brand)', color: '#fff', padding: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '4px', opacity: 0.8 }}>Your Balance</h3>
            <p style={{ fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>{mySummary}</p>
            <div style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '16px' }}></div>
            <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', backgroundColor: '#fff', color: 'var(--brand)', fontWeight: 800, cursor: 'pointer' }}>
              Settle Up
            </button>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <h3 className="h2" style={{ fontSize: '18px', marginBottom: '20px' }}>Group Balances</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {participants.map(p => {
                const balance = balances[p.user_id] || 0;
                return (
                  <div key={p.user_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={p.profile_photo_url || `https://i.pravatar.cc/100?u=${p.user_id}`} alt="" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
                      <span style={{ fontWeight: 700, fontSize: '14px' }}>{p.name}</span>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '13px', color: balance >= 0 ? 'var(--brand)' : '#b91c1c' }}>
                      {balance >= 0 ? '+' : ''}PKR {balance.toFixed(0)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensePage;
