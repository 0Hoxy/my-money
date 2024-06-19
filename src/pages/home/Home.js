import React, { useState } from 'react';
import styles from './Home.module.css';
import TransactionForm from './TransactionForm';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import TransactionList from './TransactionList';

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('transactions', ["uid", "==", user.uid]);
  const [sortOrder, setSortOrder] = useState('latest'); // 기본 정렬 기준 설정

  // 정렬 함수
  const sortTransactions = (transactions) => {
    if (!transactions) return [];

    const sorted = [...transactions]; // 원본 배열을 복사하여 정렬
    if (sortOrder === 'latest') {
      return sorted.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortOrder === 'cost') {
      return sorted.sort((a, b) => b.amount - a.amount);
    } else if (sortOrder === 'alphabetical') {
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  };


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className={styles.select}
        >
          <option value="latest">최신순</option>
          <option value="cost">비용순</option>
          <option value="alphabetical">가나다순</option>
        </select>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={sortTransactions(documents)} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
