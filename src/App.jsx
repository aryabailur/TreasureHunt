import React, { useState } from "react";
import Confetti from "react-confetti";
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
    players: Array(2).fill(""),
    paymentScreenshot: null, // For the screenshot file
  });

  const [errors, setErrors] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlayerChange = (e, index) => {
    const newPlayers = [...formData.players];
    newPlayers[index] = e.target.value;
    setFormData((prevData) => ({ ...prevData, players: newPlayers }));
  };

  // Handler for the file input
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      paymentScreenshot: e.target.files[0],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.teamName) newErrors.teamName = "Team name required";
    if (!formData.leaderName) newErrors.leaderName = "Leader name required";
    if (!formData.leaderYear) newErrors.leaderYear = "Year required";
    if (!formData.leaderBranch) newErrors.leaderBranch = "Branch required";
    if (!formData.leaderEmail) newErrors.leaderEmail = "Email required";
    if (!/^\d{10}$/.test(formData.leaderPhone))
      newErrors.leaderPhone = "Phone must be 10 digits";

    formData.players.forEach((player, idx) => {
      if (!player)
        newErrors[`player${idx}Name`] = `Player ${idx + 1} name is required`;
    });

    // Validation for the new payment screenshot field
    if (!formData.paymentScreenshot) {
      newErrors.paymentScreenshot = "Payment screenshot is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowConfetti(true);
      setIsSubmitted(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);

      console.log("Form Data:", formData);
    }
  };

  return (
    <div className="page-container">
      {showConfetti && <Confetti />}

      {isSubmitted ? (
        <div className="registration-container">
          <img className="logo" src="/logo.png" alt="Event Logo" />
          <div className="success-message">
            <h2>Registered Successfully!</h2>
            <p>Thank you for registering. We will be in touch soon.</p>
          </div>
        </div>
      ) : (
        <form
          className="registration-container"
          onSubmit={handleSubmit}
          noValidate
        >
          <img className="logo" src="/logo.png" alt="Event Logo" />

          <section className="how-to-register-section">
            <h2>HOW TO REGISTER</h2>
            <ul className="register-steps">
              <li>Step 1: Enter your team name.</li>
              <li>Step 2: Fill in the Team Leader's details.</li>
              <li>Step 3: Enter details for 2 additional team members.</li>
              <li>Step 4: Complete payment and upload the screenshot.</li>
              <li>Step 5: Click "Register Team".</li>
            </ul>
          </section>

          <section className="team-information-section">
            <h2>TEAM INFORMATION</h2>

            <div className="form-group full-width">
              <label htmlFor="teamName">TEAM NAME</label>
              <input
                id="teamName"
                name="teamName"
                type="text"
                value={formData.teamName}
                onChange={handleChange}
              />
              {errors.teamName && (
                <span className="error">{errors.teamName}</span>
              )}
            </div>

            <fieldset className="leader-details-fieldset">
              <legend>TEAM LEADER DETAILS</legend>
              <div className="leader-row">
                <div className="form-group leader-name">
                  <label htmlFor="leaderName">NAME</label>
                  <input
                    id="leaderName"
                    name="leaderName"
                    type="text"
                    value={formData.leaderName}
                    onChange={handleChange}
                  />
                  {errors.leaderName && (
                    <span className="error">{errors.leaderName}</span>
                  )}
                </div>
                <div className="form-group leader-year">
                  <label htmlFor="leaderYear">YEAR</label>
                  <select
                    id="leaderYear"
                    name="leaderYear"
                    value={formData.leaderYear}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                  {errors.leaderYear && (
                    <span className="error">{errors.leaderYear}</span>
                  )}
                </div>
                <div className="form-group leader-branch">
                  <label htmlFor="leaderBranch">BRANCH</label>
                  <select
                    id="leaderBranch"
                    name="leaderBranch"
                    value={formData.leaderBranch}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {branches.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  {errors.leaderBranch && (
                    <span className="error">{errors.leaderBranch}</span>
                  )}
                </div>
              </div>
              <div className="leader-row">
                <div className="form-group leader-email">
                  <label htmlFor="leaderEmail">EMAIL</label>
                  <input
                    id="leaderEmail"
                    name="leaderEmail"
                    type="email"
                    value={formData.leaderEmail}
                    onChange={handleChange}
                  />
                  {errors.leaderEmail && (
                    <span className="error">{errors.leaderEmail}</span>
                  )}
                </div>
                <div className="form-group leader-phone">
                  <label htmlFor="leaderPhone">PHONE NO.</label>
                  <input
                    id="leaderPhone"
                    name="leaderPhone"
                    type="tel"
                    value={formData.leaderPhone}
                    onChange={handleChange}
                  />
                  {errors.leaderPhone && (
                    <span className="error">{errors.leaderPhone}</span>
                  )}
                </div>
              </div>
            </fieldset>

            <fieldset className="players-details-fieldset">
              <legend>PLAYERS DETAILS</legend>
              {formData.players.map((player, index) => (
                <div className="player-block" key={index}>
                  <div className="form-group">
                    <label htmlFor={`playerName${index}`}>
                      PLAYER {index + 1} NAME
                    </label>
                    <input
                      id={`playerName${index}`}
                      name={`playerName${index}`}
                      type="text"
                      value={player}
                      onChange={(e) => handlePlayerChange(e, index)}
                    />
                    {errors[`player${index}Name`] && (
                      <span className="error">
                        {errors[`player${index}Name`]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </fieldset>

            {/* New Payment Section */}
            <fieldset className="payment-fieldset">
              <legend>PAYMENT</legend>
              <div className="payment-layout">
                <div className="qr-section">
                  <img
                    src="/qr-code.jpg"
                    alt="Scan to pay"
                    className="qr-code-image"
                  />
                  <a
                    href="upi://pay?pa=8483854915@ptyes&pn=VISHWA%20PRASHANT%20PAWA&mc=0000&mode=02&purpose=00&orgid=159761&cust=1498416055"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="upi-redirect-button"
                  >
                    Pay Now via UPI
                  </a>
                </div>
                <div className="upload-section">
                  <div className="form-group">
                    <label htmlFor="paymentScreenshot">UPLOAD SCREENSHOT</label>
                    <input
                      id="paymentScreenshot"
                      name="paymentScreenshot"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file-input"
                    />
                    {errors.paymentScreenshot && (
                      <span className="error">{errors.paymentScreenshot}</span>
                    )}
                  </div>
                </div>
              </div>
            </fieldset>

            <button type="submit">REGISTER TEAM</button>
          </section>
        </form>
      )}
    </div>
  );
}

export default TeamRegistration;
