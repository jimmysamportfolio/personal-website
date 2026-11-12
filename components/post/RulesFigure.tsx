/** One review checklist, generated into each reviewer's config. Animated with CSS only. */
const HOP1 = ["M150,100 C186,100 184,34 220,34", "M150,100 H220", "M150,100 C186,100 184,166 220,166"];
const HOP2 = ["M420,34 C450,34 448,100 478,100", "M420,100 H478", "M420,166 C450,166 448,100 478,100"];
const TARGETS = [
  { y: 12, label: "Claude rules" },
  { y: 78, label: "Greptile rules" },
  { y: 144, label: "Copilot instructions" },
];

export function RulesFigure() {
  return (
    <figure>
      <div className="frame"><div className="inner">
        <svg viewBox="0 0 600 200" role="img" aria-label="One review checklist feeds three generated configs: Claude rules, Greptile rules, and Copilot instructions, each in 6 repos. All three apply the same checks to every PR.">
          <g className="wires">
            {[...HOP1, ...HOP2].map((d) => <path key={d} d={d} pathLength={100} />)}
          </g>
          <g className="pulses">
            {HOP1.map((d) => <path key={d} d={d} pathLength={100} />)}
            {HOP2.map((d) => <path key={d} className="h2" d={d} pathLength={100} />)}
          </g>
          <rect className="card" x="0.5" y="72" width="150" height="56" rx="10" />
          <text className="ct-b" x="14" y="96">Review checklist</text>
          <text className="small" x="14" y="114">written once</text>
          {TARGETS.map((t) => (
            <g key={t.label}>
              <rect className="card" x="220" y={t.y} width="200" height="44" rx="9" />
              <text className="ct-n" x="234" y={t.y + 26.5}>{t.label}</text>
              <text className="small" x="406" y={t.y + 26.5} textAnchor="end">6 repos</text>
            </g>
          ))}
          <rect className="card" x="478" y="72" width="121.5" height="56" rx="10" />
          <text className="ct-b" x="492" y="96">Every PR</text>
          <text className="small" x="492" y="114">same checks</text>
        </svg>
      </div></div>
      <figcaption>One checklist, generated into each reviewer&apos;s config. A fix to the checklist reaches every reviewer at once.</figcaption>
    </figure>
  );
}
