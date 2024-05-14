import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
    let user: User | null
    try {
      user = await currentUser()
    } catch (error) {
      console.error('Error fetching current user:', error);
      return NextResponse.json({}, {status:500})
    }
    const data = await req.json()
    if (data.message) {
        
    }
  }