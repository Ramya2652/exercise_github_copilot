import { useEffect, useState } from 'react';
import { normalizeItems } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const payload = await response.json();
        if (isMounted) {
          setUsers(normalizeItems(payload));
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load users');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 mb-1">Users</h2>
          <p className="text-muted mb-0">Members of the OctoFit community.</p>
        </div>
      </div>

      {loading && <div className="alert alert-light">Loading users...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-md-6" key={user._id || user.email}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h3 className="h5">{user.name}</h3>
                  <p className="text-muted mb-1">{user.email}</p>
                  <span className="badge bg-primary-subtle text-primary-emphasis">{user.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Users;
