import { useEffect, useState } from 'react'
import { collectionFrom } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const workoutsUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts'

function Workouts() {
  const [workouts, setWorkouts] = useState([]); const [status, setStatus] = useState('loading')
  useEffect(() => { fetch(workoutsUrl).then((response) => { if (!response.ok) throw new Error(); return response.json() }).then((payload) => { setWorkouts(collectionFrom(payload)); setStatus('ready') }).catch(() => setStatus('error')) }, [])
  return <section className="resource-page"><p className="eyebrow">Your next session</p><h1>Workouts</h1><p className="page-description">Choose a focus and make the time count.</p>{status === 'loading' ? <p className="state">Loading data…</p> : status === 'error' ? <p className="state error">The API could not be reached. Check the backend and try again.</p> : workouts.length === 0 ? <p className="state">No workouts available yet.</p> : <div className="card-grid">{workouts.map((workout) => <article className="data-card workout-card" key={workout._id}><div className="workout-top"><span className="pill">{workout.difficulty || 'beginner'}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>Focus: {workout.focus || 'general fitness'}</p>{workout.equipment?.length > 0 && <small>{workout.equipment.join(' · ')}</small>}</article>)}</div>}</section>
}
export default Workouts