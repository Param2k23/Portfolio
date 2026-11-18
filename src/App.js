import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { MotionConfig } from "framer-motion";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiMoon,
  FiSun,
  FiGithub,
} from "react-icons/fi";
import SignalStudy from "./components/SignalStudy";
import PulseChatbot from "./components/PulseChatbot";
import useProjects from "./components/ProjectsArray";
import useExperience from "./components/ExperienceArray";
import useProfile from "./components/ProfileArray";
import "./App.css";

function ProjectPlate({ index }) {
  return (
    <div className={"plate plate-" + index} aria-hidden="true">
      {index === 0 ? (
        <div className="replicas">
          {[0, 1, 2, 3].map((i) => (
            <i key={i} style={{ "--layer": i }} />
          ))}
        </div>
      ) : (
        <div className="waves">
          {Array.from({ length: 56 }, (_, i) => (
            <i
              key={i}
              style={{
                height:
                  10 +
                  66 *
                    Math.abs(Math.sin(i * 0.135)) *
                    (0.28 + 0.72 * Math.abs(Math.sin(i * 2.35))) +
                  "%",
              }}
            />
          ))}
        </div>
      )}
      <small>
        {index === 0 ? "Replicated ledger" : "Conversation signals"}
      </small>
    </div>
  );
}
function App() {
  const projects = useProjects();
  const roles = useExperience();
  const profile = useProfile();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <MotionConfig reducedMotion="user">
      <div className={"portfolio " + colorMode} id="top">
        <a className="skip" href="#projects">
          Skip to projects
        </a>
        <header className="mast">
          <div className="wrap navrow">
            <a className="signature" href="#top">
              <span className="monogram" aria-hidden="true">
                p/p
              </span>
              Param Patel
            </a>
            <nav aria-label="Main">
              <a href="#projects">Work</a>
              <a href="#experience">Experience</a>
              <a href="#about">About</a>
            </nav>
            <div className="navside">
              <a href="#contact">
                Get in touch <FiArrowUpRight />
              </a>
              <button onClick={toggleColorMode} aria-label="Switch color theme">
                {colorMode === "dark" ? <FiSun /> : <FiMoon />}
              </button>
            </div>
          </div>
        </header>
        <main>
          <section className="intro">
            <div className="wrap hero-grid">
              <div className="intro-text">
                <p className="role">
                  <span />
                  Generative AI &amp; software engineer
                </p>
                <h1>{profile.headerName}</h1>
                <p className="lede">
                  I build systems that keep transactions in sync and AI agents that help engineers resolve incidents.
                </p>
                <div className="actions">
                  <a className="cta" href="#projects">
                    Explore my work <FiArrowDown />
                  </a>
                  <a className="quiet" href="/content/Param_Patel_SE.pdf">
                    Résumé <FiArrowUpRight />
                  </a>
                </div>
              </div>
              <SignalStudy />
            </div>
          </section>
          <section className="wrap section" id="projects">
            <div className="sectionhead">
              <h2>Selected work</h2>
              <a href={profile.github}>
                <FiGithub /> GitHub <FiArrowUpRight />
              </a>
            </div>
            <div className="features">
              {projects.slice(0, 2).map((p, i) => (
                <article key={p.name}>
                  <a className="feature-link" href={p.buttons[0]?.href}>
                    <ProjectPlate index={i} />
                    <div className="project-title">
                      <h3>{p.name.split(" (")[0]}</h3>
                      <FiArrowUpRight />
                    </div>
                  </a>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.badges.map((b) => (
                      <span key={b.text}>{b.text}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="research">
              {projects.slice(2).map((p) => (
                <details key={p.name}>
                  <summary>
                    {p.name.split(" (")[0]} <span>+</span>
                  </summary>
                  <p>{p.description}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="experience section" id="experience">
            <div className="wrap split">
              <h2>Experience</h2>
              <div>
                {roles.map((r) => (
                  <article className="job" key={r.company}>
                    <small>{r.duration}</small>
                    <h3>{r.company}</h3>
                    <strong>{r.position}</strong>
                    <ul>
                      {r.listItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="wrap section split" id="about">
            <h2>About me</h2>
            <div className="bio">
              <p>
                My work spans consensus protocols, language models, and the web
                applications people use to interact with them.
              </p>
              <p>
                I studied computer science at Stony Brook University and
                computer engineering at Indus University. Along the way, I won
                hackathons at HackNYU, Hopper Hacks, and Arch MI, and earned
                Oracle’s OCI Generative AI Professional certification.
              </p>
              <div className="resume-links">
                <a href="/content/Param_Patel_SE.pdf">
                  Software résumé <FiArrowUpRight />
                </a>
                <a href="/content/Param_Patel_AI_ML.pdf">
                  AI / ML résumé <FiArrowUpRight />
                </a>
              </div>
            </div>
          </section>
          <footer id="contact">
            <div className="wrap">
              <h2>Let’s talk.</h2>
              <a className="email" href={"mailto:" + profile.email}>
                {profile.email} <FiArrowUpRight />
              </a>
              <div className="foot">
                <b>Param Patel</b>
                <a href={profile.github}>GitHub ↗</a>
                <a href={profile.linkedin}>LinkedIn ↗</a>
                <a href="#top">Back to top ↑</a>
              </div>
            </div>
          </footer>
        </main>
        <PulseChatbot color="purple" />
      </div>
    </MotionConfig>
  );
}
export default App;

