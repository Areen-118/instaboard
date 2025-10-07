
import React, { useState } from "react";
import "../userCard/usercard.css";

export default function UserCard({ user }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false); 
  const [showEmail, setShowEmail] = useState(false);

  const fullName = `${user?.name?.first || ""} ${user?.name?.last || ""}`;
  const picture = user?.picture?.large || user?.picture?.thumbnail || "https://via.placeholder.com/150";

  const handleLike = () => {
    if (!liked) {        
      setLikes(likes + 1);
      setLiked(true);        
    }
  };

  return (
    <div className="user-card">
      <img className="avatar" src={picture} alt={fullName} />
      <h3 className="name">{fullName}</h3>

      {showEmail && <p className="email">{user.email}</p>}

      <div className="controls">
        <button 
          className="like-btn" 
          onClick={handleLike} 
          disabled={liked}
        >
          ❤️ Like ({likes})
        </button>
        <button 
          className="toggle-btn" 
          onClick={() => setShowEmail(s => !s)}
        >
          {showEmail ? "Hide Email" : "Show Email"}
        </button>
      </div>
    </div>
  );
}
