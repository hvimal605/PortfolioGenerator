import React, { useState } from "react";

const StrongPassword = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [requirements, setRequirements] = useState({
    minLength: false,
    lowercase: false,
    uppercase: false,
    numbers: false,
    specialCharacters: false,
  });

  const strengthLevels = ["Empty", "Weak", "Medium", "Strong", "Very Strong", "Super Strong"];

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Check password strength and update requirements
    const minLength = value.length >= 6;
    const lowercase = /[a-z]/.test(value);
    const uppercase = /[A-Z]/.test(value);
    const numbers = /[0-9]/.test(value);
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    setRequirements({ minLength, lowercase, uppercase, numbers, specialCharacters });

    // Update strength level
    const fulfilledRules = [minLength, lowercase, uppercase, numbers, specialCharacters].filter(
      (rule) => rule
    ).length;

    setStrength(strengthLevels[fulfilledRules] || "Empty");
  };

  return (
    <div className="max-w-sm">
      <div className="flex mb-2">
        <div className="flex-1">
          <input
            type="password"
            id="strong-password-input"
            className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="flex mt-2 -mx-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-auto rounded-full mx-1 ${
                  index < strengthLevels.indexOf(strength)
                    ? "bg-teal-500"
                    : "bg-blue-500 opacity-50"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div>
          <span className="text-sm text-gray-800 dark:text-neutral-200">Level:</span>{" "}
          <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
            {strength}
          </span>
        </div>

        <h4 className="my-2 text-sm font-semibold text-gray-800 dark:text-white">
          Your password must contain:
        </h4>

        <ul className="space-y-1 text-sm text-gray-500 dark:text-neutral-500">
          <li
            className={`flex items-center gap-x-2 ${
              requirements.minLength ? "text-teal-500" : ""
            }`}
          >
            <span>{requirements.minLength ? "✔" : "✖"}</span> Minimum number of characters is 6.
          </li>
          <li
            className={`flex items-center gap-x-2 ${
              requirements.lowercase ? "text-teal-500" : ""
            }`}
          >
            <span>{requirements.lowercase ? "✔" : "✖"}</span> Should contain lowercase.
          </li>
          <li
            className={`flex items-center gap-x-2 ${
              requirements.uppercase ? "text-teal-500" : ""
            }`}
          >
            <span>{requirements.uppercase ? "✔" : "✖"}</span> Should contain uppercase.
          </li>
          <li
            className={`flex items-center gap-x-2 ${
              requirements.numbers ? "text-teal-500" : ""
            }`}
          >
            <span>{requirements.numbers ? "✔" : "✖"}</span> Should contain numbers.
          </li>
          <li
            className={`flex items-center gap-x-2 ${
              requirements.specialCharacters ? "text-teal-500" : ""
            }`}
          >
            <span>{requirements.specialCharacters ? "✔" : "✖"}</span> Should contain special characters.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StrongPassword;
