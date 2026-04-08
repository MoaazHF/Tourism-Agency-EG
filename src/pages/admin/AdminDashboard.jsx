import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../context/AuthContext'
import { useCategories } from '../../hooks/useCategories'
import { useTrips } from '../../hooks/useTrips'
import { PlusCircle, Edit2, Trash2, LogOut, Settings, LayoutGrid } from 'lucide-react'

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const { categories } = useCategories()
  const { trips, loading } = useTrips()
  const [deletingId, setDeletingId] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login')
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?\n\nThis cannot be undone.`)) return
    setDeletingId(id)
    const { error } = await supabase.from('trips').delete().eq('id', id)
    setDeletingId(null)
    if (error) {
      showToast(`Error: ${error.message}`, 'error')
    } else {
      showToast(`"${title}" deleted.`)
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
            <p className="font-headline font-bold text-on-surface text-lg leading-none">Admin Dashboard</p>
            <p className="text-xs text-outline mt-0.5">Route d'Égypte</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/categories"
            className="flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary px-3 py-2 rounded-xl hover:bg-surface-container transition-colors"
          >
            <Settings className="w-4 h-4" /> Categories
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-bold text-error hover:bg-error/10 px-3 py-2 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Trips',      value: trips.length,      color: 'text-primary' },
            { label: 'Categories',       value: categories.length, color: 'text-secondary' },
            { label: 'Cruises',          value: trips.filter(t => t.category_slug === 'cruises').length,    color: 'text-primary' },
            { label: 'Excursions',       value: trips.filter(t => t.category_slug === 'excursions').length, color: 'text-secondary' },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface rounded-2xl p-6 border border-outline-variant/20 shadow-sm">
              <p className={`text-4xl font-black font-headline ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-outline uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-headline text-on-surface">All Trips</h2>
          <Link
            to="/admin/trips/new"
            className="flex items-center gap-2 bg-linear-to-br from-primary to-primary-container text-on-primary px-5 py-3 rounded-xl font-bold text-sm shadow-md hover:scale-[1.02] transition-transform"
          >
            <PlusCircle className="w-4 h-4" /> Add New Trip
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
              <p className="text-lg font-bold mb-2">No trips yet</p>
              <p className="text-sm">Add your first trip or run the seed script.</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-low text-left">
                  <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs">Title</th>
                  <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs hidden md:table-cell">Category</th>
                  <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs hidden lg:table-cell">Duration</th>
                  <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs hidden lg:table-cell">Price (€)</th>
                  <th className="px-6 py-4 font-bold text-outline uppercase tracking-widest text-xs text-right">Actions</th>
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
                          <span className="px-1.5 py-0.5 bg-secondary/10 text-secondary text-[10px] uppercase font-black rounded border border-secondary/20">Featured</span>
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
                      {trip.price_per_person != null ? `${trip.price_per_person} €` : '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/trips/${trip.id}/edit`}
                          className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                          title="Edit trip"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(trip.id, trip.title)}
                          disabled={deletingId === trip.id}
                          className="p-2 rounded-lg hover:bg-error/10 text-error transition-colors disabled:opacity-50"
                          title="Delete trip"
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
      </main>
    </div>
  )
}
