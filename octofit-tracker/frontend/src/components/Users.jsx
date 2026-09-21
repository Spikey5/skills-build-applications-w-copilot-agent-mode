import { useEffect, useState } from 'react'
import { apiUrl, collectionFrom } from '../api.js'

function Users() {
  const [users, setUsers] = useState([]); const [status, setStatus] = useState('loading')
  useEffect(() => { fetch(apiUrl('users')).then((response) => { if (!response.ok) throw new Error(); return response.json() }).then((payload) => { setUsers(collectionFrom(payload)); setStatus('ready') }).catch(() => setStatus('error')) }, [])
  return <section className="resource-page"><p className="eyebrow">The community</p><h1>Users</h1><p className="page-description">A little accountability goes a long way.</p>{status === 'loading' ? <p className="state">Loading data…</p> : status === 'error' ? <p className="state error">The API could not be reached. Check the backend and try again.</p> : users.length === 0 ? <p className="state">No users found yet.</p> : <div className="card-grid">{users.map((user) => <article className="data-card user-card" key={user._id}><div className="avatar">{user.name?.charAt(0) || '?'}</div><h2>{user.name}</h2><p>{user.fitnessLevel || 'beginner'} · {user.location || 'Remote'}</p><small>{user.email}</small></article>)}</div>}</section>
}
export default Users