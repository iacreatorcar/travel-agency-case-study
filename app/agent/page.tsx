'use client';

import { useEffect, useState } from 'react';
import styles from './agent.module.css';
import { supabase } from '../../lib/supabase';
import { getTourBySlug } from '../../lib/tours';
import { getHotelBySlug } from '../../lib/hotels';
import { getTransferBySlug } from '../../lib/transfers';
import { useCrmAccess } from '../../lib/useCrmAccess';

type AgentLang = 'en' | 'ar';
type TabId = 'dashboard' | 'mysales' | 'bookings' | 'commission';

const translations: { [key in AgentLang]: { [key: string]: string } } = {
  en: {
    logoText: '🌍 Voyara Travel',
    agentPortal: 'Agent Portal',
    menuDashboard: '📊 Dashboard',
    menuMySales: '💰 My Sales',
    menuBookings: '✈️ Bookings',
    menuCommission: '💳 Commission',
    logout: 'Logout',
    title: 'Agent Dashboard',
    agentRole: 'Sales Agent',
    currentCommission: 'Current Commission Earned',
    commissionDetail: 'From 45 bookings | 6.5% commission rate | 72% of monthly target',
    totalSales: 'Total Sales',
    pendingBookings: 'Pending Bookings',
    myClients: 'My Clients',
    conversionRate: 'Conversion Rate',
    confirmedBookings: 'Confirmed Bookings',
    newClients: 'New Clients',
    lifetimeSales: 'Lifetime Sales',
    tabOverview: 'Overview',
    tabMySales: 'My Sales',
    tabBookings: 'Bookings',
    tabTickets: 'Tickets',
    tabCommission: 'Commission',
    recentActivity: 'Recent Activity',
    recentBookings: 'Recent Bookings',
    mySalesOverview: 'My Sales Overview',
    manageMyBookings: 'Manage My Bookings',
    ticketManagement: 'Ticket Management',
    commissionTracking: 'Commission Tracking',
    commissionDetails: 'Commission Details',
    colBookingId: 'Booking ID',
    colClient: 'Client',
    colTour: 'Tour',
    colAmount: 'Amount',
    colCommission: 'Commission',
    colStatus: 'Status',
    colDate: 'Date',
    colPersons: 'Persons',
    colMonth: 'Month',
    colTotalSales: 'Total Sales',
    colRate: 'Commission Rate',
    colPaymentStatus: 'Payment Status',
    btnNewBooking: '+ New Booking',
    btnView: 'View',
    btnEdit: 'Edit',
    btnTicket: 'Ticket',
    btnFollowUp: 'Follow Up',
    btnDownload: 'Download',
    btnResend: 'Resend',
    btnGenerate: 'Generate',
    comingSoon: 'Coming soon.'
  },
  ar: {
    logoText: '🌍 فوياراترافيل',
    agentPortal: 'بوابة الوكيل',
    menuDashboard: '📊 لوحة التحكم',
    menuMySales: '💰 مبيعاتي',
    menuBookings: '✈️ الحجوزات',
    menuCommission: '💳 العمولة',
    logout: 'تسجيل الخروج',
    title: 'لوحة تحكم الوكيل',
    agentRole: 'وكيل مبيعات',
    currentCommission: 'العمولة المكتسبة حاليًا',
    commissionDetail: 'من 45 حجزًا | معدل عمولة 6.5% | 72% من الهدف الشهري',
    totalSales: 'إجمالي المبيعات',
    pendingBookings: 'الحجوزات المعلقة',
    myClients: 'عملائي',
    conversionRate: 'معدل التحويل',
    confirmedBookings: 'الحجوزات المؤكدة',
    newClients: 'عملاء جدد',
    lifetimeSales: 'مبيعات مدى الحياة',
    tabOverview: 'نظرة عامة',
    tabMySales: 'مبيعاتي',
    tabBookings: 'الحجوزات',
    tabTickets: 'التذاكر',
    tabCommission: 'العمولة',
    recentActivity: 'النشاط الأخير',
    recentBookings: 'الحجوزات الأخيرة',
    mySalesOverview: 'ملخص مبيعاتي',
    manageMyBookings: 'إدارة حجوزاتي',
    ticketManagement: 'إدارة التذاكر',
    commissionTracking: 'تتبع العمولة',
    commissionDetails: 'تفاصيل العمولة',
    colBookingId: 'رقم الحجز',
    colClient: 'العميل',
    colTour: 'الجولة',
    colAmount: 'المبلغ',
    colCommission: 'العمولة',
    colStatus: 'الحالة',
    colDate: 'التاريخ',
    colPersons: 'عدد الأشخاص',
    colMonth: 'الشهر',
    colTotalSales: 'إجمالي المبيعات',
    colRate: 'معدل العمولة',
    colPaymentStatus: 'حالة الدفع',
    btnNewBooking: '+ حجز جديد',
    btnView: 'عرض',
    btnEdit: 'تحرير',
    btnTicket: 'تذكرة',
    btnFollowUp: 'متابعة',
    btnDownload: 'تحميل',
    btnResend: 'إعادة إرسال',
    btnGenerate: 'إنشاء',
    comingSoon: 'قريبًا.'
  }
};

