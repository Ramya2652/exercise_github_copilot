import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <main className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-body p-4 p-lg-5">
          <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center mb-4">
            <div>
              <h1 className="display-6 fw-bold mb-2">OctoFit Tracker</h1>
              <p className="lead text-muted mb-0">
                A modern multi-tier fitness platform for tracking workouts, teams, and progress.
              </p>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <span className="badge bg-primary-subtle text-primary-emphasis">React 19</span>
              <span className="badge bg-success-subtle text-success-emphasis">Express + TypeScript</span>
              <span className="badge bg-info-subtle text-info-emphasis">MongoDB + Mongoose</span>
            </div>
          </div>

          <nav className="nav nav-pills flex-wrap mb-4">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Routes>
            <Route path="/" element={<div className="alert alert-light">Select a section to explore the OctoFit data.</div>} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;

// workflow trigger: 2026-06-26T19:37:46Z
