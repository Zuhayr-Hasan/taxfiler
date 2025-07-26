import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { uid, ...userData } = body;
    console.log(body);

    if (!uid) {
      return NextResponse.json({ error: 'User ID missing' }, { status: 400 });
    }

    await setDoc(doc(db, 'credentials', uid), userData, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving user data:', error);
    return NextResponse.json({ error: 'Failed to save user data' }, { status: 500 });
  }
}
