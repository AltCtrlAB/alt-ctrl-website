import SectionWrapper from '@/components/SectionWrapper'
import TeamMemberCard from '@/components/TeamMemberCard'
import { company } from '@/lib/company'

export default function TeamSection() {
  return (
    <SectionWrapper variant="dark" id="teamet" aria-labelledby="team-heading">
      <div className="container-site space-y-10">

        <div className="text-center space-y-2">
          <p className="font-mono text-accent-label text-xs tracking-widest uppercase">Teamet</p>
          <h2
            id="team-heading"
            className="font-mono font-bold text-foreground text-balance mx-auto max-w-2xl"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            Business och teknik under samma tak.
          </h2>
          <p className="text-foreground-subtle text-base leading-relaxed max-w-xl mx-auto pt-1">
            Vi bygger det vi rekommenderar. Inga handoffs, ingen overhead,
            ingen kontext som tappas längs vägen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {company.team.map((member, i) => (
            <TeamMemberCard key={member.name} member={member} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </SectionWrapper>
  )
}
