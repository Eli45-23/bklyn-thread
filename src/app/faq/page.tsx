export default function FAQPage() {
  const faqs = [
    {
      question: "How long does it take to complete my order?",
      answer: "Most orders are completed within 5-7 business days. Complex designs or large orders may take longer. You'll receive a production timeline estimate when you place your order."
    },
    {
      question: "What file formats do you accept for custom designs?",
      answer: "We accept PNG, JPG, PDF, and SVG files. For best results, use high-resolution images (300 DPI or higher). Vector files (SVG) work best for logos and text."
    },
    {
      question: "How do I know what size to order?",
      answer: "Each product has a size guide available. Click the size chart link when selecting your size. We recommend measuring a similar item you already own for the best fit."
    },
    {
      question: "Can I see a preview of my design before ordering?",
      answer: "Yes! Our design tool shows you a live preview of your embroidered item. You can see exactly how your design will look on the selected product and placement."
    },
    {
      question: "What are your shipping options?",
      answer: "We offer standard shipping (5-7 business days) and express shipping (2-3 business days). Free shipping is available on orders over $50."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes! Quantity discounts are automatically applied: 10+ items (5% off), 25+ items (10% off), 50+ items (15% off), 100+ items (20% off)."
    },
    {
      question: "Can I return or exchange my order?",
      answer: "Due to the custom nature of our products, we don't accept returns unless there's a defect or error on our part. Please review your order carefully before placing it."
    },
    {
      question: "What thread colors are available?",
      answer: "We offer 18 standard thread colors including white, black, navy, red, royal blue, forest green, and more. You can see all available colors in the customization tool."
    },
    {
      question: "How much does embroidery cost?",
      answer: "Pricing depends on the item, design complexity, and quantity. Text embroidery starts at $3, while custom designs start at $5. Bulk orders receive automatic discounts."
    },
    {
      question: "Can I track my order?",
      answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also check your order status in your account dashboard."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about our embroidery services
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            We&apos;re here to help! Contact us for any additional questions about your order.
          </p>
          <a href="/contact" className="btn-primary">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}