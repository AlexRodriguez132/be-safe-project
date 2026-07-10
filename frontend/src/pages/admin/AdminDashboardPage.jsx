import './AdminDashboardPage.css';

const STATS = [
  { label: 'Usuarios registrados', value: '2,500', color: '#59CBA5' },
  { label: 'Cursos activos', value: '24', color: '#59CBA5' },
  { label: 'Instructores', value: '8', color: '#59CBA5' },
  { label: 'Grupos existentes', value: '22', color: '#59CBA5' },
];

const EDAD_DATA = [
  { label: '18-24', value: 65, color: '#F4D89F' },
  { label: '25-34', value: 45, color: '#E8B4C9' },
  { label: '35-44', value: 80, color: '#ABC9E3' },
  { label: '45-54', value: 30, color: '#F4D89F' },
  { label: '55+',   value: 50, color: '#E8B4C9' },
];

const CIUDAD_DATA = [
  { label: 'Bogotá',      value: 90, color: '#E8B4C9' },
  { label: 'Medellín',    value: 40, color: '#F4D89F' },
  { label: 'Cali',        value: 70, color: '#9FC9B3' },
  { label: 'B/quilla',    value: 55, color: '#E8B4C9' },
  { label: 'Cartagena',   value: 65, color: '#F4D89F' },
  { label: 'Otra',        value: 60, color: '#9FC9B3' },
];

const GENEROS = [
  { label: 'Hombres', value: '224', color: '#ABC9E3', bg: '#DFEBFA',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg> },
  { label: 'Mujeres', value: '519', color: '#E8B4C9', bg: '#FEEFF5',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M12 14v6M9 20h6"/></svg> },
  { label: 'LGBT+', value: '26', color: '#F4D89F', bg: '#FDF4E8',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg> },
];

function BarChart({ data, title }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div className="dash-chart">
      <div className="dash-chart__bars">
        {data.map(d => (
          <div key={d.label} className="dash-bar-col">
            <div className="dash-bar-track">
              <div className="dash-bar-fill" style={{ height: `${(d.value / max) * 100}%`, background: d.color }} />
            </div>
            <span className="dash-bar-label">{d.label}</span>
          </div>
        ))}
      </div>
      <p className="dash-chart__title">{title}</p>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="dash-page">
      <h1 className="dash-title">Dasboard</h1>

      <div className="dash-stats">
        {STATS.map(s => (
          <div key={s.label} className="dash-stat-card">
            <p className="dash-stat-label">{s.label}</p>
            <p className="dash-stat-value" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="dash-charts">
        <BarChart data={EDAD_DATA} title="Edad de los usuarios" />
        <BarChart data={CIUDAD_DATA} title="Ciudad de los usuarios" />
      </div>

      <div className="dash-generos">
        {GENEROS.map(g => (
          <div key={g.label} className="dash-genero-card">
            <div className="dash-genero-icon" style={{ background: g.bg, color: g.color }}>
              {g.icon}
            </div>
            <div>
              <p className="dash-genero-label">{g.label}</p>
              <p className="dash-genero-value" style={{ color: g.color }}>{g.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