interface UnifiedBooking {
  id: string;
  createdAt: string;
  client: string;
  item: string;
  type: string;
  persons: number;
  amount: string;
  status: string;
}

const commissionByMonth = [
  { month: 'September 2026', sales: '$54,000', rate: '6.5%', commission: '$3,510', status: 'inProgress' },
  { month: 'August 2026', sales: '$48,000', rate: '6.5%', commission: '$3,120', status: 'paid' },
  { month: 'July 2026', sales: '$42,000', rate: '6.5%', commission: '$2,730', status: 'paid' }
];

const commissionDetails = [
  { id: '#BK001', amount: '$2,400', rate: '6.5%', commission: '$156', status: 'paid' },
  { id: '#BK002', amount: '$1,800', rate: '6.5%', commission: '$117', status: 'pending' },
  { id: '#BK003', amount: '$3,200', rate: '6.5%', commission: '$208', status: 'paid' }
];

function StatusBadge({ status, t }: { status: string; t: { [key: string]: string } }) {
  const label = status === 'confirmed' ? 'Confirmed' : status === 'pending' ? 'Pending' : status === 'paid' ? 'Paid' : 'In Progress';
  const cls = status === 'confirmed' || status === 'paid' ? styles.badgeSuccess : status === 'pending' ? styles.badgeWarning : styles.badgeInfo;
  return <span className={`${styles.badge} ${cls}`}>{label}</span>;
}

