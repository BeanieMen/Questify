'use client'
import { useEffect, useState } from 'react'
import { User } from '@clerk/nextjs/server'
import { BarChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Menu from '../components/Menu'
let level: number
let goalExp: number
let goalPercentage: number
export default function Home() {
  const [clerkUser, setClerkUser] = useState<User | null>(null)
  const [exp, setExp] = useState<number>(0)
  useEffect(() => {
    const setup = async () => {
      try {
        const response = await fetch('/api/user')
        const result = (await response.json()) as {
          userData: User
          exp: number
        }
        setClerkUser(result.userData)
        setExp(result.exp)
        console.log(exp)
        level = Math.floor(exp / 50)
        goalExp = (level + 1) * 50
        goalPercentage = (exp-level*50)*2

      } catch (error) {
        console.error('Error fetching current user:', error)
      }
    }

    setup()
  }, [exp])
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
          <div className="items-center gap-x-10 hidden md:flex">
            <Button className="text-[1rem] bg- text-white hover:bg-">
              Home
            </Button>
            <Button className="text-[1rem] bg- text-white hover:bg-">
              Leaderboard
            </Button>
            <Button className="text-[1rem] rounded-full text-white ">
              New Quests
            </Button>
            <UserButton />
          </div>

          <div className="flex items-center gap-x-10 md:hidden">
            <Menu />
            <UserButton />
          </div>
        </nav>

        <div className="bg-[#253249] -ml-5 w-screen mt-5 h-[1px]"></div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-y-5">
            <span className="text-5xl mt-20 font-bold">
              Welcome to Questify!
            </span>
            <span className="text-xl font-extralight">
              Complete quests to earn xp and have a chance to top the
              leaderboards
            </span>
          </div>
          <div className='flex flex-col mt-16 gap-y-5'>
            <span className='text-2xl'>Level {level}</span>
            <div className="h-3 bg-gray-200 w-full rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${goalPercentage}%` }}
              ></div>
            </div>
            <span className='text-2xl'>{exp}/{goalExp} XP</span>

          </div>
        </div>
      </div>
    )
  }
}
