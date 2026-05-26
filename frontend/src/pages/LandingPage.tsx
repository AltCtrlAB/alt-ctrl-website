import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import CaseStudiesSection from '@/components/sections/CaseStudiesSection'
import ProcessSection from '@/components/sections/ProcessSection'
import TeamSection from '@/components/sections/TeamSection'
import ContactSection from '@/components/sections/ContactSection'

export default function LandingPage() {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CaseStudiesSection />
      <ProcessSection />
      <TeamSection />
      <ContactSection />
    </main>
  )
}
