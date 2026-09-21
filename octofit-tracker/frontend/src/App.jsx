import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>Octofit <em>Tracker</em></span>
        </NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/" end>Overview</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  return (
    <section className="overview">
      <p className="eyebrow">Personal performance, in focus</p>
      <h1>Build your <span>best week.</span></h1>
      <p className="intro">Track the movement that matters, find your people, and keep a little momentum in reserve.</p>
      <div className="overview-links">
        <NavLink className="primary-button" to="/activities">Log activity <span>→</span></NavLink>
        <NavLink className="text-link" to="/workouts">Browse workouts</NavLink>
      </div>
      <div className="overview-grid">
        <NavLink to="/leaderboard" className="overview-card"><strong>01</strong><span>See who is leading</span><b>↗</b></NavLink>
        <NavLink to="/teams" className="overview-card"><strong>02</strong><span>Find your team</span><b>↗</b></NavLink>
        <NavLink to="/users" className="overview-card"><strong>03</strong><span>Meet the community</span><b>↗</b></NavLink>
      </div>
    </section>
  )
}

export default App
