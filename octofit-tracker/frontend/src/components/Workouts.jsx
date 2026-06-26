import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeItems } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = '/api/workouts/';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadWorkouts = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}${endpoint}`);
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }

        const payload = await response.json();
        if (isMounted) {
          setWorkouts(normalizeItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load workouts');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Workouts</h2>
          <p className="text-muted mb-0">Planned sessions and fitness recommendations.</p>
        </div>
      </div>

      {loading && <div className="alert alert-light">Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6" key={workout._id || workout.name}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h3 className="h5">{workout.name}</h3>
                  <p className="text-muted mb-0">{workout.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Workouts;
