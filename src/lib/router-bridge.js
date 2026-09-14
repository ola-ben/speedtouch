'use client'

import React, { useState, useEffect } from 'react'
import NextLink from 'next/link'
import {
  useParams as useNextParams,
  useRouter,
  usePathname,
  useSearchParams as useNextSearchParams,
} from 'next/navigation'

/**
 * Universal Next.js Link adapter that supports both 	o (React Router) and href (Next.js).
 */
export function Link({ to, href, children, className, ...props }) {
  const target = href || to || '/'
  const renderedChildren = typeof children === 'function' ? children({ isActive: false }) : children
  return (
    <NextLink href={target} className={className} {...props}>
      {renderedChildren}
    </NextLink>
  )
}

/**
 * Universal NavLink adapter that computes isActive state based on current pathname.
 */
export function NavLink({ to, href, className, children, end, ...props }) {
  const pathname = usePathname()
  const target = href || to || '/'
  const isActive = end ? pathname === target : pathname?.startsWith(target)
  const computedClassName = typeof className === 'function' ? className({ isActive }) : className
  const renderedChildren = typeof children === 'function' ? children({ isActive }) : children

  return (
    <NextLink href={target} className={computedClassName} {...props}>
      {renderedChildren}
    </NextLink>
  )
}

/**
 * Universal useParams adapter for Next.js App Router.
 */
export function useParams() {
  const params = useNextParams()
  return params || {}
}

/**
 * Universal useNavigate adapter for Next.js App Router.
 */
export function useNavigate() {
  const router = useRouter()
  return (path, options) => {
    if (typeof path === 'number') {
      if (path === -1 && typeof window !== 'undefined') window.history.back()
      return
    }
    if (options?.replace) {
      router.replace(path)
    } else {
      router.push(path)
    }
  }
}

/**
 * Universal useLocation adapter for Next.js App Router without triggering CSR bailout during static prerendering.
 */
export function useLocation() {
  const pathname = usePathname()
  const [search, setSearch] = useState('')
  const [hash, setHash] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSearch(window.location.search || '')
      setHash(window.location.hash || '')
    }
  }, [pathname])

  return { pathname: pathname || '/', search, hash }
}

/**
 * Universal useSearchParams adapter for Next.js App Router.
 */
export function useSearchParams() {
  let searchParams
  try {
    searchParams = useNextSearchParams()
  } catch (e) {
    searchParams = null
  }
  const router = useRouter()
  const pathname = usePathname()

  const setSearchParams = (newParams) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (typeof newParams === 'function') {
      newParams = newParams(params)
    }
    if (newParams) {
      Object.entries(newParams).forEach(([k, v]) => {
        if (v === undefined || v === null) params.delete(k)
        else params.set(k, String(v))
      })
    }
    const query = params.toString()
    router.replace(pathname + (query ? '?' + query : ''))
  }

  return [searchParams || new URLSearchParams(), setSearchParams]
}

export function BrowserRouter({ children }) {
  return <>{children}</>
}

export function Routes({ children }) {
  return <>{children}</>
}

export function Route({ element }) {
  return element || null
}

export function Navigate({ to, replace }) {
  const router = useRouter()
  useEffect(() => {
    if (replace) router.replace(to)
    else router.push(to)
  }, [to, replace, router])
  return null
}

export function Outlet({ children }) {
  return children || null
}

export default {
  Link,
  NavLink,
  useParams,
  useNavigate,
  useLocation,
  useSearchParams,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
}
