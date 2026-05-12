export interface Expense {
  id: string;
  paidByUserId: string;
  amountPKR: number;
  splitMethod: 'Equal' | 'Custom' | 'Payer-only' | 'Settlement';
  splitData?: Record<string, number>; // for Custom splits: { "userId": amount }
  participants: string[]; // userIds involved in the split
}

export function calculateBalances(expenses: Expense[], participants: string[]): Record<string, number> {
  const balances: Record<string, number> = {};
  participants.forEach(p => balances[p] = 0);

  expenses.forEach(expense => {
    const { paidByUserId, amountPKR, splitMethod, splitData, participants: involved } = expense;
    
    if (balances[paidByUserId] === undefined) balances[paidByUserId] = 0;
    balances[paidByUserId] += amountPKR;

    if (splitMethod === 'Equal') {
      const share = amountPKR / involved.length;
      involved.forEach(userId => {
        if (balances[userId] === undefined) balances[userId] = 0;
        balances[userId] -= share;
      });
    } else if (splitMethod === 'Custom' && splitData) {
      Object.entries(splitData).forEach(([userId, amount]) => {
        if (balances[userId] === undefined) balances[userId] = 0;
        balances[userId] -= amount;
      });
    }
    else if (splitMethod === 'Payer-only') {
      balances[paidByUserId] -= amountPKR; 
    }
    else if (splitMethod === 'Settlement' && splitData) {
      // splitData should be { [recipientId]: amount }
      Object.entries(splitData).forEach(([recipientId, amount]) => {
        if (balances[recipientId] === undefined) balances[recipientId] = 0;
        balances[recipientId] -= amount;
      });
    }
  });

  return balances;
}

export function getSettlementSummary(balances: Record<string, number>, currentUserId: string): string {
  const myBalance = balances[currentUserId] || 0;
  if (Math.abs(myBalance) < 1) return "You are settled up!";
  if (myBalance < 0) return `You owe PKR ${Math.abs(myBalance).toFixed(2)}`;
  return `Others owe you PKR ${myBalance.toFixed(2)}`;
}
