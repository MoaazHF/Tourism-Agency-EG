import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const { t } = useTranslation()
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || t('admin.login.error_failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface-container flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <p className="font-['Caveat'] text-primary text-2xl mb-1">{t('admin.dashboard_subtitle')}</p>
          <h1 className="text-3xl font-extrabold font-headline text-on-surface">{t('admin.login.portal')}</h1>
          <p className="text-on-surface-variant text-sm mt-2">{t('admin.login.subtitle')}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface rounded-2xl shadow-xl shadow-secondary/10 border border-outline-variant/20 p-8 space-y-6"
        >
          {/* Error */}
          {error && (
            <div className="bg-error/10 border border-error/30 text-error text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="admin-email" className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">
              {t('admin.login.email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-4 rounded-xl bg-surface-container-low border-0 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline/50 font-medium"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="admin-password" className="block text-xs uppercase tracking-widest font-bold text-outline mb-2">
              {t('admin.login.password')}
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input
                id="admin-password"
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-4 rounded-xl bg-surface-container-low border-0 focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline/50 font-medium"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-linear-to-br from-primary to-primary-container text-on-primary font-headline font-extrabold uppercase tracking-widest rounded-xl shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? t('admin.login.signing_in') : t('admin.login.submit')}
          </button>
        </form>

        <p className="text-center text-xs text-outline mt-6">
          {t('admin.login.forgot')}
        </p>
      </div>
    </div>
  )
}
