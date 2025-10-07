import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../userCard/usercard';
import '../userList/userlist.css';

const API = 'https://randomuser.me/api/?results=20';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const fetchUsers = async (append = false) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(API);
      const newUsers = res.data.results || [];
      setUsers(prev => (append ? [...prev, ...newUsers] : newUsers));
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(false); }, []);

  // Filter users by name
  const filteredUsers = users.filter(u => {
    const fullName = `${u.name.first} ${u.name.last}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  return (
    <div className="user-list-wrapper">
      <div className="controls-top">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search users by name"
        />
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}

      <div className="user-grid">
        {filteredUsers.map((u, idx) => (
          <UserCard key={u.login.uuid || idx} user={u} />
        ))}
      </div>

      <div className="load-more">
        <button onClick={() => fetchUsers(true)} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
}
