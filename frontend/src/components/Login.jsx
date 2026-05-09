import { useState } from "react";

function Login({ setIsLoggedIn }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    // Demo login
    if (
      username === "admin" &&
      password === "password123"
    ) {

      localStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);

    } else {

      alert("Invalid Credentials");

    }
  };

  return (

    <div className="min-h-screen bg-slate-900 flex justify-center items-center">

      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-10 rounded-3xl w-[400px]"
      >

        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          MediStore Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full bg-slate-700 text-white px-5 py-4 rounded-xl outline-none mb-5"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full bg-slate-700 text-white px-5 py-4 rounded-xl outline-none mb-8"
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-bold"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;