import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useCategories } from '../../hooks/useCategories'
import { PlusCircle, Trash2, Upload, ArrowLeft, X } from 'lucide-react'

const DEFAULT_FORM = {
  id: '',
  category_slug: '',
  title: '',
  short_description: '',
  category_label: '',
  duration: '',
  group_size: '',
  language: 'Français, Anglais',
  price_per_person: '',
  price_per_two: '',
  departing_details: '',
  star_rating: '5',
  images: [],           // array of URL strings
  itinerary: [],        // [{day, title, description}]
  includes: [],         // string[]
  excludes: [],         // string[]
}

export default function TripForm() {
  const { tripId } = useParams()
  const isEdit = Boolean(tripId)
  const navigate = useNavigate()
  const { categories } = useCategories()

  const [form, setForm] = useState(DEFAULT_FORM)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)
  const [uploading, setUploading] = useState(false)

  // ── Load existing trip when editing ────────────────────────────
  useEffect(() => {
    if (!isEdit) return
    supabase.from('trips').select('*').eq('id', tripId).single().then(({ data, error: err }) => {
      if (err) { setError(err.message); setLoading(false); return }
      setForm({
        id:               data.id                || '',
        category_slug:    data.category_slug      || '',
        title:            data.title              || '',
        short_description: data.short_description || '',
        category_label:   data.category_label     || '',
        duration:         data.duration           || '',
        group_size:       data.group_size         || '',
        language:         data.language           || 'Français, Anglais',
        price_per_person: data.price_per_person   != null ? String(data.price_per_person) : '',
        price_per_two:    data.price_per_two      != null ? String(data.price_per_two) : '',
        departing_details: data.departing_details || '',
        star_rating:      data.star_rating        != null ? String(data.star_rating) : '5',
        images:           data.images             || [],
        itinerary:        data.itinerary          || [],
        includes:         data.includes           || [],
        excludes:         data.excludes           || [],
      })
      setLoading(false)
    })
  }, [tripId, isEdit])

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 4000)
  }

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  // ── Image upload to Supabase Storage ───────────────────────────
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    const urls = []
    for (const file of files) {
      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: upErr } = await supabase.storage
        .from('trip-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })
      if (upErr) { showToast(`Upload error: ${upErr.message}`, 'error'); continue }
      const { data: urlData } = supabase.storage.from('trip-images').getPublicUrl(fileName)
      urls.push(urlData.publicUrl)
    }
    setField('images', [...form.images, ...urls])
    setUploading(false)
    e.target.value = ''
  }

  const removeImage = (idx) => setField('images', form.images.filter((_, i) => i !== idx))

  // ── Itinerary helpers ───────────────────────────────────────────
  const addDay = () => setField('itinerary', [...form.itinerary, { day: form.itinerary.length + 1, title: '', description: '' }])
  const removeDay = (i) => setField('itinerary', form.itinerary.filter((_, idx) => idx !== i))
  const updateDay = (i, key, val) => {
    const updated = form.itinerary.map((d, idx) => idx === i ? { ...d, [key]: val } : d)
    setField('itinerary', updated)
  }

  // ── List helpers (includes / excludes) ─────────────────────────
  const addListItem = (key) => setField(key, [...form[key], ''])
  const removeListItem = (key, i) => setField(key, form[key].filter((_, idx) => idx !== i))
  const updateListItem = (key, i, val) => setField(key, form[key].map((v, idx) => idx === i ? val : v))

  // ── Submit ──────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const payload = {
      category_slug:    form.category_slug || null,
      title:            form.title,
      short_description: form.short_description || null,
      category_label:   form.category_label || null,
      duration:         form.duration || null,
      group_size:       form.group_size || null,
      language:         form.language || null,
      price_per_person: form.price_per_person !== '' ? parseFloat(form.price_per_person) : null,
      price_per_two:    form.price_per_two    !== '' ? parseFloat(form.price_per_two)    : null,
      departing_details: form.departing_details || null,
      star_rating:      form.star_rating !== '' ? parseFloat(form.star_rating) : null,
      images:           form.images,
      itinerary:        form.itinerary,
      includes:         form.includes.filter(Boolean),
      excludes:         form.excludes.filter(Boolean),
    }

    let err
    if (isEdit) {
      const res = await supabase.from('trips').update(payload).eq('id', tripId)
      err = res.error
    } else {
      const id = form.id.trim().toLowerCase().replace(/\s+/g, '-') || `trip-${Date.now()}`
      const res = await supabase.from('trips').insert({ id, ...payload })
      err = res.error
    }

    setSaving(false)
    if (err) { setError(err.message); return }
    showToast(isEdit ? 'Trip updated!' : 'Trip created!')
    setTimeout(() => navigate('/admin/dashboard'), 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

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
        <h1 className="font-headline font-bold text-on-surface text-lg">
          {isEdit ? `Edit: ${tripId}` : 'Add New Trip'}
        </h1>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {error && (
            <div className="bg-error/10 border border-error/30 text-error text-sm rounded-xl px-4 py-3">{error}</div>
          )}

          {/* ── Basic Info ──────────────────────────────────────── */}
          <section className="bg-surface rounded-2xl p-8 border border-outline-variant/20 shadow-sm space-y-6">
            <h2 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-4">Basic Information</h2>

            {!isEdit && (
              <Field label="Trip ID (slug)" hint="e.g. nile-cruise — auto-generated if blank">
                <input id="field-id" value={form.id} onChange={(e) => setField('id', e.target.value)}
                  className={inputCls} placeholder="my-trip-slug" />
              </Field>
            )}

            <Field label="Title *">
              <input id="field-title" value={form.title} onChange={(e) => setField('title', e.target.value)}
                className={inputCls} required placeholder="Trip title" />
            </Field>

            <Field label="Category">
              <select id="field-category" value={form.category_slug} onChange={(e) => setField('category_slug', e.target.value)} className={inputCls}>
                <option value="">— Select category —</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.title} ({c.slug})</option>
                ))}
              </select>
            </Field>

            <Field label="Short Description">
              <textarea id="field-desc" value={form.short_description} onChange={(e) => setField('short_description', e.target.value)}
                className={inputCls + ' min-h-[100px]'} placeholder="Brief teaser text shown on listing cards" />
            </Field>

            <Field label="Category Label" hint="e.g. Expérience Signature">
              <input id="field-catlabel" value={form.category_label} onChange={(e) => setField('category_label', e.target.value)}
                className={inputCls} placeholder="Category label" />
            </Field>
          </section>

          {/* ── Logistics ──────────────────────────────────────── */}
          <section className="bg-surface rounded-2xl p-8 border border-outline-variant/20 shadow-sm space-y-6">
            <h2 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-4">Logistics</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Duration">
                <input id="field-duration" value={form.duration} onChange={(e) => setField('duration', e.target.value)}
                  className={inputCls} placeholder="10 Jours / 9 Nuits" />
              </Field>
              <Field label="Group Size">
                <input id="field-group" value={form.group_size} onChange={(e) => setField('group_size', e.target.value)}
                  className={inputCls} placeholder="Max 12 Personnes" />
              </Field>
              <Field label="Language">
                <input id="field-lang" value={form.language} onChange={(e) => setField('language', e.target.value)}
                  className={inputCls} placeholder="Français, Anglais" />
              </Field>
              <Field label="Departing Details">
                <input id="field-depart" value={form.departing_details} onChange={(e) => setField('departing_details', e.target.value)}
                  className={inputCls} placeholder="Departs from Cairo every Saturday" />
              </Field>
            </div>
          </section>

          {/* ── Pricing ────────────────────────────────────────── */}
          <section className="bg-surface rounded-2xl p-8 border border-outline-variant/20 shadow-sm space-y-6">
            <h2 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-4">Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Field label="Price Per Person (€)">
                <input id="field-price1" type="number" min="0" step="0.01" value={form.price_per_person}
                  onChange={(e) => setField('price_per_person', e.target.value)} className={inputCls} placeholder="2450" />
              </Field>
              <Field label="Price Per Two (€)">
                <input id="field-price2" type="number" min="0" step="0.01" value={form.price_per_two}
                  onChange={(e) => setField('price_per_two', e.target.value)} className={inputCls} placeholder="4200" />
              </Field>
              <Field label="Star Rating (1–5)">
                <input id="field-stars" type="number" min="1" max="5" step="0.1" value={form.star_rating}
                  onChange={(e) => setField('star_rating', e.target.value)} className={inputCls} placeholder="4.9" />
              </Field>
            </div>
          </section>

          {/* ── Images ─────────────────────────────────────────── */}
          <section className="bg-surface rounded-2xl p-8 border border-outline-variant/20 shadow-sm space-y-6">
            <h2 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-4">Images</h2>

            {/* Upload button */}
            <div>
              <label htmlFor="field-upload" className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-dashed border-primary/40 text-primary font-bold text-sm cursor-pointer hover:bg-primary/5 transition-colors ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
                <Upload className="w-4 h-4" />
                {uploading ? 'Uploading…' : 'Upload images to Supabase Storage'}
              </label>
              <input id="field-upload" type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              <p className="text-xs text-outline mt-2">Uploads to the <code>trip-images</code> storage bucket (must be created &amp; set to PUBLIC in Supabase dashboard first)</p>
            </div>

            {/* URL textarea for pasting external URLs */}
            <Field label="Or paste image URLs (one per line)">
              <textarea
                id="field-img-urls"
                value={form.images.join('\n')}
                onChange={(e) => setField('images', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
                className={inputCls + ' min-h-[80px] font-mono text-xs'}
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              />
            </Field>

            {/* Previews */}
            {form.images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {form.images.map((src, i) => (
                  <div key={i} className="relative w-24 h-24 group">
                    <img src={src} alt={`img-${i}`} className="w-full h-full object-cover rounded-xl border border-outline-variant/20"
                      onError={(e) => { e.currentTarget.style.display = 'none' }} />
                    <button type="button" onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full items-center justify-center hidden group-hover:flex shadow-md">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── Itinerary ───────────────────────────────────────── */}
          <section className="bg-surface rounded-2xl p-8 border border-outline-variant/20 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
              <h2 className="font-headline text-xl font-bold text-on-surface">Itinerary</h2>
              <button type="button" onClick={addDay}
                className="flex items-center gap-1 text-primary font-bold text-sm hover:bg-primary/10 px-3 py-2 rounded-xl transition-colors">
                <PlusCircle className="w-4 h-4" /> Add Day
              </button>
            </div>
            {form.itinerary.length === 0 && (
              <p className="text-sm text-outline text-center py-4">No itinerary days yet. Click "Add Day" to begin.</p>
            )}
            {form.itinerary.map((item, i) => (
              <div key={i} className="border border-outline-variant/20 rounded-xl p-5 space-y-3 relative">
                <button type="button" onClick={() => removeDay(i)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-error/10 text-error transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Day #" className="col-span-1">
                    <input type="number" min="1" value={item.day} onChange={(e) => updateDay(i, 'day', parseInt(e.target.value))}
                      className={inputCls} />
                  </Field>
                  <Field label="Day Title" className="col-span-2">
                    <input value={item.title} onChange={(e) => updateDay(i, 'title', e.target.value)}
                      className={inputCls} placeholder="Arrival in Cairo" />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea value={item.description} onChange={(e) => updateDay(i, 'description', e.target.value)}
                    className={inputCls + ' min-h-[80px]'} placeholder="Detailed description of this day's activities…" />
                </Field>
              </div>
            ))}
          </section>

          {/* ── Includes / Excludes ─────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-6">
            <ListEditor label="Price Includes" items={form.includes} fieldKey="includes"
              onAdd={() => addListItem('includes')} onRemove={(i) => removeListItem('includes', i)}
              onUpdate={(i, v) => updateListItem('includes', i, v)} />
            <ListEditor label="Price Excludes" items={form.excludes} fieldKey="excludes"
              onAdd={() => addListItem('excludes')} onRemove={(i) => removeListItem('excludes', i)}
              onUpdate={(i, v) => updateListItem('excludes', i, v)} />
          </div>

          {/* ── Submit ─────────────────────────────────────────── */}
          <div className="flex gap-4">
            <button type="submit" disabled={saving}
              className="flex-1 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-extrabold uppercase tracking-widest rounded-xl shadow-lg hover:scale-[1.01] transition-transform disabled:opacity-60">
              {saving ? 'Saving…' : isEdit ? 'Update Trip' : 'Create Trip'}
            </button>
            <Link to="/admin/dashboard"
              className="px-8 py-4 border border-outline-variant rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors text-center">
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}

// ── Helper components ────────────────────────────────────────────

const inputCls = 'w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline/50 font-medium text-sm'

function Field({ label, hint, children, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">{label}</label>
      {children}
      {hint && <p className="text-xs text-outline mt-1">{hint}</p>}
    </div>
  )
}

function ListEditor({ label, items, onAdd, onRemove, onUpdate }) {
  return (
    <section className="bg-surface rounded-2xl p-6 border border-outline-variant/20 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
        <h2 className="font-headline text-base font-bold text-on-surface">{label}</h2>
        <button type="button" onClick={onAdd}
          className="flex items-center gap-1 text-primary text-xs font-bold hover:bg-primary/10 px-2 py-1.5 rounded-lg transition-colors">
          <PlusCircle className="w-3.5 h-3.5" /> Add
        </button>
      </div>
      {items.length === 0 && <p className="text-xs text-outline text-center py-2">None yet</p>}
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input value={item} onChange={(e) => onUpdate(i, e.target.value)}
            className={inputCls + ' flex-1'} placeholder="Item description" />
          <button type="button" onClick={() => onRemove(i)}
            className="p-2 rounded-lg hover:bg-error/10 text-error shrink-0 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </section>
  )
}
