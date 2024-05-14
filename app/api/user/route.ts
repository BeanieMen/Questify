import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';

export async function GET() {
    try {
      const user = await currentUser()

      return NextResponse.json({userData: user}, {status: 200})
    } catch (error) {
      console.error('Error fetching current user:', error);
      return NextResponse.json({}, {status:500})
    }
  }