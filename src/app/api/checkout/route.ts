import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';
import { PRODUCTS } from '@/lib/products';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData, cartItems } = body;

    // 1. Recalculate Total (Security)
    let calculatedTotal = 0;
    const secureOrderItems = [];

    for (const item of cartItems) {
      const product = PRODUCTS.find((p) => p.id === item.id);
      if (product) {
        const itemTotal = product.price * item.quantity;
        calculatedTotal += itemTotal;
        secureOrderItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          total: itemTotal
        });
      }
    }

    // 2. Create "Pending" Order in Database
    const orderData = {
      customer: formData,
      items: secureOrderItems,
      amount: calculatedTotal,
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
      paystackReference: null
    };

    const docRef = await db.collection('orders').add(orderData);

    // 3. Initialize Paystack Transaction
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        amount: calculatedTotal, 
        reference: docRef.id,
        // 👇 Ensure this URL is correct for your environment
        callback_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/verify`,
        metadata: {
            custom_fields: [
                { display_name: "Customer Name", variable_name: "name", value: formData.name },
                { display_name: "Phone Number", variable_name: "phone", value: formData.phone }
            ]
        }
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
        console.error("Paystack Error:", paystackData);
        throw new Error("Paystack failed to initialize");
    }

    // 4. Return the Checkout URL to frontend
    return NextResponse.json({ 
      success: true, 
      checkoutUrl: paystackData.data.authorization_url 
    });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ success: false, error: 'Payment initialization failed' }, { status: 500 });
  }
}