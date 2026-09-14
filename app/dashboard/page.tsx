'use client';

import { useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import { supabase } from '../../lib/supabase';
import { getTourBySlug, tours } from '../../lib/tours';
import { getHotelBySlug, hotels } from '../../lib/hotels';
import { getTransferBySlug, transfers } from '../../lib/transfers';
import { useCrmAccess } from '../../lib/useCrmAccess';

type AdminLang = 'en' | 'ar';
type AdminTab = 'overview' | 'bookings' | 'clients' | 'tours' | 'hotels' | 'transfers';

interface UnifiedBooking {
  id: string;
  createdAt: string;
  customer: string;
  email: string;
  item: string;
  type: string;
  status: string;
  amount: string;
}

const translations: { [key in AdminLang]: { [key: string]: string } } = {
  en: {
    logoText: '🌍 Voyara Travel',
    adminPortal: 'Admin Portal',
    adminRole: 'Administrator',
    menuDashboard: '📊 Dashboard',
    menuBookings: '📋 Bookings',
    menuClients: '👥 Clients',
    menuTours: '🗺️ Tours',
    menuHotels: '🏨 Hotels',
    menuTransfers: '🚐 Transfers',
    logout: 'Logout',
    title: 'Admin Dashboard',
    welcome: 'Welcome, Administrator',
    revenueLabel: 'Total Revenue',
    revenueDetail: 'From all confirmed and pending bookings',
    totalBookings: 'Total Bookings',
    pendingBookings: 'Pending Bookings',
    totalRevenue: 'Total Revenue',
    activeAgents: 'Active Agents',
    tabOverview: 'Overview',
    tabAllBookings: 'All Bookings',
    tabClients: 'Clients',
    tabTours: 'Tours',
    tabHotels: 'Hotels',
    tabTransfers: 'Transfers',
    recentBookings: 'Recent Bookings',
    customer: 'Customer',
    item: 'Item',
    type: 'Type',
    status: 'Status',
    amount: 'Amount',
    confirmed: 'Confirmed',
    pending: 'Pending',
    loading: 'Loading...',
    empty: 'No bookings yet.',
    searchPlaceholder: 'Search customer...',
    allStatuses: 'All statuses',
    clientEmail: 'Email',
    clientBookings: 'Bookings',
    clientLastBooking: 'Last Booking',
    catalogTitle: 'Title',
    catalogLocation: 'Location',
    catalogPrice: 'Price'
  },
  ar: {
    logoText: '🌍 فوياراترافيل',
    adminPortal: 'بوابة المسؤول',
    adminRole: 'مسؤول',
    menuDashboard: '📊 لوحة التحكم',
    menuBookings: '📋 الحجوزات',
    menuClients: '👥 العملاء',
    menuTours: '🗺️ الرحلات',
    menuHotels: '🏨 الفنادق',
    menuTransfers: '🚐 النقل',
    logout: 'تسجيل الخروج',
    title: 'لوحة تحكم المسؤول',
    welcome: 'مرحبًا أيها المسؤول',
    revenueLabel: 'إجمالي الإيرادات',
    revenueDetail: 'من جميع الحجوزات المؤكدة والمعلقة',
    totalBookings: 'إجمالي الحجوزات',
    pendingBookings: 'الحجوزات المعلقة',
    totalRevenue: 'إجمالي الإيرادات',
    activeAgents: 'الوكلاء النشطون',
    tabOverview: 'نظرة عامة',
    tabAllBookings: 'جميع الحجوزات',
    tabClients: 'العملاء',
    tabTours: 'الرحلات',
    tabHotels: 'الفنادق',
    tabTransfers: 'النقل',
    recentBookings: 'الحجوزات الأخيرة',
    customer: 'العميل',
    item: 'العنصر',
    type: 'النوع',
    status: 'الحالة',
    amount: 'المبلغ',
    confirmed: 'مؤكد',
    pending: 'معلق',
    loading: 'جارٍ التحميل...',
    empty: 'لا توجد حجوزات بعد.',
    searchPlaceholder: 'ابحث عن عميل...',
    allStatuses: 'كل الحالات',
    clientEmail: 'البريد الإلكتروني',
    clientBookings: 'الحجوزات',
    clientLastBooking: 'آخر حجز',
    catalogTitle: 'العنوان',
    catalogLocation: 'الموقع',
    catalogPrice: 'السعر'
  }
};

export default function AdminDashboard() {
  const { checked, logout } = useCrmAccess();
  const [language, setLanguage] = useState<AdminLang>('en');
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [bookingRows, setBookingRows] = useState<UnifiedBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const t = translations[language];
  const isRtl = language === 'ar';

  useEffect(() => {
    async function loadBookings() {
      setLoading(true);

      const [toursRes, hotelsRes, transfersRes, packagesRes] = await Promise.all([
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('hotel_bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('transfer_bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('package_bookings').select('*').order('created_at', { ascending: false })
      ]);

      const rows: UnifiedBooking[] = [];

      (toursRes.data ?? []).forEach((row) => {
        const tour = getTourBySlug(row.tour_slug);
        rows.push({
          id: row.id,
          createdAt: row.created_at,
          customer: row.customer_name,
          email: row.customer_email,
          item: tour?.title.en ?? row.tour_slug,
          type: 'Tour',
          status: row.status,
          amount: tour?.price ?? '—'
        });
      });

      (hotelsRes.data ?? []).forEach((row) => {
        const hotel = getHotelBySlug(row.hotel_slug);
        rows.push({
          id: row.id,
          createdAt: row.created_at,
          customer: row.customer_name,
          email: row.customer_email,
          item: hotel?.name.en ?? row.hotel_slug,
          type: 'Hotel',
          status: row.status,
          amount: hotel?.pricePerNight ?? '—'
        });
      });

      (transfersRes.data ?? []).forEach((row) => {
        const transfer = getTransferBySlug(row.transfer_slug);
        rows.push({
          id: row.id,
          createdAt: row.created_at,
          customer: row.customer_name,
          email: row.customer_email,
          item: transfer?.name.en ?? row.transfer_slug,
          type: 'Transfer',
          status: row.status,
          amount: transfer?.price ?? '—'
        });
      });

      (packagesRes.data ?? []).forEach((row) => {
        rows.push({
          id: row.id,
          createdAt: row.created_at,
          customer: row.customer_name,
          email: row.customer_email,
          item: row.package_slug,
          type: 'Package',
          status: row.status,
          amount: '—'
        });
      });

      rows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setBookingRows(rows);
      setLoading(false);
    }

    loadBookings();
  }, []);

  const totalBookings = bookingRows.length;
  const pendingBookings = bookingRows.filter((row) => row.status === 'pending').length;
  const totalRevenue = bookingRows.reduce((sum, row) => {
    const value = Number(row.amount.replace(/[^\d.]/g, ''));
    return sum + (Number.isFinite(value) ? value : 0);
  }, 0);

  const filteredRows = bookingRows.filter((row) => {
    const matchesSearch = row.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || row.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const clients = Object.values(
    bookingRows.reduce((acc, row) => {
      const key = row.email || row.customer;
      if (!acc[key]) {
        acc[key] = { name: row.customer, email: row.email, count: 0, lastBooking: row.createdAt };
      }
      acc[key].count += 1;
      if (new Date(row.createdAt) > new Date(acc[key].lastBooking)) acc[key].lastBooking = row.createdAt;
      return acc;
    }, {} as Record<string, { name: string; email: string; count: number; lastBooking: string }>)
  );

  const stats = [
    { label: t.totalBookings, value: String(totalBookings), variant: '' },
    { label: t.pendingBookings, value: String(pendingBookings), variant: styles.warning },
    { label: t.totalRevenue, value: `€${totalRevenue.toLocaleString()}`, variant: styles.success },
    { label: t.activeAgents, value: '9', variant: '', demo: true }
  ];

  const renderTable = (rows: UnifiedBooking[]) => {
    if (loading) return <p>{t.loading}</p>;
    if (rows.length === 0) return <p>{t.empty}</p>;

    return (
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>{t.customer}</th>
            <th>{t.item}</th>
            <th>{t.type}</th>
            <th>{t.status}</th>
            <th>{t.amount}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td><strong>{row.customer}</strong></td>
              <td>{row.item}</td>
              <td>{row.type}</td>
              <td>
                <span className={`${styles.badge} ${row.status === 'confirmed' ? styles.badgeSuccess : styles.badgeWarning}`}>
                  {row.status === 'confirmed' ? t.confirmed : t.pending}
                </span>
              </td>
              <td>{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  if (!checked) return null;

  return (
    <div className={styles.container} dir={isRtl ? 'rtl' : 'ltr'}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.agentName}>{t.adminPortal}</div>
          <div className={styles.sidebarProfile}>
            <div className={styles.avatarSm}>🛡️</div>
            <div>
              <p style={{ fontWeight: 'bold', color: 'white' }}>Admin</p>
              <p style={{ fontSize: '0.85rem', color: '#ccc' }}>{t.adminRole}</p>
            </div>
          </div>
        </div>
        <ul className={styles.sidebarMenu}>
          <li>
            <button className={activeTab === 'overview' ? styles.active : ''} onClick={() => setActiveTab('overview')}>
              {t.menuDashboard}
            </button>
          </li>
          <li>
            <button className={activeTab === 'bookings' ? styles.active : ''} onClick={() => setActiveTab('bookings')}>
              {t.menuBookings}
            </button>
          </li>
          <li>
            <button className={activeTab === 'clients' ? styles.active : ''} onClick={() => setActiveTab('clients')}>
              {t.menuClients}
            </button>
          </li>
          <li>
            <button className={activeTab === 'tours' ? styles.active : ''} onClick={() => setActiveTab('tours')}>
              {t.menuTours}
            </button>
          </li>
          <li>
            <button className={activeTab === 'hotels' ? styles.active : ''} onClick={() => setActiveTab('hotels')}>
              {t.menuHotels}
            </button>
          </li>
          <li>
            <button className={activeTab === 'transfers' ? styles.active : ''} onClick={() => setActiveTab('transfers')}>
              {t.menuTransfers}
            </button>
          </li>
        </ul>
        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarLogo}>{t.logoText}</div>
          <div className={styles.footerButtons}>
            <button className={styles.langBtn} onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
              EN/العربية
            </button>
            <button className={styles.logoutBtn} onClick={logout}>{t.logout}</button>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.topbar}>
          <h1>{t.title}</h1>
        </div>

        {activeTab === 'overview' && (
          <div className={styles.commissionBox}>
            <div className={styles.commissionLabel}>{t.revenueLabel}</div>
            <div className={styles.commissionAmount}>€{totalRevenue.toLocaleString()}</div>
            <div className={styles.commissionDetail}>{t.revenueDetail}</div>
          </div>
        )}

        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} className={`${styles.statCard} ${stat.variant}`}>
              <div className={styles.statLabel}>{stat.label}{stat.demo && <em style={{ fontStyle: 'normal', color: '#999', fontWeight: 'normal' }}> (demo)</em>}</div>
              <div className={styles.statValue}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div className={styles.tabs}>
          {(['overview', 'bookings', 'clients', 'tours', 'hotels', 'transfers'] as AdminTab[]).map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' && t.tabOverview}
              {tab === 'bookings' && t.tabAllBookings}
              {tab === 'clients' && t.tabClients}
              {tab === 'tours' && t.tabTours}
              {tab === 'hotels' && t.tabHotels}
              {tab === 'transfers' && t.tabTransfers}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'overview' && (
            <>
              <h2>{t.recentBookings}</h2>
              {renderTable(bookingRows.slice(0, 5))}
            </>
          )}

          {activeTab === 'bookings' && (
            <>
              <div className={styles.filterBar}>
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">{t.allStatuses}</option>
                  <option value="confirmed">{t.confirmed}</option>
                  <option value="pending">{t.pending}</option>
                </select>
              </div>
              {renderTable(filteredRows)}
            </>
          )}

          {activeTab === 'clients' && (
            <>
              <h2>{t.tabClients}</h2>
              {loading && <p>{t.loading}</p>}
              {!loading && clients.length === 0 && <p>{t.empty}</p>}
              {!loading && clients.length > 0 && (
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>{t.customer}</th>
                      <th>{t.clientEmail}</th>
                      <th>{t.clientBookings}</th>
                      <th>{t.clientLastBooking}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.email || client.name}>
                        <td><strong>{client.name}</strong></td>
                        <td>{client.email || '—'}</td>
                        <td>{client.count}</td>
                        <td>{new Date(client.lastBooking).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {activeTab === 'tours' && (
            <>
              <h2>{t.tabTours}</h2>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>{t.catalogTitle}</th>
                    <th>{t.catalogLocation}</th>
                    <th>{t.catalogPrice}</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((tour) => (
                    <tr key={tour.slug}>
                      <td><strong>{tour.title.en}</strong></td>
                      <td>{tour.locationLabel}</td>
                      <td>{tour.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'hotels' && (
            <>
              <h2>{t.tabHotels}</h2>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>{t.catalogTitle}</th>
                    <th>{t.catalogPrice}</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.map((hotel) => (
                    <tr key={hotel.slug}>
                      <td><strong>{hotel.name.en}</strong></td>
                      <td>{hotel.pricePerNight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'transfers' && (
            <>
              <h2>{t.tabTransfers}</h2>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>{t.catalogTitle}</th>
                    <th>{t.catalogPrice}</th>
                  </tr>
                </thead>
                <tbody>
                  {transfers.map((transfer) => (
                    <tr key={transfer.slug}>
                      <td><strong>{transfer.name.en}</strong></td>
                      <td>{transfer.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
