import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  is_featured: false,
  tags: [],             // array of strings
  images: [],           // array of URL strings
  itinerary: [],        // [{day, title, description}]
  includes: [],         // string[]
  excludes: [],         // string[]
}

export default function TripForm() {
  const { t } = useTranslation()
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
        is_featured:      data.is_featured        || false,
        tags:             data.tags               || [],
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
      if (upErr) { showToast(t('admin.trip_form.toasts.upload_error', { message: upErr.message }), 'error'); continue }
      const { data: urlData } = supabase.storage.from('trip-images').getPublicUrl(fileName)
      urls.push(urlData.publicUrl)
    }
    setField('images', [...form.images, ...urls].slice(0, 10))
    setUploading(false)
    e.target.value = ''
    showToast(t('admin.trip_form.toasts.uploaded', { count: urls.length }))
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

    // Validation
    if (form.images.length < 5) {
      setError(t('admin.trip_form.toasts.min_images'))
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (form.images.length > 10) {
      setError(t('admin.trip_form.toasts.max_images'))
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

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
      is_featured:      form.is_featured,
      tags:             form.tags.filter(Boolean),
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
    showToast(isEdit ? t('admin.trip_form.toasts.updated') : t('admin.trip_form.toasts.created'))
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
          {isEdit ? t('admin.trip_form.edit', { id: tripId }) : t('admin.trip_form.add_new')}
        </h1>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {error && (
            <div className="bg-error/10 border border-error/30 text-error text-sm rounded-xl px-4 py-3">{error}</div>
          )}

          {/* ── Basic Info ──────────────────────────────────────── */}
          <section className="bg-surface rounded-2xl p-8 border border-outline-variant/20 shadow-sm space-y-6">
            <h2 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-4">
              {t('admin.trip_form.sections.basic')}
            </h2>

            {!isEdit && (
              <Field label={t('admin.trip_form.fields.id')} hint={t('admin.trip_form.fields.id_hint')}>
                <input id="field-id" value={form.id} onChange={(e) => setField('id', e.target.value)}
                  className={inputCls} placeholder={t('admin.trip_form.placeholders.id')} />
              </Field>
            )}

            <Field label={t('admin.trip_form.fields.title')}>
              <input id="field-title" value={form.title} onChange={(e) => setField('title', e.target.value)}
                className={inputCls} required placeholder={t('admin.trip_form.placeholders.title')} />
            </Field>

            <Field label={t('admin.trip_form.fields.category')}>
              <select id="field-category" value={form.category_slug} onChange={(e) => setField('category_slug', e.target.value)} className={inputCls}>
                <option value="">{t('admin.trip_form.fields.category_select')}</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.title} ({c.slug})</option>
                ))}
              </select>
            </Field>

            <Field label={t('admin.trip_form.fields.short_description')}>
              <textarea id="field-desc" value={form.short_description} onChange={(e) => setField('short_description', e.target.value)}
                className={inputCls + ' min-h-[100px]'} placeholder={t('admin.trip_form.placeholders.short_description')} />
            </Field>

            <Field label={t('admin.trip_form.fields.category_label')} hint={t('admin.trip_form.fields.category_label_hint')}>
              <input id="field-catlabel" value={form.category_label} onChange={(e) => setField('category_label', e.target.value)}
                className={inputCls} placeholder={t('admin.trip_form.placeholders.category_label')} />
            </Field>

            <div className="flex items-center gap-3 pt-2">
              <input
                id="field-featured"
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => setField('is_featured', e.target.checked)}
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
              />
              <label htmlFor="field-featured" className="text-sm font-bold text-on-surface cursor-pointer">
                {t('admin.trip_form.fields.featured')}
              </label>
            </div>
          </section>

          {/* ── Logistics ──────────────────────────────────────── */}
          <section className="bg-surface rounded-2xl p-8 border border-outline-variant/20 shadow-sm space-y-6">
            <h2 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-4">
              {t('admin.trip_form.sections.logistics')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Field label={t('admin.trip_form.fields.duration')}>
                <input id="field-duration" value={form.duration} onChange={(e) => setField('duration', e.target.value)}
                  className={inputCls} placeholder={t('admin.trip_form.placeholders.duration')} />
              </Field>
              <Field label={t('admin.trip_form.fields.group_size')}>
                <input id="field-group" value={form.group_size} onChange={(e) => setField('group_size', e.target.value)}
                  className={inputCls} placeholder={t('admin.trip_form.placeholders.group_size')} />
              </Field>
              <Field label={t('admin.trip_form.fields.language')}>
                <input id="field-lang" value={form.language} onChange={(e) => setField('language', e.target.value)}
                  className={inputCls} placeholder={t('admin.trip_form.placeholders.language')} />
              </Field>
              <Field label={t('admin.trip_form.fields.departing')}>
                <input id="field-depart" value={form.departing_details} onChange={(e) => setField('departing_details', e.target.value)}
                  className={inputCls} placeholder={t('admin.trip_form.placeholders.departing')} />
              </Field>
            </div>
          </section>

          {/* ── Pricing ────────────────────────────────────────── */}
          <section className="bg-surface rounded-2xl p-8 border border-outline-variant/20 shadow-sm space-y-6">
            <h2 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-4">
              {t('admin.trip_form.sections.pricing')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Field label={t('admin.trip_form.fields.price_person')}>
                <input id="field-price1" type="number" min="0" step="0.01" value={form.price_per_person}
                  onChange={(e) => setField('price_per_person', e.target.value)} className={inputCls} placeholder={t('admin.trip_form.placeholders.price')} />
              </Field>
              <Field label={t('admin.trip_form.fields.price_two')}>
                <input id="field-price2" type="number" min="0" step="0.01" value={form.price_per_two}
                  onChange={(e) => setField('price_per_two', e.target.value)} className={inputCls} placeholder={t('admin.trip_form.placeholders.price')} />
              </Field>
              <Field label={t('admin.trip_form.fields.rating')}>
                <input id="field-stars" type="number" min="1" max="5" step="0.1" value={form.star_rating}
                  onChange={(e) => setField('star_rating', e.target.value)} className={inputCls} placeholder={t('admin.trip_form.placeholders.rating')} />
              </Field>
            </div>
          </section>

          {/* ── Tags ───────────────────────────────────────────── */}
          <section className="bg-surface rounded-2xl p-8 border border-outline-variant/20 shadow-sm space-y-6">
            <h2 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-4">
              {t('admin.trip_form.sections.tags')}
            </h2>
            <Field label={t('admin.trip_form.fields.tags')} hint={t('admin.trip_form.fields.tags_hint')}>
              <div className="flex flex-wrap gap-2 mb-3">
                {form.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full flex items-center gap-2">
                    {tag}
                    <button type="button" onClick={() => setField('tags', form.tags.filter((_, idx) => idx !== i))}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                className={inputCls}
                placeholder={t('admin.trip_form.placeholders.tags')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const val = e.target.value.trim()
                    if (val && !form.tags.includes(val)) {
                      setField('tags', [...form.tags, val])
                      e.target.value = ''
                    }
                  }
                }}
              />
            </Field>
          </section>

          {/* ── Images ─────────────────────────────────────────── */}
          <section className="bg-surface rounded-2xl p-8 border border-outline-variant/20 shadow-sm space-y-6">
            <h2 className="font-headline text-xl font-bold text-on-surface border-b border-outline-variant/20 pb-4">
              {t('admin.trip_form.sections.images')}
            </h2>

            {/* Upload button */}
            <div className="space-y-4">
              <div className="flex items-center justify-between font-headline font-bold text-sm">
                <span className={form.images.length < 5 ? 'text-error' : 'text-primary'}>
                  {t('admin.trip_form.fields.image_limit', { count: form.images.length })}
                  {form.images.length < 5 && ` ${t('admin.trip_form.fields.image_min_hint')}`}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <label htmlFor="field-upload" className={`grow flex items-center justify-center gap-2 px-5 py-4 rounded-xl border-2 border-dashed border-primary/40 text-primary font-bold text-sm cursor-pointer hover:bg-primary/5 transition-all active:scale-95 ${uploading || form.images.length >= 10 ? 'opacity-60 pointer-events-none' : ''}`}>
                  <Upload className="w-5 h-5" />
                  {uploading ? t('admin.trip_form.fields.image_uploading') : form.images.length >= 10 ? t('admin.trip_form.fields.image_limit_reached') : t('admin.trip_form.fields.image_upload')}
                </label>
                <input id="field-upload" type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              </div>
              
              <p className="text-[10px] text-outline leading-tight uppercase tracking-widest font-bold opacity-60">
                {t('admin.trip_form.fields.image_supports')}
              </p>
            </div>

            {/* URL textarea for pasting external URLs */}
            <Field label={t('admin.trip_form.fields.image_urls')}>
              <textarea
                id="field-img-urls"
                value={form.images.join('\n')}
                onChange={(e) => setField('images', e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
                className={inputCls + ' min-h-[80px] font-mono text-xs'}
                placeholder={t('admin.trip_form.placeholders.image_urls')}
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
              <h2 className="font-headline text-xl font-bold text-on-surface">{t('admin.trip_form.sections.itinerary')}</h2>
              <button type="button" onClick={addDay}
                className="flex items-center gap-1 text-primary font-bold text-sm hover:bg-primary/10 px-3 py-2 rounded-xl transition-colors">
                <PlusCircle className="w-4 h-4" /> {t('admin.trip_form.buttons.add_day')}
              </button>
            </div>
            {form.itinerary.length === 0 && (
              <p className="text-sm text-outline text-center py-4">{t('admin.trip_form.buttons.itinerary_empty')}</p>
            )}
            {form.itinerary.map((item, i) => (
              <div key={i} className="border border-outline-variant/20 rounded-xl p-5 space-y-3 relative">
                <button type="button" onClick={() => removeDay(i)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-error/10 text-error transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div className="grid grid-cols-3 gap-3">
                  <Field label={t('admin.trip_form.fields.itinerary_day')} className="col-span-1">
                    <input type="number" min="1" value={item.day} onChange={(e) => updateDay(i, 'day', parseInt(e.target.value))}
                      className={inputCls} />
                  </Field>
                  <Field label={t('admin.trip_form.fields.itinerary_title')} className="col-span-2">
                    <input value={item.title} onChange={(e) => updateDay(i, 'title', e.target.value)}
                      className={inputCls} placeholder={t('admin.trip_form.placeholders.itinerary_title')} />
                  </Field>
                </div>
                <Field label={t('admin.trip_form.fields.itinerary_desc')}>
                  <textarea value={item.description} onChange={(e) => updateDay(i, 'description', e.target.value)}
                    className={inputCls + ' min-h-[80px]'} placeholder={t('admin.trip_form.placeholders.itinerary_desc')} />
                </Field>
              </div>
            ))}
          </section>

          {/* ── Includes / Excludes ─────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-6">
            <ListEditor label={t('admin.trip_form.sections.includes')} items={form.includes} fieldKey="includes"
              t_add={t('admin.trip_form.buttons.list_add')} t_empty={t('admin.trip_form.buttons.list_empty')} t_placeholder={t('admin.trip_form.placeholders.list_item')}
              onAdd={() => addListItem('includes')} onRemove={(i) => removeListItem('includes', i)}
              onUpdate={(i, v) => updateListItem('includes', i, v)} />
            <ListEditor label={t('admin.trip_form.sections.excludes')} items={form.excludes} fieldKey="excludes"
              t_add={t('admin.trip_form.buttons.list_add')} t_empty={t('admin.trip_form.buttons.list_empty')} t_placeholder={t('admin.trip_form.placeholders.list_item')}
              onAdd={() => addListItem('excludes')} onRemove={(i) => removeListItem('excludes', i)}
              onUpdate={(i, v) => updateListItem('excludes', i, v)} />
          </div>

          {/* ── Submit ─────────────────────────────────────────── */}
          <div className="flex gap-4">
            <button type="submit" disabled={saving}
              className="flex-1 py-4 bg-linear-to-br from-primary to-primary-container text-on-primary font-headline font-extrabold uppercase tracking-widest rounded-xl shadow-lg hover:scale-[1.01] transition-transform disabled:opacity-60">
              {saving ? t('admin.trip_form.buttons.saving') : isEdit ? t('admin.trip_form.buttons.submit_update') : t('admin.trip_form.buttons.submit_create')}
            </button>
            <Link to="/admin/dashboard"
              className="px-8 py-4 border border-outline-variant rounded-xl font-bold text-on-surface-variant hover:bg-surface-container transition-colors text-center">
              {t('admin.trip_form.buttons.cancel')}
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

function ListEditor({ label, items, onAdd, onRemove, onUpdate, t_add, t_empty, t_placeholder }) {
  return (
    <section className="bg-surface rounded-2xl p-6 border border-outline-variant/20 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
        <h2 className="font-headline text-base font-bold text-on-surface">{label}</h2>
        <button type="button" onClick={onAdd}
          className="flex items-center gap-1 text-primary text-xs font-bold hover:bg-primary/10 px-2 py-1.5 rounded-lg transition-colors">
          <PlusCircle className="w-3.5 h-3.5" /> {t_add}
        </button>
      </div>
      {items.length === 0 && <p className="text-xs text-outline text-center py-2">{t_empty}</p>}
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input value={item} onChange={(e) => onUpdate(i, e.target.value)}
            className={inputCls + ' flex-1'} placeholder={t_placeholder} />
          <button type="button" onClick={() => onRemove(i)}
            className="p-2 rounded-lg hover:bg-error/10 text-error shrink-0 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </section>
  )
}
