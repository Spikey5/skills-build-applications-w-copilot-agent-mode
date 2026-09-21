import { useEffect, useState } from 'react'
import { collectionFrom } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const teamsUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

function Teams() {
  const [teams, setTeams] = useState([]); const [status, setStatus] = useState('loading')
  useEffect(() => { fetch(teamsUrl).then((response) => { if (!response.ok) throw new Error(); return response.json() }).then((payload) => { setTeams(collectionFrom(payload)); setStatus('ready') }).catch(() => setStatus('error')) }, [])
  return <section className="resource-page"><p className="eyebrow">Find your people</p><h1>Teams</h1><p className="page-description">Shared goals make showing up more fun.</p>{status === 'loading' ? <p className="state">Loading data…</p> : status === 'error' ? <p className="state error">The API could not be reached. Check the backend and try again.</p> : teams.length === 0 ? <p className="state">No teams created yet.</p> : <div className="card-grid">{teams.map((team) => <article className="data-card" key={team._id}><p className="card-kicker">{team.sport || 'Fitness'}</p><h2>{team.name}</h2><p>{team.goal || 'Keep moving together.'}</p><strong>{team.members ?? 0} members</strong></article>)}</div>}</section>
}
export default Teams