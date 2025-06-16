import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null)); // If not logged in
  }, []);
  return (
    <div className="container">
      {user ? (
        <>
          <h2>Welcome, {user.user.username}</h2>
          <p>Email: {user.user.email}</p>
          <img
            src={user.user.image}
            alt="Profile"
           style={{width:"80px",height:"80px", borderRadius:"50%"}}
            referrerPolicy="no-referrer"
          />
        </>
      ) : (
        <p>User not logged in</p>
      )}
    </div>
  );
};

export default Profile;
