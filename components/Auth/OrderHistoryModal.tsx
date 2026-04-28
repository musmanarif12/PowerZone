import React, { useState, useEffect } from 'react';
import { X, Package, CheckCircle, Clock } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '@/lib/authContext';
import styles from './OrderHistory.module.css';

interface OrderHistoryModalProps {
  onClose: () => void;
}

export default function OrderHistoryModal({ onClose }: OrderHistoryModalProps) {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', user.id)
        );
        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Client side sort
        data.sort((a: any, b: any) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });
        setOrders(data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        <div className={styles.header}>
          <Package size={24} className={styles.icon} />
          <h2>My Order History</h2>
        </div>
        
        <div className={styles.body}>
          {loading ? (
            <div className={styles.empty}>Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className={styles.empty}>You haven't placed any orders yet.</div>
          ) : (
            <div className={styles.orderList}>
              {orders.map(o => (
                <div key={o.id} className={styles.orderCard}>
                  <div className={styles.orderHead}>
                    <span className={styles.orderId}>{o.orderId}</span>
                    <span className={styles.orderDate}>{o.createdAt ? new Date(o.createdAt.toMillis()).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <div className={styles.orderItems}>
                    {o.items?.map((item: any, idx: number) => (
                      <div key={idx} className={styles.itemRow}>
                        <span className={styles.itemQty}>{item.quantity}x</span>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemPrice}>Rs {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.orderFoot}>
                    <div className={styles.status}>
                      {o.status === 'Done' ? (
                        <span className={styles.done}><CheckCircle size={14} /> Completed</span>
                      ) : (
                        <span className={styles.pending}><Clock size={14} /> Processing</span>
                      )}
                    </div>
                    <div className={styles.total}>
                      Total: Rs {o.totalPrice?.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
