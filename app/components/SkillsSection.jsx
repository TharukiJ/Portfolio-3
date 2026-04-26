export default function SkillsSection() {
  return (
    <section id="skills" className="skills section-padding">
      <div className="skills-split-container">
        <div className="skills-side-left">
          <div className="section-header-modern">
            <div className="section-title-group">
              <h2 className="section-title-main">RUNTIME</h2>
              <h2 className="section-title-sub">SKILLS</h2>
              <div className="section-executing-functions">PARSING CAPABILITIES [6]</div>
            </div>
          </div>
          <div className="marquee-container side-marquee">
            <div className="marquee-content">
              {/* Set 1 */}
              <div className="marquee-item">
                <i className="bx bxl-react"></i>
                <span>React</span>
              </div>
              <div className="marquee-item">
                <i className="bx bxl-typescript"></i>
                <span>TypeScript</span>
              </div>
              <div className="marquee-item">
                <i className="bx bxl-javascript"></i>
                <span>JavaScript</span>
              </div>
              <div className="marquee-item">
                <i className="bx bxl-nodejs"></i>
                <span>Node.js</span>
              </div>
              <div className="marquee-item">
                <i className="bx bxl-java"></i>
                <span>Java</span>
              </div>
              <div className="marquee-item">
                <i className="bx bxs-data"></i>
                <span>MySQL</span>
              </div>
              {/* Set 2 */}
              <div className="marquee-item">
                <i className="bx bxl-react"></i>
                <span>React</span>
              </div>
              <div className="marquee-item">
                <i className="bx bxl-typescript"></i>
                <span>TypeScript</span>
              </div>
              <div className="marquee-item">
                <i className="bx bxl-javascript"></i>
                <span>JavaScript</span>
              </div>
              <div className="marquee-item">
                <i className="bx bxl-nodejs"></i>
                <span>Node.js</span>
              </div>
              <div className="marquee-item">
                <i className="bx bxl-java"></i>
                <span>Java</span>
              </div>
              <div className="marquee-item">
                <i className="bx bxs-data"></i>
                <span>MySQL</span>
              </div>
            </div>
          </div>
        </div>

        <div className="skills-side-right anim-slide-right anim-active">
          <div className="section-header-modern">
            <div className="section-title-group">
              <h2 className="section-title-main">GITHUB</h2>
              <h2 className="section-title-sub">ACTIVITY</h2>
              <div className="section-executing-functions">FETCHING CONTRIBUTIONS [ANNUAL]</div>
            </div>
          </div>
          <div className="github-contribution-wrapper">
            <img
              src="https://ghchart.rshah.org/TharukiJ?year=2026"
              alt="TharukiJ GitHub Contribution Chart 2026"
              className="github-chart-img"
            />
          </div>
          <div className="skills-video-container">
            <video
              src="/ex.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="skills-small-video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
