'use client'

import { SignUpButton, SignInButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { BarChart, School, Puzzle, ShieldCheck, Diamond } from 'lucide-react'
import Accordion from './components/Accordion'
import { useState, useEffect } from 'react'
import { User } from '@clerk/nextjs/server'

const items = [
  {
    title: 'How does the gamified homework platform work?',
    content:
      'The platform transforms traditional assignments into interactive quests, challenges, or simulations, incentivizing students to engage in tasks that reinforce learning concepts.',
  },
  {
    title: 'What are the benefits of using a gamified homework platform?',
    content:
      'The platform fosters motivation and engagement by incorporating game-like elements such as rewards, achievements, and leaderboards. This makes learning more enjoyable and helps students stay motivated to complete tasks.',
  },
  {
    title: 'Can teachers track student progress on the platform?',
    content:
      'Yes, teachers have access to a dashboard where they can monitor student activity, progress, and performance. This allows them to provide targeted support and intervention as needed.',
  },
  {
    title: 'How are rewards and incentives integrated into the platform?',
    content:
      'Students earn rewards, badges, or points for completing tasks and mastering concepts. These rewards can be used to unlock new challenges, customize avatars, or access bonus content, providing additional motivation to engage with the platform.',
  },
]

const features = [
  {
    title: 'Quest-based assignments',
    description:
      'Complete quests to earn XP and gold, which you can use to buy gear and unlock new areas',
    icon: <School />,
  },
  {
    title: 'Personalized feedback',
    description: 'Receive detailed feedback on your work to help you improve',
    icon: <Puzzle />,
  },
  {
    title: 'Reward system',
    description: 'Earn badges and level up as you complete assignments',
    icon: <ShieldCheck />,
  },
  {
    title: 'Fun and engaging',
    description:
      'Quest is designed to make learning fun and engaging. You will feel like you are playing a game, not doing homework.',
    icon: <Diamond />,
  },
]

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

  if (clerkUser) redirect('/home')
  else {
    return (
      <div className="bg-[#111622] min-h-screen px-5">
        <header className="w-full flex py-3 max-w-[100rem] mx-auto justify-between">
          <div className="flex items-center text-2xl">
            <BarChart /> Questify
          </div>
          <div className="flex gap-3 md:gap-5">
            <div className="bg-blue-500 py-2 px-4 md:py-3 md:px-5  rounded-full">
              <SignUpButton></SignUpButton>
            </div>
            <div className="bg-[#242F47] py-2 px-4 md:py-3 md:px-5 rounded-full">
              <SignInButton>Log in</SignInButton>
            </div>
          </div>
        </header>
        <div className="bg-[#253249] w-full h-[1px]"></div>

        <div className="max-w-6xl mx-auto">
          <div className="max-w-6xl mx-auto flex flex-col justify-center items-center h-screen">
            <div
              className="mt-5 rounded-3xl bg-cover bg-center flex flex-col items-center justify-center h-[40.5rem] w-full"
              style={{ backgroundImage: 'url("/hero.png")' }}
            >
              <div className="font-bold mx-5 gap-y-5 flex flex-col text-center">
                <p className="text-4xl sm:text-6xl">
                  Homework, but make it a game
                </p>
                <p className="text-base sm:text-lg font-light">
                  Questify is a gamified homework platform that makes learning
                  fun. We offer quest-based assignments, a reward system, and
                  personalized feedback to help you level up your academic
                  skills
                </p>
                <div className="bg-blue-500 py-3 px-5 w-fit mt-5 rounded-full mx-auto text-lg">
                  <SignUpButton>Get started</SignUpButton>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <p className="text-2xl sm:text-4xl font-bold text-center">
              Why use Questify?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#1A2332] flex flex-col p-5 gap-y-2 border border-[#3f5272] rounded-lg"
                >
                  {feature.icon}
                  <p className="font-bold text-lg">{feature.title}</p>
                  <p className="text-md font-light">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <p className="text-4xl font-bold text-center">
              Ready to level up your homework game?
            </p>
            <div className="mt-10 mx-auto">
              <div className="bg-blue-500 py-3 px-5 w-fit rounded-full mx-auto font-bold text-lg">
                <SignUpButton>Get started</SignUpButton>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <p className="text-3xl font-semibold mb-5">
              Frequently asked questions
            </p>
            <Accordion items={items} />
          </div>
        </div>
      </div>
    )
  }
}
