"use client"

import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import LogoTicker from '../components/LogoTicker'
import ProcessSection from '../components/ProcessSection'
import ServicesSection from '../components/ServicesSection'
import AIPhilosophySection from '../components/AIPhilosophySection'
import CasesSection from '../components/CasesSection'
import CustomBanner from '../components/CustomBanner'
import TeamSection from '../components/TeamSection'
import CTASection from '../components/CTASection'
import FAQSection from '../components/FAQSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LogoTicker />
      <ProcessSection />
      <ServicesSection />
      <AIPhilosophySection />
      <CasesSection />
      <CustomBanner />
      <TeamSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </>
  )
}
