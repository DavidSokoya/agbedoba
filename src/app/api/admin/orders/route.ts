import { NextResponse } from 'next/server';
import { db } from '@/lib/firebaseAdmin';

//  Fetch Orders 
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pin = searchParams.get('pin');

    if (pin !== process.env.ADMIN_SECRET_PIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch last 50 orders 
    const snapshot = await db.collection('orders')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, orders });

  } catch (error) {
    console.error("Admin Fetch Error:", error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// 2. Update Order Status 
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status, pin } = body;

    // Security Check
    if (pin !== process.env.ADMIN_SECRET_PIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!orderId || !status) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // Update Firestore
    await db.collection('orders').doc(orderId).update({
      status: status,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Admin Update Error:", error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}