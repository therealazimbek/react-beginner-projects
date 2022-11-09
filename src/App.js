import React, { useEffect, useState } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [invited, setInvited] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => {
        console.warn(err);
        alert("Error fetching users!");
      })
      .finally(() => setLoading(false));
  }, []);

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invited.includes(id)) {
      setInvited((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvited((prev) => [...prev, id]);
    }
  };

  const onClickSend = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invited.length} />
      ) : (
        <Users
          onChangeSearchInput={onChangeSearchInput}
          searchInput={searchInput}
          items={users}
          isLoading={isLoading}
          invited={invited}
          onClickInvite={onClickInvite}
          onClickSend={onClickSend}
        />
      )}
    </div>
  );
}

export default App;
