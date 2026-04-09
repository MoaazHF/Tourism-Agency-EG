import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../context/AuthContext'
import { useCategories } from '../../hooks/useCategories'
import { useTrips } from '../../hooks/useTrips'
import { 
  PlusCircle, Edit2, Trash2, LogOut, Settings, LayoutGrid, 
  ClipboardList, Search
} from 'lucide-react'

export default function AdminDashboard() {
  const { t, i18n } = useTranslation()
  // Normalize the dashboard title to ensure consistent display regardless of translations
  const dashboardTitle = (t('admin.dashboard_title') || 'admin dashboard').toString().toLowerCase()
  // Keep browser title in sync
  useEffect(() => {
    document.title = dashboardTitle
  }, [dashboardTitle])
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const { entries: categories } = useCategories()
  const { trips, loading } = useTrips()
  const [deletingId, setDeletingId] = useState(null)
  const [toast, setToast] = useState(null)
  
  // ── Bookings State ──────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('trips') // 'trips' | 'bookings'
  const [bookings, setBookings] = useState([])
  const [bookingsLoading, setBookingsLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  // ── Fetch Bookings ──────────────────────────────────────────────
  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings()
    }
  }, [activeTab])

  const fetchBookings = async () => {
    setBookingsLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .select('*, trips(title)')
      .order('created_at', { ascending: false })
    
    if (error) {
      showToast(error.message, 'error')
    } else {
      setBookings(data)
    }
    setBookingsLoading(false)
  }

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingId(id)
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id)
    
    if (error) {
      showToast(error.message, 'error')
    } else {
      showToast(t('admin.bookings.status_updated', { status: t(`admin.bookings.statuses.${newStatus}`) }))
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b))
    }
    setUpdatingId(null)
  }

  const handleDeleteBooking = async (id) => {
    if (!window.confirm(t('admin.bookings.confirm_delete'))) return
    const { error } = await supabase.from('bookings').delete().eq('id', id)
    if (error) {
      showToast(error.message, 'error')
    } else {
      setBookings(prev => prev.filter(b => b.id !== id))
      showToast(t('admin.bookings.deleted_msg'))
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(t('admin.trips.confirm_delete', { title }))) return
    setDeletingId(id)
    const { error } = await supabase.from('trips').delete().eq('id', id)
    setDeletingId(null)
    if (error) {
      showToast(`Error: ${error.message}`, 'error')
    } else {
      showToast(t('admin.trips.deleted_msg', { title }))
      // Refresh by reloading; hooks will re-fetch
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-surface-container font-body">
      {/* Top bar */}
      <header className="bg-surface border-b border-outline-variant/20 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <LayoutGrid className="text-primary w-6 h-6" />
          <div>
            <p className="font-headline font-bold text-on-surface text-lg leading-none">{dashboardTitle}</p>
            <p className="text-xs text-outline mt-0.5">{t('admin.dashboard_subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/categories"
            className="flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary px-3 py-2 rounded-xl hover:bg-surface-container transition-colors"
          >
            <Settings className="w-4 h-4" /> {t('admin.nav_categories')}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-bold text-error hover:bg-error/10 px-3 py-2 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" /> {t('admin.logout')}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Toast */}
        {toast && (
          <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl font-bold text-sm ${toast.type === 'error' ? 'bg-error text-white' : 'bg-primary text-on-primary'}`}>
            {toast.msg}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {[
            { label: t('admin.stats.total_trips'), value: trips.length,      color: 'text-primary' },
            { label: t('admin.stats.total_bookings'), value: bookings.length || '—', color: 'text-secondary' },
            { label: t('admin.stats.pending'), value: bookings.filter(b => b.status === 'pending').length || 0, color: 'text-error' },
            { label: t('home.categories.cruises'), value: trips.filter(t => t.category_slug === 'cruises').length,    color: 'text-primary' },
            { label: t('home.categories.excursions'), value: trips.filter(t => t.category_slug === 'excursions').length, color: 'text-secondary' },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface rounded-2xl p-6 border border-outline-variant/20 shadow-sm">
              <p className={`text-4xl font-black font-headline ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-outline uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-surface-container-low p-1.5 rounded-2xl w-fit mb-8 border border-outline-variant/10 shadow-inner">
          <button 
            onClick={() => setActiveTab('trips')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'trips' ? 'bg-white text-primary shadow-md' : 'text-outline hover:text-on-surface'}`}
          >
            <LayoutGrid size={18} /> {t('admin.tabs.manage_trips')}
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${activeTab === 'bookings' ? 'bg-white text-primary shadow-md' : 'text-outline hover:text-on-surface'}`}
          >
            <ClipboardList size={18} /> {t('admin.tabs.view_bookings')}
            {bookings.filter(b => b.status === 'pending').length > 0 && (
              <span className="flex w-2 h-2 rounded-full bg-error animate-pulse ml-1" />
            )}
          </button>
        </div>

        {activeTab === 'trips' ? (
          <>
            {/* Action row */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-headline text-on-surface">{t('admin.trips.title')}</h2>
              <Link
                to="/admin/trips/new"
                className="flex items-center gap-2 bg-linear-to-br from-primary to-primary-container text-on-primary px-5 py-3 rounded-xl font-bold text-sm shadow-md hover:scale-[1.02] transition-transform"
              >
                <PlusCircle className="w-4 h-4" /> {t('admin.trips.add_new')}
              </Link>
            </div>

            {/* Trips table */}
            <div className="bg-surface rounded-2xl border border-outline-variant/20 overflow-hidden shadow-sm">
              {loading ? (
                <div className="p-12 flex justify-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : trips.length === 0 ? (
                <div className="p-12 text-center text-on-surface-variant">
                  <p className="text-lg font-bold mb-2">{t('admin.trips.no_trips')}</p>
                  <p className="text-sm">{t('admin.trips.no_trips_hint')}</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-outline-variant/20 bg-surface-container-low text-left">
                      <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs">{t('admin.trips.table.title')}</th>
                      <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs hidden md:table-cell">{t('admin.trips.table.category')}</th>
                      <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs hidden lg:table-cell">{t('admin.trips.table.duration')}</th>
                      <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs hidden lg:table-cell">{t('admin.trips.table.price')}</th>
                      <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs text-right">{t('admin.trips.table.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {trips.map((trip) => (
                      <tr key={trip.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-on-surface line-clamp-1">{trip.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-outline text-xs font-mono">{trip.id}</p>
                            {trip.is_featured && (
                              <span className="px-1.5 py-0.5 bg-secondary/10 text-secondary text-[10px] uppercase font-black rounded border border-secondary/20">{t('admin.trips.table.featured')}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold capitalize">
                            {trip.category_slug || '—'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-on-surface-variant hidden lg:table-cell">{trip.duration || '—'}</td>
                        <td className="px-6 py-4 font-bold text-primary hidden lg:table-cell">
                          {trip.price_per_person != null ? `${trip.price_per_person} ${t('admin.stats.currency')}` : '—'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/admin/trips/${trip.id}/edit`}
                              className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                              title={t('admin.trips.table.actions_edit')}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDelete(trip.id, trip.title)}
                              disabled={deletingId === trip.id}
                              className="p-2 rounded-lg hover:bg-error/10 text-error transition-colors disabled:opacity-50"
                              title={t('admin.trips.table.actions_delete')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-headline text-on-surface">{t('admin.tabs.view_bookings')}</h2>
              <button 
                onClick={fetchBookings}
                className="text-primary font-bold text-sm hover:underline flex items-center gap-2"
              >
                {t('admin.bookings.refresh')}
              </button>
            </div>

            <div className="bg-surface rounded-2xl border border-outline-variant/20 overflow-hidden shadow-sm">
              {bookingsLoading ? (
                <div className="p-12 flex justify-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : bookings.length === 0 ? (
                <div className="p-12 text-center text-on-surface-variant">
                  <p className="text-lg font-bold mb-2">{t('admin.bookings.no_bookings')}</p>
                  <p className="text-sm">{t('admin.bookings.no_bookings_hint')}</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-outline-variant/20 bg-surface-container-low text-left">
                      <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs">{t('admin.bookings.table.client')}</th>
                      <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs">{t('admin.bookings.table.trip')}</th>
                      <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs hidden md:table-cell">{t('admin.bookings.table.details')}</th>
                      <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs">{t('admin.bookings.table.status')}</th>
                      <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs text-right">{t('admin.bookings.table.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-secondary">{b.customer_name}</p>
                          <p className="text-xs text-outline">{b.customer_email}</p>
                          <p className="text-xs text-outline">{b.customer_phone}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-on-surface line-clamp-1">{b.trips?.title || t('admin.bookings.trip_unknown')}</p>
                          <p className="text-[10px] text-outline uppercase font-black mt-1">
                            {new Date(b.created_at).toLocaleDateString(i18n.language)}
                          </p>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="space-y-1 text-xs">
                            <p><span className="text-outline">{t('booking_form.labels.date')}:</span> <span className="font-medium">{b.travel_date || '—'}</span></p>
                            <p><span className="text-outline">{t('admin.bookings.table.people')}:</span> <span className="font-medium text-primary">{b.adults}{t('admin.stats.adults_abbr')}, {b.children}{t('admin.stats.children_abbr')}</span></p>
                            <p><span className="text-outline">{t('booking_form.summary.total')}:</span> <span className="font-bold text-primary">{b.total_price} {t('admin.stats.currency')}</span></p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select 
                            value={b.status}
                            disabled={updatingId === b.id}
                            onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                            className={`text-xs font-black uppercase px-3 py-1.5 rounded-full border-0 focus:ring-2 focus:ring-primary cursor-pointer transition-all ${
                              b.status === 'confirmed' ? 'bg-primary/10 text-primary' : 
                              b.status === 'cancelled' ? 'bg-error/10 text-error' : 
                              'bg-secondary/10 text-secondary'
                            }`}
                          >
                            <option value="pending">{t('admin.bookings.statuses.pending')}</option>
                            <option value="confirmed">{t('admin.bookings.statuses.confirmed')}</option>
                            <option value="cancelled">{t('admin.bookings.statuses.cancelled')}</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleDeleteBooking(b.id)}
                            className="p-2 text-outline hover:text-error transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
