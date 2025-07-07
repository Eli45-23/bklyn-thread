'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'

export default function Header() {
  const { state } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BT</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">BKLYN Thread</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/customize" className="text-gray-600 hover:text-blue-600 py-2 px-3 rounded-md transition-colors">
              Customize
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-blue-600 py-2 px-3 rounded-md transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 py-2 px-3 rounded-md transition-colors">
              Contact
            </Link>
            <Link 
              href="/cart" 
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-1 py-2 px-3 rounded-md transition-colors"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu button & Cart */}
          <div className="md:hidden flex items-center space-x-4">
            <Link 
              href="/cart" 
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-1 p-2 rounded-md transition-colors"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 p-2 rounded-md transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-1">
              <Link 
                href="/customize" 
                className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 py-3 px-4 rounded-md transition-colors text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Customize
              </Link>
              <Link 
                href="/faq" 
                className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 py-3 px-4 rounded-md transition-colors text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/contact" 
                className="block text-gray-600 hover:text-blue-600 hover:bg-gray-50 py-3 px-4 rounded-md transition-colors text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}