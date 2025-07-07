'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const { state, dispatch } = useCart()
  
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BT</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">BKLYN Thread</h1>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/customize" className="text-gray-600 hover:text-blue-600">
              Customize
            </Link>
            <Link href="/faq" className="text-gray-600 hover:text-blue-600">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </Link>
            <Link 
              href="/cart" 
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
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
        </div>
      </div>
    </header>
  )
}