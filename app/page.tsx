import React from 'react'
import { Button } from "@/components/ui/button"
import { Compass } from 'lucide-react'
import  CompanionCard  from '@/components/CompanionCard'
import CompanionsList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { recentSessions } from "@/constants"

const Page = () => {
  return (
    <main>
      <section>
        <h1>Popular card </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <CompanionCard
          id="123"
          name="Countsy the Number Wizard"
          subject="derivative and integrals"
          topic="Algebra"
          duration={45}
          color="#FF0000"
          />
          <CompanionCard
          id="124"
          name="Countsy the Number Wizard"
          subject="derivative and integrals"
          topic="science"
          duration={30}
          color="#4A90E2"
          />
          <CompanionCard
          id="125"
          name="Neura the Brainy Explorer"
          subject="science"
          topic="Neural network of the brain"
          duration={30}
          color="#50C878"
          />
        </div>
      </section>
      <section className="home-section">
          <CompanionsList
              title="Recently completed sessions"
              companions={recentSessions}
              classNames="w-2/3 max-lg:w-full"
          />
          <CTA />
        </section>
    </main>
  )
}

export default Page