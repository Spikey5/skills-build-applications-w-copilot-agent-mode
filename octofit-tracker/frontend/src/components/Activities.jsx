import { useEffect, useState } from 'react'
import { apiUrl, collectionFrom } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(apiUrl('activities'))
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load activities')
        return response.json()
      })
      .then((payload) => { setActivities(collectionFrom(payload)); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [])

  return <ResourcePage eyebrow="Movement log" title="Activities" description="A clear record of the work you have put in.">
    {status === 'loading' ? <p className="state">Loading data...</p> : status === 'error' ? <p className="state error">The API could not be reached. Check the backend and try again.</p> : activities.length === 0 ? <p className="state">No activities logged yet.</p> : <div className="table-wrap"><table><thead><tr><th>Type</th><th>Duration</th><th>Calories</th><th>Date</th><th>Notes</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td>{activity.type}</td><td>{activity.durationMinutes} min</td><td>{activity.calories}</td><td>{formatDate(activity.date)}</td><td>{activity.notes || '-'}</td></tr>)}</tbody></table></div>}
  </ResourcePage>
}

export default Activities

function formatDate(value) { return value ? new Date(value).toLocaleDateString() : '—' }
function ResourcePage({ eyebrow, title, description, children }) { return <section className="resource-page"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-description">{description}</p>{children}</section> }