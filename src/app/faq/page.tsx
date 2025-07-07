'use client'

import Link from 'next/link'
import { ArrowLeft, ChevronDown, ChevronRight, Star, Clock, Shield, Truck } from 'lucide-react'
import { useState } from 'react'

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: "Ordering & Pricing",
    question: "What is your turnaround time?",
    answer: "Standard turnaround is 5-7 business days from artwork approval. Rush orders (2-3 days) available for 50% additional charge. Large orders (100+ pieces) may require 7-10 business days."
  },
  {
    category: "Ordering & Pricing", 
    question: "Do you offer quantity discounts?",
    answer: "Yes! Volume discounts: 12-23 pieces (5% off), 24-49 pieces (10% off), 50-99 pieces (15% off), 100+ pieces (20% off). Contact us for enterprise pricing on orders over 500 pieces."
  },
  {
    category: "Ordering & Pricing",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, company purchase orders (with approved credit), and ACH bank transfers for orders over $500."
  },
  {
    category: "Ordering & Pricing",
    question: "Do you charge setup fees?",
    answer: "Text embroidery has no setup fee. Logo embroidery has a one-time $25 digitizing fee per design. Once digitized, reorders have no additional setup costs."
  },
  {
    category: "Artwork & Design",
    question: "What file formats do you accept?",
    answer: "We accept PNG, JPG, PDF, AI, EPS, and SVG files. Vector files (AI, EPS, SVG) are preferred for logo embroidery. Minimum resolution for raster images is 300 DPI at actual size."
  },
  {
    category: "Artwork & Design",
    question: "Can you help create or modify my design?",
    answer: "Yes! Our design team can create simple text layouts, convert low-resolution images to embroidery-ready files, or make minor modifications. Design services start at $35/hour."
  },
  {
    category: "Artwork & Design", 
    question: "What are the size limitations for embroidery?",
    answer: "Maximum embroidery size is 14\" x 16\" for back designs. Left chest maximum is 4\" x 4\". Minimum text size is 0.25\" tall for legibility. We'll optimize your design for the best results."
  },
  {
    category: "Artwork & Design",
    question: "How many colors can I use in my design?",
    answer: "There's no strict limit, but we recommend 6 colors or fewer for optimal appearance and cost. Each color change adds time and cost. We can suggest color reductions to improve your design."
  },
  {
    category: "Products & Quality",
    question: "What brands do you use?",
    answer: "We use premium brands including Hanes, Gildan Heavy Cotton, Port & Company, and Sport-Tek. All garments are pre-shrunk and high-quality. Brand selection varies by style and color."
  },
  {
    category: "Products & Quality",
    question: "Do you guarantee your work?",
    answer: "Absolutely! We offer a 100% satisfaction guarantee. If you're not happy with the quality, we'll remake your order at no charge or provide a full refund."
  },
  {
    category: "Products & Quality",
    question: "How should I care for embroidered items?",
    answer: "Machine wash cold (inside out), tumble dry low heat. Avoid bleach and fabric softener. For best longevity, air dry when possible. Proper care will keep your embroidery looking great for years."
  },
  {
    category: "Shipping & Delivery",
    question: "What are your shipping options?",
    answer: "Free standard shipping (5-7 days) on orders over $50. Expedited options: 2-day ($15), overnight ($30). Local Brooklyn delivery available for $10 within 10 miles."
  },
  {
    category: "Shipping & Delivery",
    question: "Do you ship internationally?",
    answer: "Currently we ship within the US only. We're working on international shipping options. Contact us for special arrangements on large international orders."
  },
  {
    category: "Business Services",
    question: "Do you work with businesses and organizations?",
    answer: "Yes! We serve businesses, schools, sports teams, nonprofits, and government agencies. We offer corporate accounts, bulk pricing, and can work with your procurement processes."
  },
  {
    category: "Business Services",
    question: "Can you provide samples before ordering?",
    answer: "Yes, we can create samples for $25-50 depending on complexity. Sample cost is credited toward your final order if you proceed with 25+ pieces."
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQs = selectedCategory === "All" 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BT</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">BKLYN Thread</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link href="/customize" className="text-gray-600 hover:text-blue-600">Customize</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
              <Link href="/cart" className="text-gray-600 hover:text-blue-600">Cart</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-1" />
          Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about custom embroidery services, ordering, and more.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <Clock className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">5-7 Day Turnaround</h3>
            <p className="text-sm text-gray-600">Fast, reliable production</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Quality Guaranteed</h3>
            <p className="text-sm text-gray-600">100% satisfaction promise</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <Truck className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
            <p className="text-sm text-gray-600">On orders over $50</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Premium Quality</h3>
            <p className="text-sm text-gray-600">Professional embroidery</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div>
                  <span className="text-sm font-medium text-blue-600 mb-1 block">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.question}
                  </h3>
                </div>
                {openItems.includes(index) ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
          <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
          <p className="text-blue-100 mb-4">Our embroidery experts are here to help you create the perfect custom apparel.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors">
              Contact Us
            </Link>
            <Link href="/demo" className="border border-white text-white hover:bg-white hover:text-blue-600 font-medium py-3 px-6 rounded-lg transition-colors">
              Try Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}