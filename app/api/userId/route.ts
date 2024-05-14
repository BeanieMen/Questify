import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export function GET() {
    try {
      const user = auth()
      return NextResponse.json({userId: user.userId}, {status: 200})
    } catch (error) {
      console.error('Error fetching current user:', error);
      return NextResponse.json({}, {status:500})
    }
  }