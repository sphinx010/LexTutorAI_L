import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Premise from "@/components/landing/Premise";
import Workspaces from "@/components/landing/Workspaces";
import Engine from "@/components/landing/Engine";
import Founder from "@/components/landing/Founder";
import Reveals from "@/components/landing/Reveals";

// The engine page: ember opening, the four workspaces in racing green, the engine and courses in
// oxblood and bone, and an ember close.
export default function Home() {
  return (
    <div className="lx-page" id="top">
      <Nav />
      <main>
        <div className="lx-ch-ember lx-grain">
          <Hero />
          <Premise />
        </div>
        <Workspaces />
        <Engine />
      </main>
      <Founder />
      <Reveals />
    </div>
  );
}
