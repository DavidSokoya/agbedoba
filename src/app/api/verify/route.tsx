import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

export async function POST(request: Request) {
  try {
    const { reference } = await request.json(); // Reference is the Order ID

    // 1. Verify with Paystack
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    });
    
    const verifyData = await verifyRes.json();

    if (verifyData.status && verifyData.data.status === 'success') {
      
      // 2. Payment Confirmed: Update Database
      await db.collection('orders').doc(reference).update({
        status: 'paid', // Update status
        paystackReference: verifyData.data.reference,
        paidAt: new Date().toISOString()
      });

      return NextResponse.json({ success: true, orderId: reference });
    } else {
      return NextResponse.json({ success: false, message: 'Payment verification failed' });
    }

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Verification Server Error' }, { status: 500 });
  }
}