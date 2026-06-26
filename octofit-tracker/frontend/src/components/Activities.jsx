import { useEffect, useState } from 'react';
import { normalizeItems } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadActivities = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const payload = await response.json();
        if (isMounted) {
          setActivities(normalizeItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load activities');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Activities</h2>
          <p className="text-muted mb-0">Recent training sessions and workout history.</p>
        </div>
      </div>

      {loading && <div className="alert alert-light">Loading activities...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || `${activity.type}-${activity.date}`}>
                    <td className="text-capitalize">{activity.type}</td>
                    <td>{activity.duration} min</td>
                    <td>{activity.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default Activities;
