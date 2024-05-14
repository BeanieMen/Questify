'use client'
import { useEffect, useState } from 'react'
import { User } from '@clerk/nextjs/server'
import { BarChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
export default function Home() {
  const [clerkUser, setClerkUser] = useState<User | null>(null)

  useEffect(() => {
    const setup = async () => {
      try {
        const response = await fetch('/api/user')
        const result = (await response.json()) as { userData: User }
        setClerkUser(result.userData)
      } catch (error) {
        console.error('Error fetching current user:', error)
      }
    }

    setup()
  }, [])
  if (!clerkUser) {
    return (
      <div className="h-screen w-screen justify-center items-center text-3xl flex">
        loading
      </div>
    )
  } else {
    return (
      <div className="bg-[#111622] min-h-screen pt-5 px-5">
        <nav className="flex justify-between px-5 items-center">
          <div className="flex items-center text-[2rem]">
            <BarChart className="size-[2rem]" /> Questify
          </div>
          <div className="flex items-center gap-x-10">
            <Button className="text-[1rem] bg- text-white hover:bg-">
              Home
            </Button>
            <Button className="text-[1rem] bg- text-white hover:bg-">
              Leaderboard
            </Button>
            <Button className="text-[1rem] rounded-full text-white ">
              New Quests
            </Button>
            <div className="items-center flex">
              <UserButton/>
            </div>
          </div>
        </nav>

        <div className="bg-[#253249] -ml-5 w-screen mt-5 h-[1px]"></div>

      </div>
    )
  }
}
