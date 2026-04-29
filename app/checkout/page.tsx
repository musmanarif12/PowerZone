'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { useAuth } from '@/lib/authContext';
import AuthModal from '@/components/Auth/AuthModal';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from './CheckoutPage.module.css';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart, updateQty } = useCart();
  const { user, isLoaded } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    mobile: '',
    email: '',
    country: 'Pakistan',
    notes: '',
  });

  const shipment = 200;
  const finalTotal = totalPrice + shipment;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    // Order ID generation
    const orderId = `PZ-${Math.floor(Math.random() * 1000000)}`;

    try {
      await addDoc(collection(db, 'orders'), {
        orderId,
        userId: user?.id,
        customerInfo: form,
        items: cart,
        totalItems: cart.reduce((sum, i) => sum + i.quantity, 0),
        subtotal: totalPrice,
        shipping: shipment,
        totalPrice: finalTotal,
        paymentMethod: 'Bank Transfer',
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    const cartSummary = cart.map(item => `${item.quantity}x ${item.name}`).join('\n');
    
    const msg = encodeURIComponent(
      `*New Order: ${orderId}*\n\n` +
      `*Customer Info*\n` +
      `Name: ${form.name}\nPhone: ${form.mobile}\nAddress: ${form.address}, ${form.city}\n\n` +
      `*Order Details*\n${cartSummary}\n\n` +
      `Subtotal: Rs ${totalPrice.toLocaleString()}\n` +
      `Shipping: Rs ${shipment.toLocaleString()}\n` +
      `*Total: Rs ${finalTotal.toLocaleString()}*\n\n` +
      `*Payment Method:* Bank Transfer`
    );

    alert("Order recorded. Redirecting to WhatsApp to send receipt and payment proof.");
    clearCart();
    window.open(`https://wa.me/923044603006?text=${msg}`, '_blank');
    router.push('/');
  };

  if (!isLoaded) return null;
  
  return (
    <>
      {!user && <AuthModal onClose={() => router.push('/')} onSuccess={() => {}} />}
      <div className={styles.page} style={{ opacity: !user ? 0.6 : 1, pointerEvents: !user ? 'none' : 'auto' }}>
        <div className={`${styles.inner} container`}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ArrowLeft size={16} /> Back to Store
        </button>

        <form className={styles.checkoutForm} onSubmit={handleSubmit}>
          
          {/* Step 1: Billing */}
          <div className={styles.step}>
            <div className={styles.stepHeader}>
              <span className={styles.stepNum}>1.</span>
              <h2>Billing details</h2>
            </div>
            
            <div className={styles.fields}>
              <div className={styles.field}>
                <label>Name *</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Enter Your Full Name Here" />
              </div>
              <div className={styles.field}>
                <label>Full Address *</label>
                <input required value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="House number, street name, area, landmark" />
              </div>
              <div className={styles.field}>
                <label>City *</label>
                <input required value={form.city} onChange={e => setForm({...form, city: e.target.value})} placeholder="City name" />
              </div>
              <div className={styles.field}>
                <label>Mobile Number (11 digit) *</label>
                <input required value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})} placeholder="03xxxxxxxxx" />
              </div>
              <div className={styles.field}>
                <label>Email address *</label>
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className={styles.field}>
                <label>Country / Region *</label>
                <select value={form.country} onChange={e => setForm({...form, country: e.target.value})}>
                  <option value="Pakistan">Pakistan</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Order notes (optional)</label>
                <textarea rows={3} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} placeholder="Notes about your order, e.g. special notes for delivery."></textarea>
              </div>
            </div>
          </div>

          {/* Step 2: Order Summary */}
          <div className={styles.step}>
             <div className={styles.stepHeader}>
              <span className={styles.stepNum}>2.</span>
              <h2>Check Your Order</h2>
            </div>

            <div className={styles.orderSummary}>
              <div className={styles.summaryHeader}>
                <span>PRODUCT</span>
                <span>SUBTOTAL</span>
              </div>
              
              <div className={styles.cartItems}>
                {cart.length === 0 ? (
                  <p className={styles.emptyCart}>Your cart is empty.</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                      <div className={styles.itemInfo}>
                        <img src={item.image} alt={item.name} className={styles.itemImage} />
                        <div className={styles.itemText}>
                          <span className={styles.itemBrandName}>{item.brand} | {item.name}</span>
                          <div className={styles.qtyControls}>
                            <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
                          </div>
                        </div>
                      </div>
                      <div className={styles.itemSub}>Rs {(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))
                )}
              </div>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span className={styles.priceVal}>Rs {totalPrice.toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipment</span>
                <div className={styles.summaryRightText}>
                  <span className={styles.shipmentLabel}>Flat Delivery Charges:</span>
                  <span className={styles.priceVal}>Rs {shipment.toLocaleString()}</span>
                </div>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span className={styles.priceTotal}>Rs {finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Step 3: Payment */}
          <div className={styles.step}>
             <div className={styles.stepHeader}>
              <span className={styles.stepNum}>3.</span>
              <h2>Payment Information</h2>
            </div>

            <div className={styles.paymentBox}>
              <label className={styles.radioBlock}>
                <input type="radio" checked readOnly />
                <span className={styles.radioText}>Bank Transfer</span>
              </label>

              <div className={styles.bankDetails}>
                <p>Make your payment directly into our bank account. Please share screenshot of transaction slip with your order ID at whatsapp <strong>+92 304-4603006</strong> or email at <strong>info@powerzone.pk</strong>. Your order will not be dispatched until the amount has cleared in our bank account.</p>
                
                <div className={styles.bankAccountInfo}>
                  <p><strong>Title:</strong> PowerZone Gym & Supplements</p>
                  <p><strong>Account Number:</strong> 99100103441648</p>
                  <p><strong>Bank:</strong> Meezan Bank</p>
                  <p><strong>IBAN Number:</strong> PK24MEZN0099100103441648</p>
                </div>
              </div>

              <button type="submit" className={styles.placeOrderBtn}>PLACE ORDER</button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  </>
);
}