export default function AgentPortal() {
  const { checked, logout, session } = useCrmAccess();
  const [language, setLanguage] = useState<AgentLang>('en');
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [bookings, setBookings] = useState<UnifiedBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const t = translations[language];
  const isRtl = language === 'ar';

  useEffect(() => {
    async function loadBookings() {
      setLoading(true);

      const [tours, hotels, transfers, packages] = await Promise.all([
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('hotel_bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('transfer_bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('package_bookings').select('*').order('created_at', { ascending: false })
      ]);

      const rows: UnifiedBooking[] = [];

      (tours.data ?? []).forEach((row) => {
        const tour = getTourBySlug(row.tour_slug);
        rows.push({
          id: row.id,
          createdAt: row.created_at,
          client: row.customer_name,
          item: tour?.title.en ?? row.tour_slug,
          type: 'Tour',
          persons: row.people,
          amount: tour?.price ?? '—',
          status: row.status
        });
      });

      (hotels.data ?? []).forEach((row) => {
        const hotel = getHotelBySlug(row.hotel_slug);
        rows.push({
          id: row.id,
          createdAt: row.created_at,
          client: row.customer_name,
          item: hotel?.name.en ?? row.hotel_slug,
          type: 'Hotel',
          persons: row.guests,
          amount: hotel?.pricePerNight ?? '—',
          status: row.status
        });
      });

      (transfers.data ?? []).forEach((row) => {
        const transfer = getTransferBySlug(row.transfer_slug);
        rows.push({
          id: row.id,
          createdAt: row.created_at,
          client: row.customer_name,
          item: transfer?.name.en ?? row.transfer_slug,
          type: 'Transfer',
          persons: row.passengers,
          amount: transfer?.price ?? '—',
          status: row.status
        });
      });

      (packages.data ?? []).forEach((row) => {
        rows.push({
          id: row.id,
          createdAt: row.created_at,
          client: row.customer_name,
          item: row.package_slug,
          type: 'Package',
          persons: row.people,
          amount: '—',
          status: row.status
        });
      });

      rows.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setBookings(rows);
      setLoading(false);
    }

    loadBookings();
  }, []);

  const totalSales = bookings.reduce((sum, row) => {
    const value = Number(row.amount.replace(/[^\d.]/g, ''));
    return sum + (Number.isFinite(value) ? value : 0);
  }, 0);
  const pendingCount = bookings.filter((row) => row.status === 'pending').length;
  const confirmedCount = bookings.filter((row) => row.status === 'confirmed').length;
  const uniqueClients = new Set(bookings.map((row) => row.client)).size;
  const conversionRate = bookings.length > 0 ? Math.round((confirmedCount / bookings.length) * 100) : 0;

  const menuItems: { id: TabId; label: string }[] = [
    { id: 'dashboard', label: t.menuDashboard },
    { id: 'mysales', label: t.menuMySales },
    { id: 'bookings', label: t.menuBookings },
    { id: 'commission', label: t.menuCommission }
  ];

  if (!checked) return null;

  return (
    <div className={styles.container} dir={isRtl ? 'rtl' : 'ltr'}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.agentName}>{t.agentPortal}</div>
          <div className={styles.sidebarProfile}>
            <div className={styles.avatarSm}>👤</div>
            <div>
              <p style={{ fontWeight: 'bold', color: 'white' }}>{session?.name || '—'}</p>
              <p style={{ fontSize: '0.85rem', color: '#ccc' }}>{t.agentRole}</p>
            </div>
          </div>
        </div>
        <ul className={styles.sidebarMenu}>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button className={activeTab === item.id ? styles.active : ''} onClick={() => setActiveTab(item.id)}>
                {item.label}
              </button>
            </li>
          ))}
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

        {activeTab === 'dashboard' && (
          <div className={styles.commissionBox}>
            <div className={styles.commissionLabel}>{t.currentCommission} <em style={{ opacity: 0.75, fontStyle: 'normal' }}>(demo)</em></div>
            <div className={styles.commissionAmount}>$3,510</div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '72%' }} />
            </div>
            <div className={styles.commissionDetail}>{t.commissionDetail} — real commission system not yet configured</div>
          </div>
        )}

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>{t.totalSales}</div>
            <div className={styles.statValue}>€{totalSales.toLocaleString()}</div>
          </div>
          <div className={`${styles.statCard} ${styles.warning}`}>
            <div className={styles.statLabel}>{t.pendingBookings}</div>
            <div className={styles.statValue}>{pendingCount}</div>
          </div>
          <div className={`${styles.statCard} ${styles.success}`}>
            <div className={styles.statLabel}>{t.myClients}</div>
            <div className={styles.statValue}>{uniqueClients}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>{t.conversionRate}</div>
            <div className={styles.statValue}>{conversionRate}%</div>
          </div>
        </div>

        <div className={styles.agentStats}>
          <div className={styles.agentStat}>
            <div className={styles.agentStatNumber}>{confirmedCount}</div>
            <div className={styles.agentStatLabel}>{t.confirmedBookings}</div>
          </div>
          <div className={styles.agentStat}>
            <div className={styles.agentStatNumber}>{uniqueClients}</div>
            <div className={styles.agentStatLabel}>{t.newClients}</div>
          </div>
          <div className={styles.agentStat}>
            <div className={styles.agentStatNumber}>€{totalSales.toLocaleString()}</div>
            <div className={styles.agentStatLabel}>{t.lifetimeSales}</div>
          </div>
        </div>

        <div className={styles.tabs}>
          {(['dashboard', 'mysales', 'bookings', 'commission'] as TabId[]).map((tab) => (
            <button
              key={tab}
              className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'dashboard' && t.tabOverview}
              {tab === 'mysales' && t.tabMySales}
              {tab === 'bookings' && t.tabBookings}
              {tab === 'commission' && t.tabCommission}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'dashboard' && (
            <>
              <h2>{t.recentActivity}</h2>
              <h3 style={{ margin: '2rem 0 1rem' }}>{t.recentBookings}</h3>
              {loading && <p>Loading...</p>}
              {!loading && (
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>{t.colBookingId}</th>
                      <th>{t.colClient}</th>
                      <th>{t.colTour}</th>
                      <th>{t.colAmount}</th>
                      <th>{t.colCommission}</th>
                      <th>{t.colStatus}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((row) => (
                      <tr key={row.id}>
                        <td>{row.id.slice(0, 8)}</td>
                        <td>{row.client}</td>
                        <td>{row.item}</td>
                        <td>{row.amount}</td>
                        <td>—</td>
                        <td><StatusBadge status={row.status} t={t} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {activeTab === 'mysales' && (
            <>
              <h2>{t.mySalesOverview}</h2>
              <div className={styles.filterBar}>
                <input type="date" />
                <input type="date" />
                <select>
                  <option>All Types</option>
                  <option>Tour</option>
                  <option>Hotel</option>
                  <option>Transfer</option>
                  <option>Package</option>
                </select>
              </div>
              {loading && <p>Loading...</p>}
              {!loading && (
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>{t.colDate}</th>
                      <th>{t.colClient}</th>
                      <th>{t.colTour}</th>
                      <th>{t.colPersons}</th>
                      <th>{t.colAmount}</th>
                      <th>{t.colCommission}</th>
                      <th>{t.colStatus}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((row) => (
                      <tr key={row.id}>
                        <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                        <td>{row.client}</td>
                        <td>{row.item}</td>
                        <td>{row.persons}</td>
                        <td>{row.amount}</td>
                        <td>—</td>
                        <td><StatusBadge status={row.status} t={t} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}

          {activeTab === 'bookings' && (
            <>
              <h2>{t.manageMyBookings}</h2>
              <div style={{ marginBottom: '2rem' }}>
                <button className={styles.btn}>{t.btnNewBooking}</button>
              </div>

              {loading && <p>Loading...</p>}
              {!loading && bookings.length === 0 && <p>No bookings yet.</p>}
              {!loading && bookings.map((row) => (
                <div key={row.id} className={styles.bookingCard}>
                  <div>
                    <h3>{row.client} - {row.item}</h3>
                    <div className={styles.bookingDetails}>
                      <strong>Type:</strong> {row.type} | <strong>Date:</strong> {new Date(row.createdAt).toLocaleDateString()}
                    </div>
                    <div className={styles.bookingDetails}>
                      <strong>Persons:</strong> {row.persons} | <strong>Amount:</strong> {row.amount}{' '}
                      <StatusBadge status={row.status} t={t} />
                    </div>
                  </div>
                  <div className={styles.bookingActions}>
                    <button className={`${styles.btn} ${styles.btnSm}`}>{t.btnView}</button>
                    <button className={`${styles.btn} ${styles.btnSm}`}>{t.btnEdit}</button>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'commission' && (
            <>
              <h2>{t.commissionTracking} <em style={{ fontStyle: 'normal', fontSize: '0.8rem', color: '#999', fontWeight: 'normal' }}>(demo data — real commission system pending)</em></h2>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>{t.colMonth}</th>
                    <th>{t.colTotalSales}</th>
                    <th>{t.colRate}</th>
                    <th>{t.colCommission}</th>
                    <th>{t.colStatus}</th>
                  </tr>
                </thead>
                <tbody>
                  {commissionByMonth.map((row) => (
                    <tr key={row.month}>
                      <td><strong>{row.month}</strong></td>
                      <td>{row.sales}</td>
                      <td>{row.rate}</td>
                      <td style={{ color: '#27ae60', fontWeight: 'bold' }}>{row.commission}</td>
                      <td><StatusBadge status={row.status === 'inProgress' ? 'info' : row.status} t={t} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 style={{ margin: '2rem 0 1rem' }}>{t.commissionDetails}</h3>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>{t.colBookingId}</th>
                    <th>{t.colAmount}</th>
                    <th>{t.colRate}</th>
                    <th>{t.colCommission}</th>
                    <th>{t.colPaymentStatus}</th>
                  </tr>
                </thead>
                <tbody>
                  {commissionDetails.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.amount}</td>
                      <td>{row.rate}</td>
                      <td>{row.commission}</td>
                      <td><StatusBadge status={row.status} t={t} /></td>
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
