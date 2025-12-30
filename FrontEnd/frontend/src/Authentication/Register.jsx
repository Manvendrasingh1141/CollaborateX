import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!firstname || !lastname || !email || !password) {
      setMessage("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/register", {
        firstname,
        lastname,
        email,
        password
      });

      if (res.data.success) {
        if (remember) {
          localStorage.setItem("rememberEmail", email);
        }
        navigate("/login");
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#D4B8EA] flex items-center justify-center">
      <div className="w-[90%] h-[90%] flex items-center justify-center">
        <div className="p-10 w-[40%] bg-white rounded-2xl">

          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold">Create Account</h1>
            <p>Please enter your details</p>
          </div>

          <form className="my-10" onSubmit={handleSubmit}>
            
            {/* Firstname */}
            <div className="mb-3">
              <label className="font-semibold">Firstname</label>
              <input
                className="outline-none w-full"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <div className="bg-black h-0.5" />
            </div>

            {/* Lastname */}
            <div className="mb-3">
              <label className="font-semibold">Lastname</label>
              <input
                className="outline-none w-full"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
              <div className="bg-black h-0.5" />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                className="outline-none w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="bg-black h-0.5" />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="font-semibold">Password</label>
              <input
                type="password"
                className="outline-none w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="bg-black h-0.5" />
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember me</span>
            </div>

            {/* Message */}
            {message && (
              <p className="text-red-500 text-sm mt-3">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-[80%] mx-auto block p-2 bg-[#2E2E2E] text-white rounded-3xl mt-8 disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="flex gap-2 mt-8 justify-center">
              <span>Already have an account?</span>
              <Link to="/login" className="font-medium">
                Sign In
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
