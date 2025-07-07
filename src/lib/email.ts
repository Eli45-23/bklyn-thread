import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export const sendOrderConfirmation = async (
  email: string,
  orderData: {
    orderId: string
    totalAmount: number
    items: Array<{
      productName: string
      quantity: number
      size: string
      color: string
    }>
  }
) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: `Order Confirmation - ${orderData.orderId}`,
    html: `
      <h2>Thank you for your order!</h2>
      <p>Order ID: ${orderData.orderId}</p>
      <p>Total: $${orderData.totalAmount.toFixed(2)}</p>
      
      <h3>Items:</h3>
      <ul>
        ${orderData.items.map(item => `
          <li>${item.productName} - Size: ${item.size}, Color: ${item.color}, Qty: ${item.quantity}</li>
        `).join('')}
      </ul>
      
      <p>Production time: 5-7 business days</p>
      <p>We'll notify you when your order ships.</p>
    `,
  }

  await transporter.sendMail(mailOptions)
}