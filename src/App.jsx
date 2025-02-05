import { useState } from "react";
import "./App.css";
import UserSearch from "./components/UserSearch";
import User from "./components/User";
import AlertMessage from "./components/AlertMessage";

function App() {
  const [data, setData] = useState();
  const [username, setUsername] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = () => {
    if (!username && username === "") {
      setShowAlert(true);
    } else {
      fetch(`https://api.github.com/users/${username}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`GitHub API error: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => setData(data))
        .catch((error) => {
          setShowAlert(true);
          console.error(error);
        });
    }
  };

  const handleUSername = (e) => {
    setUsername(e.target.value);
  };

  const closeAlert = () => {
    if (showAlert === true) {
      setShowAlert(false);
    }
  };

  return (
    <>
      {showAlert && <AlertMessage onclose={closeAlert} />}
      <div className="topClass">
        <h2 className="mb-10 px-5 text-white text-xl font-bold text-center md:text-4xl">Search for a GitHub Profile</h2>
        <UserSearch
          user={username}
          onSetUsername={handleUSername}
          onHandleSearch={handleSearch}
        />
        <User data={data} username={username} />
      </div>
    </>
  );
}

export default App;
