import React, { useState } from "react";
import "./App.css";

const years = ["FE", "SE", "TE", "BE"];
const branches = [
  "COMPUTER ENGINEERING(COMPS)",
  "INFORMATION TECHNOLOGY(IT)",
  "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE(AI & DS)",
  "CHEMICAL(CHEM)",
  "ELECTRONICS AND TELECOMMUNICATION(EXTC)",
];

function TeamRegistration() {
  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    leaderYear: "",
    leaderBranch: "",
    leaderEmail: "",
    leaderPhone: "",
    players: Array(3).fill({ name: "", year: "", branch: "" }),
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e, playerIndex = null, field = null) => {
    const { name, value } = e.target;
    if (playerIndex !== null && field !== null) {
      const newPlayers = [...formData.players];
      newPlayers[playerIndex] = { ...newPlayers[playerIndex], [field]: value };
      setFormData({ ...formData, players: newPlayers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    // ... your validation logic remains the same
    const newErrors = {};
    if (!formData.teamName) newErrors.teamName = "Team name required";
    if (!formData.leaderName) newErrors.leaderName = "Leader name required";
    if (!formData.leaderYear) newErrors.leaderYear = "Year required";
    if (!formData.leaderBranch) newErrors.leaderBranch = "Branch required";
    if (!formData.leaderEmail) newErrors.leaderEmail = "Email required";
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.leaderEmail))
      newErrors.leaderEmail = "Invalid email";
    if (!formData.leaderPhone) newErrors.leaderPhone = "Phone required";
    else if (!/^\d{10}$/.test(formData.leaderPhone))
      newErrors.leaderPhone = "Phone must be 10 digits";

    formData.players.forEach((player, idx) => {
      if (!player.name) newErrors[`player${idx}Name`] = "Name required";
      if (!player.year) newErrors[`player${idx}Year`] = "Year required";
      if (!player.branch) newErrors[`player${idx}Branch`] = "Branch required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted!");
    }
  };

  return (
    // This is the new wrapper div that centers everything
    <div className="page-container">
      <div className="registration-container">
        <header className="header">
          <img className="logo" src="/logo.png" alt="Logo" />
          <h2>HOW TO REGISTER</h2>
          <ul className="register-steps">
            <li>Step 1:Enter your team name.</li>
            <li>
              Step 2:Fill in the Team Leader's details (Name, Email, Phone,
              Year, Branch).
            </li>
            <li>
              Step 3Enter details for 3 additional team members (Name, Year,
              Branch).
            </li>
            <li>Step 4Click "Register Team".</li>
          </ul>
        </header>

        <section className="team-info">
          <h2>TEAM INFORMATION</h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* The rest of your form JSX remains exactly the same... */}
            <div className="team-name-section">
              <label>TEAM NAME</label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
              />
              {errors.teamName && (
                <span className="error">{errors.teamName}</span>
              )}
            </div>

            <fieldset className="leader-details">
              {/* ... leader fields ... */}
            </fieldset>

            <fieldset className="players-details">
              {/* ... players fields ... */}
            </fieldset>

            <button type="submit">Register Team</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default TeamRegistration;
