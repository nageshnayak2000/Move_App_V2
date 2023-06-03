import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Fname, setFName] = useState("");
  const [Lname, setLName] = useState("");
  const [Phone, setPhone] = useState("");
  const [CompanyName, setCName] = useState("");
  const [CompanyAddress, setCAddress] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    // if (!Fname) alert("Please enter First name");
    registerWithEmailAndPassword(Fname, email, password);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(file);
  };

  const handleCitySelection = (city) => {
    const isSelected = selectedCities.includes(city);

    if (isSelected) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          id="validationDefault01"
          value={Fname}
          onChange={(e) => setFName(e.target.value)}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          className="register__textBox"
          value={Lname}
          onChange={(e) => setLName(e.target.value)}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
          required
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="text"
          className="register__textBox"
          id="validationDefault01"
          value={Phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          required
        />
        <input
          type="text"
          className="register__textBox"
          id="validationDefault01"
          value={CompanyName}
          onChange={(e) => setCName(e.target.value)}
          placeholder="Company Name"
        />
        <input
          type="text"
          className="register__textBox"
          id="validationDefault01"
          value={CompanyAddress}
          onChange={(e) => setCAddress(e.target.value)}
          placeholder="Company Address"
        />
          <h4>Upload Profile Photo</h4>
          <input type="file" onChange={handleFileChange} required />
          {profilePhoto && (
            <img
              src={URL.createObjectURL(profilePhoto)}
              alt="Profile"
              style={{ borderRadius: '50%', width: '150px', height: '150px' }}
            />
          )}
        <div>
          <h4>Select Cities</h4>
          <label>
            <input
              type="checkbox"
              checked={selectedCities.includes('City A')}
              onChange={() => handleCitySelection('City A')}
            />
            City A
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedCities.includes('City B')}
              onChange={() => handleCitySelection('City B')}
            />
            City B
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedCities.includes('City C')}
              onChange={() => handleCitySelection('City C')}
            />
            City C
          </label>
        </div>
        <br></br>
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>

        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Register;
