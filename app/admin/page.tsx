'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Package, TrendingUp, AlertTriangle, LogOut, RefreshCw, Users, ShoppingBag, CheckCircle, Settings, Minus } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { useAdmin } from '@/lib/adminContext';
import { Product } from '@/lib/products';
import styles from './AdminPage.module.css';

const dataUrlToBlob = (dataUrl: string) => {
  const parts = dataUrl.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
};

const EMPTY_FORM: Omit<Product, 'id'> = {
// ... existing EMPTY_FORM ...
  name: '',
  brand: '',
  category: 'Whey Protein',
  price: 0,
  originalPrice: 0,
  image: '',
  badge: null,
  inStock: true,
  rating: 5,
  reviews: 0,
  description: '',
  isOnWebsite: true,
  isOnStore: true,
};

export default function AdminPage() {
  const { 
    products, addProduct, updateProduct, deleteProduct,
    brands, categories,
    addBrand, updateBrand, deleteBrand,
    addCategory, updateCategory, deleteCategory
  } = useAdmin();
  const [tab, setTab] = useState<'cms' | 'orders' | 'users' | 'config'>('cms');
  const [form, setForm] = useState<Omit<Product, 'id'>>({ ...EMPTY_FORM, category: categories[0] || 'Whey Protein' });
  const [editId, setEditId] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [fileKey, setFileKey] = useState(Date.now());
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true); // Default collapsed on mobile

  // AUTH STATE
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === (process.env.NEXT_PUBLIC_ADMIN_USER || 'powerzone') && 
        password === (process.env.NEXT_PUBLIC_ADMIN_PASS || 'bilal123*')) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const [dbOrders, setDbOrders] = useState<any[]>([]);
  const [dbUsers, setDbUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchDB = async () => {
      try {
        const oSnap = await getDocs(collection(db, 'orders'));
        const uSnap = await getDocs(collection(db, 'users'));
        setDbOrders(oSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a: any, b: any) => {
           const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
           const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
           return timeB - timeA;
        }));
        setDbUsers(uSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a: any, b: any) => {
          const getTime = (val: any) => {
            if (!val) return 0;
            if (val.toMillis) return val.toMillis();
            return new Date(val).getTime() || 0;
          };
          return getTime(b.createdAt) - getTime(a.createdAt);
        }));
      } catch (e) {
        console.error("Error fetching db", e);
      }
    };
    fetchDB();
  }, [isAuthenticated, tab]);

  const handleMarkDone = async (id: string) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status: 'Done' });
      setDbOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Done' } : o));
    } catch (e) {
      console.error('Error marking done', e);
    }
  };

  const handleDeleteOrder = async (id: string) => {
    if (!confirm('Are you sure you want to completely delete this order?')) return;
    try {
      await deleteDoc(doc(db, 'orders', id));
      setDbOrders(prev => prev.filter(o => o.id !== id));
    } catch (e) {
      console.error('Error deleting order', e);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to completely delete this user?')) return;
    try {
      await deleteDoc(doc(db, 'users', id));
      setDbUsers(prev => prev.filter(u => u.id !== id));
    } catch (e) {
      console.error('Error deleting user', e);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.image.trim() || form.price <= 0) {
      alert('Please fill in product name, image URL, and price.');
      return;
    }
    
    setIsSubmitting(true);
    setSuccess('🚀 Saving to Database...');
    try {
      const finalProduct = { ...form, id: editId || `prod-${Date.now()}` };
      
      if (editId) {
        await updateProduct(finalProduct);
        setSuccess('✅ Success! Changes are live.');
        setEditId(null);
      } else {
        await addProduct(finalProduct);
        setSuccess('✅ Success! New product added.');
      }
      setForm(EMPTY_FORM);
      setFileKey(Date.now());
      setTimeout(() => setSuccess(''), 5000);
    } catch (err: any) {
      console.error("WRITE ERROR:", err);
      alert('Error: Database write failed. This is usually due to Firestore usage limits or broken rules.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 480; 
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
        setForm(prev => ({ ...prev, image: dataUrl }));
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (p: Product) => {
    setEditId(p.id);
    const { id, ...rest } = p;
    setForm(rest);
    setFileKey(Date.now());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatPrice = (p: number) => `Rs ${p.toLocaleString('en-PK')}`;
  const activeCount = products.filter(p => p.inStock).length;

  const groupedByCat = categories.reduce((acc, cat) => {
    acc[cat] = products.filter(p => p.category === cat);
    return acc;
  }, {} as Record<string, Product[]>);

  if (!isAuthenticated) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginMain}>
          <div className={styles.loginBrand}>⚡ PowerZone Admin</div>
          <h1 className={styles.loginTitle}>Welcome Back</h1>
          <p className={styles.loginSub}>Enter your credentials to access the store dashboard.</p>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            {loginError && <div className={styles.loginError}>{loginError}</div>}
            <div className={styles.loginField}>
              <label>Username</label>
              <input type="text" placeholder="e.g. powerzone" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className={styles.loginField}>
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className={styles.loginBtn}>Secure Login</button>
          </form>
          <a href="/" className={styles.loginBack}>← Back to Website</a>
        </div>
        <div className={styles.loginHero}>
          <img src="/assets/img1.jpg" alt="PowerZone Gym" />
          <div className={styles.loginHeroOverlay}>
            <h2>Manage Your Store.</h2>
            <p>Control inventory, track stock, and power the website.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerLeft}>
            <span className={styles.logo}>⚡ PowerZone</span>
            <span className={styles.adminLabel}>Store Administrator Dashboard</span>
          </div>
          <button 
            className={styles.menuToggle} 
            onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
            aria-label="Toggle Navigation"
          >
            {isMenuCollapsed ? <Plus size={20} /> : <Minus size={20} />}
          </button>
        </div>

        <div className={`${styles.headerRight} ${isMenuCollapsed ? styles.menuCollapsed : ''}`}>
          <button className={`${styles.tabBtn} ${tab === 'cms' ? styles.tabActive : ''}`} onClick={() => { setTab('cms'); setIsMenuCollapsed(true); }}>
            Website Products (CMS)
          </button>
          <button className={`${styles.tabBtn} ${tab === 'orders' ? styles.tabActive : ''}`} onClick={() => { setTab('orders'); setIsMenuCollapsed(true); }}>
            <ShoppingBag size={14} style={{display:'inline', marginBottom:'-2px'}} /> Database Orders
          </button>
          <button className={`${styles.tabBtn} ${tab === 'users' ? styles.tabActive : ''}`} onClick={() => { setTab('users'); setIsMenuCollapsed(true); }}>
            <Users size={14} style={{display:'inline', marginBottom:'-2px'}} /> Registered Customers
          </button>
          <button className={`${styles.tabBtn} ${tab === 'config' ? styles.tabActive : ''}`} onClick={() => { setTab('config'); setIsMenuCollapsed(true); }}>
            <Settings size={14} style={{display:'inline', marginBottom:'-2px'}} /> Site Config
          </button>
          
          {tab === 'cms' && (
            <button className={styles.clearBtn} onClick={() => { setForm(EMPTY_FORM); setEditId(null); setFileKey(Date.now()); }}>
              Clear Form
            </button>
          )}

          <a href="/" className={styles.logoutBtn}>
            <LogOut size={15} /> Logout
          </a>
        </div>
      </div>

      {success && <div className={styles.successBar}>{success}</div>}

      {/* CMS Tab */}
      {tab === 'cms' && (
        <div className={styles.layout}>
          {/* Left - Form */}
          <div className={styles.formPanel}>
            <h2 className={styles.panelTitle}>{editId ? '✏️ Edit Product' : '➕ Add New Product'}</h2>

            {/* Upload destinations */}
            <div className={styles.uploadToggles}>
              <label className={styles.toggle}>
                <input
                  type="checkbox"
                  checked={form.isOnStore}
                  onChange={e => setForm({ ...form, isOnStore: e.target.checked })}
                />
                <span className={styles.toggleLabel}>Upload to Store (Shop Grid)</span>
              </label>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Image */}
              <div className={styles.field}>
                <label>Product Image (Upload from Desktop)</label>
                <div className={styles.imageRow}>
                  <input
                    key={fileKey}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {form.image && (
                    <img src={form.image} alt="preview" className={styles.imgPreview} onError={e => (e.currentTarget.style.display = 'none')} />
                  )}
                </div>
              </div>

              {/* Name & Brand */}
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label>Product Name</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Gold Standard Whey"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>Brand</label>
                  <select value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })}>
                    <option value="">Select a Brand</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className={styles.field}>
                <label>Product Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Enter product description..."
                />
              </div>

              {/* Prices */}
              <div className={styles.row2}>
                <div className={styles.field}>
                  <label>Current Price (Rs)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.price || ''}
                    onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                    placeholder="e.g. 14500"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>Original Price (Rs)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.originalPrice || ''}
                    onChange={e => setForm({ ...form, originalPrice: Number(e.target.value) })}
                    placeholder="e.g. 17000"
                  />
                </div>
              </div>

              {/* Category */}
              <div className={styles.field}>
                <label>Category Placement</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Badge + Stock */}
              <div className={styles.checkRow}>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={form.badge === 'SALE'}
                    onChange={e => setForm({ ...form, badge: e.target.checked ? 'SALE' : null })}
                  />
                  <span className={styles.toggleLabel}>🏷️ Apply Red SALE Tag</span>
                </label>
                <label className={styles.toggle}>
                  <input
                    type="checkbox"
                    checked={!form.inStock}
                    onChange={e => setForm({ ...form, inStock: !e.target.checked })}
                  />
                  <span className={styles.toggleLabel}>🚫 Mark OUT OF STOCK</span>
                </label>
              </div>

              <button type="submit" className={styles.uploadBtn}>
                <Plus size={18} />
                {editId ? 'Save Changes' : 'Upload to Selected Views'}
              </button>
              {editId && (
                <button type="button" className={styles.cancelBtn} onClick={() => { setEditId(null); setForm(EMPTY_FORM); setFileKey(Date.now()); }}>
                  Cancel Edit
                </button>
              )}
            </form>
          </div>

          {/* Right - Inventory */}
          <div className={styles.inventoryPanel}>
            <div className={styles.inventoryHeader}>
              <h2 className={styles.panelTitle}>Live Inventory Management</h2>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statLabel}>Total Active Listings</div>
              <div className={styles.statNum}>{activeCount}</div>
              <div className={styles.statSub}>out of {products.length} total products</div>
            </div>

            {categories.map(cat => {
              const catProds = groupedByCat[cat] || [];
              if (catProds.length === 0) return null;
              return (
                <div key={cat} className={styles.catBlock}>
                  <button
                    className={styles.catHeader}
                    onClick={() => setExpandedCat(expandedCat === cat ? null : cat)}
                  >
                    <span>{cat} ({catProds.length})</span>
                    <span>{expandedCat === cat ? '▲' : '▼'}</span>
                  </button>
                  {expandedCat === cat && (
                    <div className={styles.catList}>
                      {catProds.map(p => (
                        <div key={p.id} className={styles.productRow}>
                          <img src={p.image} alt={p.name} className={styles.productThumb} onError={e => (e.currentTarget.style.display = 'none')} />
                          <div className={styles.productInfo}>
                            <div className={styles.productName}>{p.name}</div>
                            <div className={styles.productMeta}>
                              <span>{formatPrice(p.price)}</span>
                              {!p.inStock && <span className={styles.oos}>OUT OF STOCK</span>}
                            </div>
                          </div>
                          <div className={styles.productActions}>
                            <button className={styles.editBtn} onClick={() => handleEdit(p)} title="Edit">
                              <Edit2 size={13} />
                            </button>
                            <button className={styles.delBtn} onClick={() => { if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id); }} title="Delete">
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {tab === 'orders' && (
        <div className={styles.erpTab}>
          <div className={styles.erpCards}>
            <div className={styles.erpCard}>
              <ShoppingBag size={35} className={styles.erpIcon} />
              <div>
                <div className={styles.erpNum}>{dbOrders.length}</div>
                <div className={styles.erpLabel}>Total Placed Orders</div>
              </div>
            </div>
          </div>
          
          <div className={styles.erpTable}>
            <div className={styles.tableHeader} style={{ gridTemplateColumns: 'minmax(80px, 1fr) 1fr 2fr 1fr 0.8fr 0.8fr 0.8fr' }}>
              <div>Order ID</div>
              <div>Date</div>
              <div>Customer Info</div>
              <div>Items</div>
              <div>Total</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            {dbOrders.map(o => (
              <div key={o.id} className={styles.tableRow} style={{ gridTemplateColumns: 'minmax(80px, 1fr) 1fr 2fr 1fr 0.8fr 0.8fr 0.8fr' }}>
                <div style={{fontWeight:800}}>{o.orderId}</div>
                <div style={{color:'#666'}}>{o.createdAt ? new Date(o.createdAt.toMillis()).toLocaleString() : 'N/A'}</div>
                <div>
                  <div style={{fontWeight:600}}>{o.customerInfo?.name}</div>
                  <div style={{fontSize:'0.75rem', color:'#666'}}>{o.customerInfo?.mobile}</div>
                  <div style={{fontSize:'0.7rem', color:'#888'}}>
                    {o.customerInfo?.address}, {o.customerInfo?.city}
                  </div>
                </div>
                <div style={{fontSize:'0.75rem'}}>
                  {o.items?.map((i: any) => (
                     <div key={i.id}>{i.quantity}x {i.name}</div>
                  ))}
                </div>
                <div style={{fontWeight:800, color:'var(--primary-green)'}}>
                  Rs {o.totalPrice?.toLocaleString()}
                </div>
                <div style={{fontSize:'0.78rem', color:'#111', fontWeight:700, display: 'flex', gap: '0.3rem', alignItems: 'center'}}>
                  {o.status === 'Done' ? (
                    <><CheckCircle size={14} color="var(--primary-green)" /> Done</>
                  ) : (
                    <span style={{color: '#888'}}>Received</span>
                  )}
                </div>
                <div style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
                  {o.status !== 'Done' && (
                    <button onClick={() => handleMarkDone(o.id)} title="Mark Done" style={{background: 'rgba(0,200,83,0.1)', color: 'var(--primary-green)', padding: '0.4rem', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex'}}>
                      <CheckCircle size={15} />
                    </button>
                  )}
                  <button onClick={() => handleDeleteOrder(o.id)} title="Delete Order" style={{background: 'rgba(255,0,0,0.1)', color: 'red', padding: '0.4rem', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex'}}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users Tab */}
      {tab === 'users' && (
        <div className={styles.erpTab}>
          <div className={styles.erpCards}>
            <div className={styles.erpCard}>
              <Users size={35} className={styles.erpIcon} />
              <div>
                <div className={styles.erpNum}>{dbUsers.length}</div>
                <div className={styles.erpLabel}>Registered Accounts</div>
              </div>
            </div>
          </div>
          
          <div className={styles.erpTable}>
            <div className={styles.tableHeader} style={{gridTemplateColumns:'1.5fr 2fr 1.5fr 1fr 0.5fr'}}>
              <div>Name</div>
              <div>Email</div>
              <div>Phone</div>
              <div>Joined</div>
              <div>Actions</div>
            </div>
            {dbUsers.map(u => (
              <div key={u.id} className={styles.tableRow} style={{gridTemplateColumns:'1.5fr 2fr 1.5fr 1fr 0.5fr'}}>
                <div style={{fontWeight:800}}>{u.name}</div>
                <div style={{color:'#444'}}>{u.email}</div>
                <div style={{fontWeight:600}}>{u.phone || 'N/A'}</div>
                <div style={{color:'#666', fontSize:'0.75rem', fontWeight:600}}>
                  {u.createdAt ? (typeof u.createdAt === 'string' ? new Date(u.createdAt).toLocaleDateString() : new Date(u.createdAt.toMillis()).toLocaleDateString()) : 'N/A'}
                </div>
                <div style={{display:'flex', gap:'0.5rem', alignItems:'center'}}>
                  <button onClick={() => handleDeleteUser(u.id)} title="Delete User" style={{background: 'rgba(255,0,0,0.1)', color: 'red', padding: '0.4rem', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex'}}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Config Tab */}
      {tab === 'config' && (
        <div className={styles.configTab}>
          {/* Brand Management */}
          <div className={styles.configCard}>
            <h3>
              <TrendingUp size={20} color="var(--primary-green)" /> Manage Brands
            </h3>
            <div className={styles.configInputRow}>
              <input 
                id="newBrandInput"
                type="text" 
                placeholder="New Brand Name..." 
                className={styles.configInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.currentTarget;
                    if (input.value) { addBrand(input.value); input.value = ''; }
                  }
                }}
              />
              <button 
                onClick={() => {
                  const input = document.getElementById('newBrandInput') as HTMLInputElement;
                  if (input.value) { addBrand(input.value); input.value = ''; }
                }}
                className={styles.uploadBtn}
                style={{ margin: 0, padding: '0.6rem 1.2rem' }}
              >
                Add
              </button>
            </div>
            <div className={styles.configList}>
              {brands.map(b => (
                <div key={b} className={styles.configItem}>
                  <span className={styles.configItemLabel}>{b}</span>
                  <div className={styles.configItemActions}>
                    <button 
                      className={`${styles.configActionBtn} ${styles.configEditBtn}`}
                      onClick={() => {
                        const newName = prompt('Edit Brand Name:', b);
                        if (newName && newName !== b) updateBrand(b, newName);
                      }}
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      className={`${styles.configActionBtn} ${styles.configDelBtn}`}
                      onClick={() => { if (confirm(`Delete Brand "${b}"?`)) deleteBrand(b); }}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Management */}
          <div className={styles.configCard}>
            <h3>
              <Package size={20} color="var(--primary-green)" /> Manage Categories
            </h3>
            <div className={styles.configInputRow}>
              <input 
                id="newCatInput"
                type="text" 
                placeholder="New Category..." 
                className={styles.configInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const input = e.currentTarget;
                    if (input.value) { addCategory(input.value); input.value = ''; }
                  }
                }}
              />
              <button 
                onClick={() => {
                  const input = document.getElementById('newCatInput') as HTMLInputElement;
                  if (input.value) { addCategory(input.value); input.value = ''; }
                }}
                className={styles.uploadBtn}
                style={{ margin: 0, padding: '0.6rem 1.2rem' }}
              >
                Add
              </button>
            </div>
            <div className={styles.configList}>
              {categories.map(c => (
                <div key={c} className={styles.configItem}>
                  <span className={styles.configItemLabel}>{c}</span>
                  <div className={styles.configItemActions}>
                    <button 
                      className={`${styles.configActionBtn} ${styles.configEditBtn}`}
                      onClick={() => {
                        const newName = prompt('Edit Category:', c);
                        if (newName && newName !== c) updateCategory(c, newName);
                      }}
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      className={`${styles.configActionBtn} ${styles.configDelBtn}`}
                      onClick={() => { if (confirm(`Delete Category "${c}"?`)) deleteCategory(c); }}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
