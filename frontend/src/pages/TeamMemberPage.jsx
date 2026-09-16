import { Navigate, useParams } from "react-router-dom";
import PageShell from "@/components/site/PageShell";
import TeamMember from "@/components/site/TeamMember";
import { getMember, memberSummary } from "@/data/team";

export default function TeamMemberPage() {
  const { slug } = useParams();
  const member = getMember(slug);

  // Same treatment as an unknown newsroom slug: back to the listing rather
  // than a dead end. See NewsroomItemPage.jsx.
  if (!member) return <Navigate to="/about#team" replace />;

  return (
    <PageShell
      testId="team-member-page"
      className="bg-white"
      title={`${member.name} — ${member.role}`}
      description={`${member.name}, ${member.role} at RDB Associates. ${memberSummary(member)}.`}
    >
      <TeamMember key={member.slug} member={member} />
    </PageShell>
  );
}
