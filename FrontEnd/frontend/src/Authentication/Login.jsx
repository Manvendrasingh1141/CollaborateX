import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(""); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await axios.post("http://localhost:3001/login", { email, password });

    if (res.data.success) {

     
      const fullName = `${res.data.user.firstname} ${res.data.user.lastname}`;
      sessionStorage.setItem("username", fullName);
      sessionStorage.setItem("email", res.data.user.email);

    
      if (remember) {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
      }

      navigate("/"); 
    } else {
      setError(res.data.message);
    }
  } catch (err) {
    console.error(err);
    setError("Server error. Try again later.");
  }
};


  return (
    <div className="w-screen h-screen bg-[#D4B8EA] flex items-center justify-center">
      <div className="w-[90%] h-[90%] flex items-center justify-center">
        <div className="p-10 w-[40%] bg-white rounded-2xl">

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p>Please enter your details</p>
          </div>

          <form className="my-10" onSubmit={handleSubmit}>

           
            <div className="mb-3">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                className={`outline-none w-full ${error.includes("Email") ? "border-red-500 border-2" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="bg-black h-0.5" />
            </div>

           
            <div className="mb-3">
              <label className="font-semibold">Password</label>
              <input
                type="password"
                className={`outline-none w-full ${error.includes("Password") ? "border-red-500 border-2" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="bg-black h-0.5" />
            </div>

           
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </div>

            
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}

            <button
              type="submit"
              className="w-[80%] mx-auto block p-2 bg-[#2E2E2E] text-white rounded-3xl mt-8"
            >
              Log in
            </button>

            <div className="flex gap-2 mt-8 justify-center">
              <span>Don't have an account?</span>
              <Link to="/register" className="font-medium">Sign Up</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
