'use client'

import { SignUpButton, SignInButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { BarChart, School, Puzzle, ShieldCheck, Diamond } from 'lucide-react'
import Accordion from './components/Accordion'

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

export default function Home() {
  // const user = auth().userId
  let user
  if (user) redirect('/home')
  else {
    return (
      <div className="bg-[#111622] min-h-screen">
        <header className="w-full flex py-3 max-w-[100rem] mx-auto justify-between">
          <div className="flex items-center text-2xl">
            <BarChart /> Questify
          </div>
          <div className="flex gap-5">
            <div className="bg-blue-500 py-3 px-5 rounded-full">
              <SignUpButton></SignUpButton>
            </div>
            <div className="bg-[#242F47] py-3 px-5 rounded-full">
              <SignInButton>Log in</SignInButton>
            </div>
          </div>
        </header>
        <div className="bg-[#253249] w-full h-[1px]"></div>

        <div className="max-w-6xl mx-auto">
          {/* hero */}
          <div
            className="mt-5 mx-auto rounded-3xl grid grid-rows-2 bg-cover bg-center items-center h-[40.5rem] w-full"
            style={{ backgroundImage: 'url("/hero.png")' }}
          >
            <div></div>
            <div className="font-bold mx-5  gap-y-5 flex flex-col">
              <p className="text-6xl">Homework, but make it a game</p>
              <p className="text-lg font-light">
                Questify is a gamified homework platform that makes learning
                fun. We offer quest-based assignments, A reward <br />
                system, and personalized feedback to help you level up your
                academic skills
              </p>
              <div className="bg-blue-500 py-3 px-5 w-fit mt-5 rounded-full text-lg">
                <SignUpButton>Get started</SignUpButton>
              </div>
            </div>
          </div>

          {/* why use */}
          <div className="flex mt-20 flex-col">
            <p className="text-4xl font-bold">Why use Questify?</p>
            <div className="grid grid-cols-4 gap-x-5 mt-20">
              <div className="bg-[#1A2332] flex flex-col p-5 gap-y-2 border border-[#3f5272] rounded-lg">
                <School />
                <p className="font-bold text-lg">Quest-based assignments</p>
                <p className="text-md font-light">
                  Complete quests to earn XP and gold, which you can use to buy
                  gear and unlock new areas
                </p>
              </div>
              <div className="bg-[#1A2332] flex flex-col p-5 gap-y-2 border border-[#3f5272] rounded-lg">
                <Puzzle />
                <p className="font-bold text-lg">Personalized feedback</p>
                <p className="text-md font-light">
                  Recieve detailed feedback on your work to help you improve
                </p>
              </div>
              <div className="bg-[#1A2332] flex flex-col p-5 gap-y-2 border border-[#3f5272] rounded-lg">
                <ShieldCheck />
                <p className="font-bold text-lg">Reward system</p>
                <p className="text-md font-light">
                  Earn badges and level up as you complete assignments
                </p>
              </div>
              <div className="bg-[#1A2332] flex flex-col p-5 gap-y-2 border border-[#3f5272] rounded-lg">
                <Diamond />
                <p className="font-bold text-lg">Fun and engaging</p>
                <p className="text-md font-light">
                  Quest is desgined to make learning fun and engaging. You will
                  feel like you are playing a game, not doing homework.
                </p>
              </div>
            </div>

            {/* ready */}
            <div className="mt-40 flex flex-col justify-center">
              <p className="text-5xl font-bold text-center">
                Ready to level up your homework game?
              </p>
              <div className="mt-10 mx-auto">
                <div className="bg-blue-500 py-3 px-5 w-fit rounded-full font-bold text-lg">
                  <SignUpButton>Get started</SignUpButton>
                </div>
              </div>
            </div>

            {/* frequently */}
            <div className="flex flex-col mt-40">
              <span className="font-bold text-3xl mb-10">
                Frequently asked questions
              </span>
              <Accordion items={items} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
