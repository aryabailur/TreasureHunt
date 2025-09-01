import React, { useState } from "react";
import "./App.css";

// These can be kept for the dropdowns
const years = ["FE", "SE", "TE", "BE"];
const branches = [
  "COMPUTER ENGINEERING(COMPS)",
  "INFORMATION TECHNOLOGY(IT)",
  "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE(AI & DS)",
  "CHEMICAL(CHEM)",
  "ELECTRONICS AND TELECOMMUNICATION(EXTC)",
];

function ValorantRegistration() {
  const [formData, setFormData] = useState({
    partyName: "",
    leaderName: "",
    leaderYear: "",
    leaderBranch: "",
    leaderEmail: "",
    leaderPhone: "",
    players: Array(4).fill(""), // 4 players, name only
    paymentScreenshot: null,
    transactionId: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePlayerChange = (e, index) => {
    const newPlayers = [...formData.players];
    newPlayers[index] = e.target.value;
    setFormData((prevData) => ({ ...prevData, players: newPlayers }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      paymentScreenshot: e.target.files[0],
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.partyName) newErrors.partyName = "Party name is required";
    if (!formData.leaderName) newErrors.leaderName = "Leader name is required";
    if (!formData.leaderEmail) newErrors.leaderEmail = "Email is required";
    if (!/^\d{10}$/.test(formData.leaderPhone))
      newErrors.leaderPhone = "Phone must be 10 digits";

    formData.players.forEach((player, idx) => {
      if (!player)
        newErrors[`player${idx}`] = `Player ${idx + 1} name is required`;
    });

    if (!formData.paymentScreenshot)
      newErrors.paymentScreenshot = "Payment screenshot is required";
    if (!formData.transactionId)
      newErrors.transactionId = "Transaction ID is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", formData);
      alert("Registration successful!");
    }
  };

  return (
    <div className="page-container">
      <form
        className="registration-container"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* This img tag now has the correct className to apply sizing */}
        <img src="/logo.png" alt="Event Logo" className="logo" />

        <h1 className="form-title">Valorant Registration</h1>

        <fieldset>
          <legend>Leader Details</legend>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="partyName">Party Name</label>
              <input
                id="partyName"
                name="partyName"
                type="text"
                value={formData.partyName}
                onChange={handleChange}
              />
              {errors.partyName && (
                <span className="error">{errors.partyName}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="leaderName">Name</label>
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
            <div className="form-group">
              <label htmlFor="leaderPhone">Phone</label>
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
            <div className="form-group">
              <label htmlFor="leaderYear">Year</label>
              <select
                id="leaderYear"
                name="leaderYear"
                value={formData.leaderYear}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="leaderBranch">Branch</label>
              <select
                id="leaderBranch"
                name="leaderBranch"
                value={formData.leaderBranch}
                onChange={handleChange}
              >
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group full-width">
              <label htmlFor="leaderEmail">Email</label>
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
          </div>
        </fieldset>

        <fieldset>
          <legend>Party Details</legend>
          <div className="form-grid">
            {formData.players.map((player, index) => (
              <div className="form-group" key={index}>
                <label htmlFor={`player${index}`}>
                  Player {index + 1} Name
                </label>
                <input
                  id={`player${index}`}
                  name={`player${index}`}
                  type="text"
                  value={player}
                  onChange={(e) => handlePlayerChange(e, index)}
                />
                {errors[`player${index}`] && (
                  <span className="error">{errors[`player${index}`]}</span>
                )}
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Payment</legend>
          <div className="payment-section">
            <div className="qr-container">
              <img
                src="/qr-code.png"
                alt="QR Code for payment"
                className="qr-code"
              />
              <p>Scan to pay</p>
            </div>
            <div className="payment-details">
              <div className="form-group">
                <label htmlFor="paymentScreenshot">Payment Screenshot</label>
                <input
                  id="paymentScreenshot"
                  name="paymentScreenshot"
                  type="file"
                  onChange={handleFileChange}
                  className="file-input"
                />
                {errors.paymentScreenshot && (
                  <span className="error">{errors.paymentScreenshot}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="transactionId">Transaction ID</label>
                <input
                  id="transactionId"
                  name="transactionId"
                  type="text"
                  value={formData.transactionId}
                  onChange={handleChange}
                />
                {errors.transactionId && (
                  <span className="error">{errors.transactionId}</span>
                )}
              </div>
            </div>
          </div>
        </fieldset>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ValorantRegistration;
