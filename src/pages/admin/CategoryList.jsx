import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useCategories } from '../../hooks/useCategories'
import { ArrowLeft, Save, ChevronDown, ChevronUp } from 'lucide-react'

export default function CategoryList() {
  const { categories, loading } = useCategories()
  const [edits, setEdits] = useState({})       // { slug: { ...overrides } }
  const [saving, setSaving] = useState(null)
  const [toast, setToast] = useState(null)
  const [expanded, setExpanded] = useState({})

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const getField = (cat, key) =>
    edits[cat.slug]?.[key] !== undefined ? edits[cat.slug][key] : (cat[key] ?? '')

  const setEdit = (slug, key, value) =>
    setEdits((prev) => ({ ...prev, [slug]: { ...prev[slug], [key]: value } }))

  const handleSave = async (cat) => {
    const changes = edits[cat.slug]
    if (!changes || Object.keys(changes).length === 0) {
      showToast('No changes to save.')
      return
    }
    setSaving(cat.slug)
    const { error } = await supabase.from('categories').update(changes).eq('slug', cat.slug)
    setSaving(null)
    if (error) {
      showToast(`Error: ${error.message}`, 'error')
    } else {
      showToast(`"${cat.title}" saved!`)
      setEdits((prev) => { const n = { ...prev }; delete n[cat.slug]; return n })
    }
  }

  const toggleExpand = (slug) =>
    setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }))

  const inputCls = 'w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline/50 font-medium text-sm'

  return (
    <div className="min-h-screen bg-surface-container font-body">
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-xl font-bold text-sm ${toast.type === 'error' ? 'bg-error text-white' : 'bg-primary text-on-primary'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="bg-surface border-b border-outline-variant/20 px-6 py-4 flex items-center gap-4 sticky top-0 z-20 shadow-sm">
        <Link to="/admin/dashboard" className="p-2 rounded-lg hover:bg-surface-container text-outline hover:text-primary transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-headline font-bold text-on-surface text-lg">Manage Categories</h1>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : categories.map((cat) => (
          <div key={cat.slug} className="bg-surface rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
            {/* Category header row */}
            <div
              className="px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors"
              onClick={() => toggleExpand(cat.slug)}
            >
              <div>
                <span className="text-xs font-bold text-outline uppercase tracking-widest">{cat.slug}</span>
                <p className="font-headline font-bold text-on-surface text-lg">{cat.title}</p>
              </div>
              <div className="flex items-center gap-3">
                {edits[cat.slug] && Object.keys(edits[cat.slug]).length > 0 && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">unsaved</span>
                )}
                {expanded[cat.slug]
                  ? <ChevronUp className="w-5 h-5 text-outline" />
                  : <ChevronDown className="w-5 h-5 text-outline" />
                }
              </div>
            </div>

            {/* Expanded edit fields */}
            {expanded[cat.slug] && (
              <div className="px-6 pb-6 space-y-5 border-t border-outline-variant/10 pt-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">Title</label>
                    <input
                      value={getField(cat, 'title')}
                      onChange={(e) => setEdit(cat.slug, 'title', e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">Hero Tag</label>
                    <input
                      value={getField(cat, 'hero_tag')}
                      onChange={(e) => setEdit(cat.slug, 'hero_tag', e.target.value)}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">Subtitle</label>
                  <input
                    value={getField(cat, 'subtitle')}
                    onChange={(e) => setEdit(cat.slug, 'subtitle', e.target.value)}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">Hero Image URL</label>
                  <input
                    value={getField(cat, 'hero_image')}
                    onChange={(e) => setEdit(cat.slug, 'hero_image', e.target.value)}
                    className={inputCls}
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">Intro Title</label>
                  <input
                    value={getField(cat, 'intro_title')}
                    onChange={(e) => setEdit(cat.slug, 'intro_title', e.target.value)}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">
                    Intro Text (one paragraph per line — HTML links supported)
                  </label>
                  <textarea
                    value={(getField(cat, 'intro_text') || []).join('\n\n')}
                    onChange={(e) => setEdit(cat.slug, 'intro_text', e.target.value.split('\n\n').map(s => s.trim()).filter(Boolean))}
                    className={inputCls + ' min-h-[120px] font-mono text-xs'}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleSave(cat)}
                  disabled={saving === cat.slug}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-sm rounded-xl shadow-md hover:scale-[1.02] transition-transform disabled:opacity-60"
                >
                  <Save className="w-4 h-4" />
                  {saving === cat.slug ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  )
}
