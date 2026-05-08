import { useState, useEffect } from 'react'
import { getPendingExperts, getExpertDocument, approveExpert } from '../services/api'

const PendingExperts = () => {
  const [experts, setExperts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [approving, setApproving] = useState(null)

  useEffect(() => {
    fetchExperts()
  }, [])

  const fetchExperts = async () => {
    try {
      const data = await getPendingExperts()
      setExperts(data.data || [])
    } catch (err) {
      setError('Failed to load pending experts')
    } finally {
      setLoading(false)
    }
  }

  const handleViewDocument = async (id) => {
    try {
      const data = await getExpertDocument(id)
      if (data.data?.url) {
        window.open(data.data.url, '_blank')
      }
    } catch (err) {
      alert('Failed to get document URL')
    }
  }

  const handleApprove = async (id) => {
    if (!confirm('Are you sure you want to approve this expert?')) return

    setApproving(id)
    try {
      await approveExpert(id)
      setExperts(experts.filter(exp => exp.id !== id))
      alert('Expert approved successfully!')
    } catch (err) {
      alert('Failed to approve expert')
    } finally {
      setApproving(null)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return <div className="loading">Loading pending experts...</div>
  }

  return (
    <div className="dashboard">
      <h2>Pending Expert Applications</h2>

      {error && <div className="error-message">{error}</div>}

      {experts.length === 0 ? (
        <div className="empty-state">
          <p>No pending expert applications</p>
        </div>
      ) : (
        <table className="experts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Speciality</th>
              <th>Document Type</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experts.map((expert) => (
              <tr key={expert.id}>
                <td>{expert.name}</td>
                <td>{expert.email}</td>
                <td>{expert.phone || '-'}</td>
                <td>{expert.speciality || '-'}</td>
                <td>{expert.documentType || '-'}</td>
                <td>{formatDate(expert.createdAt)}</td>
                <td className="actions">
                  <button
                    className="view-btn"
                    onClick={() => handleViewDocument(expert.id)}
                  >
                    View Document
                  </button>
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(expert.id)}
                    disabled={approving === expert.id}
                  >
                    {approving === expert.id ? 'Approving...' : 'Approve'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PendingExperts