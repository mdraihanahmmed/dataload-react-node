import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUsers = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUsers = { name, email };

    fetch("http://localhost:5000/users", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUsers),
    })
      .then((res) => res.json())
      .then((data) => {
        const addUsers = data;
        const newUsers = [...users, addUsers];
        setUsers(newUsers);
      });

    nameRef.current.value = "";
    emailRef.current.value = "";

    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>this is all data: {users.length}</h1>

      <form onSubmit={handleAddUsers}>
        <input type="text" ref={nameRef} name="" id="" placeholder="name" />
        <input type="email" ref={emailRef} name="" id="" placeholder="email" />
        <input type="submit" value="submit" />
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            id: {user.id} name: {user.name} email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
