"use client";

import Link from "next/link";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import styled from 'styled-components';
import { X, CircleDot, DollarSign, Users, Award, Zap, Gift, ChevronRight, Trophy, Target, Coins, UserPlus, Gamepad2 } from 'lucide-react';
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useUser } from '../app/providers/UserProvider'




export default function HomeClient({ session }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

      const router = useRouter()
    //   const { data: session, status } = session
      const { userData, refreshUserData } = useUser()

      useEffect(() => {
        if (session) {
          router.push('/dashboard')
        }
      }, [session, router])

      useEffect(() => {
        if (session?.user) {
          refreshUserData()
        }
      }, [session, refreshUserData])

    //   if (!session || !userData) {
    //     return (
    //       <div className='bg-[#020617] flex items-center justify-center w-full h-[100dvh]'>
    //         <div className="ld-ripple">
    //           <div></div>
    //           <div></div>
    //         </div>
    //       </div>
    //     )
    //   }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 500); // 1 second (1000ms)

    return () => clearTimeout(timer); // Clean up the timer
  }, []);


  return (
      <>
       <div className="min-h-screen bg-[#020617]">

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#020617] to-[#0f172a] h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-lg">
        <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between py-5">
          <div className="flex items-center gap-2 text-[#ff4800] font-bold text-xl">
            XO Players
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-[#ffffff] hover:text-[#ff4800] transition-colors">
              How It Works
            </a>
            <a href="#features" className="text-sm font-medium text-[#ffffff] hover:text-[#ff4800] transition-colors">
              Features
            </a>
            <a href="#club" className="text-sm font-medium text-[#ffffff] hover:text-[#ff4800] transition-colors">
              XO Club
            </a>
            <a href="#faq" className="text-sm font-medium text-[#ffffff] hover:text-[#ff4800] transition-colors">
              FAQ
                              </a>
                              <Link href="/signin">
                     <Button className="bg-[#ff4800] text-[#ffffff] hover:bg-[#ff4800]/90">Login</Button>
                              </Link>
          </nav>
        </div>
      </header>
       <div className=" h-full flex justify-center items-center">

        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-[#ffffff]">
                              Play,{" "}
                          <span className="text-[#ff4800] relative">
              Earn,{" "}
              {/* <span className="absolute bottom-0 left-0 w-full h-1 bg-[#ff4800] rounded-full"></span> */}
            </span>
                              Network, {" "}
            <span className="text-[#ff4800] relative">
              Connect.
              {/* <span className="absolute bottom-0 left-0 w-full h-1 bg-[#ff4800] rounded-full"></span> */}
            </span>
          </h1>
          <p className="text-[#a6b7cf] text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Join thousands of players who are turning their gaming skills into real cash rewards.
            Play, win, and earn up to $100 with XO Players!
          </p>
          <Link href="/signup">
          <button size="lg" className="bg-[#ff4800] text-[#ffffff] animate-pulse px-8 py-3 rounded-[8px] text-[14px] font-semibold">
            Get Started Now
                              </button>
                              </Link>
        </div>
      </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-[#020617]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ffffff]">
              How to <span className="text-[#ff4800]">Get Started</span>
            </h2>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
              Begin your journey to becoming an XO master and earning real money in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                    step: 1,
                  icon: <UserPlus />,
                title: "Sign Up",
                description: "Create your account and receive an instant welcome bonus to start playing",
                selected: ""
              },
              {
                  step: 2,
                icon: <Gamepad2 />,
                title: "Play Games",
                  description: "Challenge other players in exciting Tic-Tac-Toe matches and win rewards",
                  selected: "md:mt-[100px]"
              },
              {
                step: 3,
                icon: <Gift />,
                title: "Earn Rewards",
                  description: "Convert your victories into real cash and unlock bigger rewards",
                  selected: ""
              }
            ].map((item, index) => (
              <div key={item.step} className={`relative text-center ${item.selected} `}>
                <div className={`w-12 h-12  bg-[#ff4800] rounded-full flex items-center justify-center text-[#ffffff] text-xl font-bold mx-auto mb-4 `}>
                  {item.icon}
                    </div>
                    <p className="text-slate-800 text-[100px] font-bold absolute right-6 -top-10">{item.step}</p>
                <h3 className="text-xl font-semibold mb-2 text-[#ffffff]">{item.title}</h3>
                <p className="text-[#94a3b8]">{item.description}</p>
                {index === 0 && (
                  <div className="hidden md:block absolute top-1/4 -right-12 size-fit rotate text-[#ff4800]">
                    <Image src="/direct.png" alt="direct" className="size-[60px]" width={100} height={100} />
                  </div>
                )}
                {index === 1 && (
                  <div className="hidden md:block absolute top-1/4 -right-12 size-fit rotate text-[#ff4800]">
                    <Image src="/directdown.png" alt="direct" className="size-[60px]" width={100} height={100} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-[#0f172a]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ffffff]">
              Amazing <span className="text-[#ff4800]">Features</span>
            </h2>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
              Discover all the ways you can earn and grow with XO Players
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Win Real Money",
                description: "Earn $5 for every 10 games won and compete for prizes up to $100"
              },
              {
                icon: Zap,
                title: "Daily Streaks",
                description: "Maintain your login and winning streaks to earn bonus rewards"
              },
              {
                icon: Trophy,
                title: "Tournaments",
                description: "Participate in weekly tournaments with bigger prize pools"
              },
              {
                icon: Target,
                title: "Daily Tasks",
                description: "Complete daily challenges to earn additional rewards"
              },
              {
                icon: Award,
                title: "Ambassador Program",
                description: "Become an XO Ambassador and earn over $100 through referrals"
              },
              {
                icon: Coins,
                title: "Bonus Points",
                description: "Earn bonus points for achievements and special events"
              }
            ].map((feature, index) => (
              <Card key={index} className="p-6 bg-[#1e293b] border-none transition-transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-[#ff4800] rounded-lg flex items-center justify-center text-[#ffffff] mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#ffffff]">{feature.title}</h3>
                <p className="text-[#94a3b8]">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* XO Club */}
      <section id="club" className="py-20 bg-[#020617]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ffffff]">
              Join the <span className="text-[#ff4800]">XO Club</span>
            </h2>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
              Become part of an exclusive community of players and unlock premium benefits
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Gift,
                title: "Premium Rewards",
                description: "Get access to exclusive rewards and higher earning potential"
              },
              {
                icon: Users,
                title: "Community Access",
                description: "Connect with top players and learn winning strategies"
              },
              {
                icon: Trophy,
                title: "VIP Tournaments",
                description: "Participate in exclusive tournaments with bigger prizes"
              },
              {
                icon: CircleDot,
                title: "Priority Support",
                description: "Get faster responses and dedicated assistance"
              }
            ].map((benefit, index) => (
              <div key={index} className=" gap-4 border border-slate-900 py-6 px-3 rounded-[10px]">
                <div className="w-12 h-12 bg-[#ff4800] rounded-lg flex-shrink-0 flex items-center justify-center text-[#ffffff] mx-auto mb-4">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-[#ffffff] text-center">{benefit.title}</h3>
                  <p className="text-[#94a3b8] text-center">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
             <Link href="/signup">
            <button size="lg" className="text-white bg-[#ff4800] hover:text-[#ffffff] px-8 py-3 rounded-[8px] text-[14px] font-semibold">
              Join XO Club
                              </button>
                              </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-[#0f172a]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ffffff]">
              Frequently Asked <span className="text-[#ff4800]">Questions</span>
            </h2>
            <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
              Find answers to common questions about XO Players
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How do I start earning money?",
                answer: "Simply sign up, start playing games, and win! You'll earn $5 for every 10 games won, with opportunities to earn more through streaks and tournaments."
              },
              {
                question: "When can I withdraw my earnings?",
                answer: "You can withdraw your earnings once you reach a minimum balance of $10. Withdrawals are processed within 24-48 hours."
              },
              {
                question: "What is the XO Club membership?",
                answer: "XO Club is our premium membership that gives you access to exclusive tournaments, higher rewards, and special community events."
              },
              {
                question: "How do I become an Ambassador?",
                answer: "After reaching Level 10 and maintaining a positive win rate, you can apply for our Ambassador program to earn through referrals."
              },
              {
                question: "Are there daily earning limits?",
                answer: "There are no strict daily limits, but regular players typically earn between $5-$100 per day depending on their performance and participation."
              },
              {
                question: "How do streaks work?",
                answer: "Maintain daily login and winning streaks to earn bonus rewards. Longer streaks result in bigger bonuses and special achievements."
              }
            ].map((faq, index) => (
              <Card key={index} className={`p-6   ${index > 0 ? "border border-slate-700 bg-transparent" : "bg-[#1e293b] border-none"}`}>
                <h4 className="text-lg font-semibold mb-2 text-[#ffffff]">{faq.question}</h4>
                <p className="text-[#94a3b8]">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#020617]">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ffffff]">
            Ready to <span className="text-[#ff4800]">Start Earning</span>?
          </h2>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto mb-8">
            Join thousands of players who are already winning and earning with XO Players
          </p>
            <Link href="/signup">
          <Button size="lg" className="bg-[#ff4800] text-[#ffffff] hover:bg-[#ff4800]/90">
            Start Playing Now
                          </Button>
                          </Link>
        </div>
      </section>
          </div>
           {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              ctaText="Claim My Bonus"
              ctaLink="/signup"
              backgroundImage="/bg1.gif"
            >
              <div className="text-center space-y-4">
                <h2 className="text-[20px] md:text-[30px] font-bold mt-2 text-gray-100">Register Now and Get <span className="font-extrabold text-white">$2</span> Free Bonus Instantly!</h2>
                {/* <p className="text-lg opacity-90">
                  Available after the first download of the app
                </p> */}
              </div>
            </Modal>
          )}
      </>
  );
}
