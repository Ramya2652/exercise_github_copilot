import { useEffect, useState } from 'react';
import { normalizeItems } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadTeams = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const payload = await response.json();
        if (isMounted) {
          setTeams(normalizeItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load teams');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Teams</h2>
          <p className="text-muted mb-0">Community groups and squads.</p>
        </div>
      </div>

      {loading && <div className="alert alert-light">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id || team.name}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h3 className="h5">{team.name}</h3>
                  <p className="text-muted mb-0">{team.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Teams;
