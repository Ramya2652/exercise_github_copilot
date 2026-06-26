import { useEffect, useState } from 'react';
import { normalizeItems } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadLeaderboard = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }

        const payload = await response.json();
        if (isMounted) {
          setEntries(normalizeItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leaderboard');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Leaderboard</h2>
          <p className="text-muted mb-0">Top performing athletes and their progress.</p>
        </div>
      </div>

      {loading && <div className="alert alert-light">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Rank</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id || `${entry.name}-${entry.rank}`}>
                    <td>{entry.name}</td>
                    <td>{entry.score}</td>
                    <td>{entry.rank}</td>
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

export default Leaderboard;
