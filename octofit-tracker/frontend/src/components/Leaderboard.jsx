import { useEffect, useState } from 'react'
import { collectionFrom } from '../api.js'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const leaderboardUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard'

function Leaderboard() {
  const [rows, setRows] = useState([])
  const [status, setStatus] = useState('loading')
  useEffect(() => { fetch(leaderboardUrl).then((response) => { if (!response.ok) throw new Error(); return response.json() }).then((payload) => { setRows(collectionFrom(payload)); setStatus('ready') }).catch(() => setStatus('error')) }, [])
  return <section className="resource-page"><p className="eyebrow">Weekly standings</p><h1>Leaderboard</h1><p className="page-description">Consistency has a way of becoming visible.</p>{status === 'loading' ? <p className="state">Loading data…</p> : status === 'error' ? <p className="state error">The API could not be reached. Check the backend and try again.</p> : rows.length === 0 ? <p className="state">No leaderboard entries yet.</p> : <div className="leaderboard-list">{rows.sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999)).map((row, index) => <div className={`leaderboard-row ${index === 0 ? 'top-row' : ''}`} key={row._id}><span className="rank">{row.rank ?? index + 1}</span><strong>{row.name}</strong><span>{row.streak ?? 0} day streak</span><b>{row.score ?? 0} pts</b></div>)}</div>}</section>
}
export default Leaderboard