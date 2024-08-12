import React, { useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase-config"; // Ensure this imports your Firebase auth

export default function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=6Lc-8yQqAAAAAIWA9OspSY3Hrizyv562JyFJ83W6`;
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function getRecaptchaToken() {
    return new Promise((resolve) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute().then((token) => {
          resolve(token);
        });
      });
    });
  }

  const setupRecaptcha = async () => {
    const token = await getRecaptchaToken();
    return new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log("reCAPTCHA verified:", response);
      },
    }, auth);
  };

  const handlePhoneLogin = async () => {
    try {
      const recaptchaVerifier = await setupRecaptcha();

      const appVerifier = recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

      window.confirmationResult = confirmationResult; // Save it to use later to confirm the verification code
      setSuccessMessage("Verification code sent to your phone.");
    } catch (error) {
      console.error("Error during phone authentication:", error);
      setApiError("An error occurred during phone authentication.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const confirmationResult = window.confirmationResult;
      const result = await confirmationResult.confirm(verificationCode);

      const user = result.user;
      console.log("User signed in:", user);
      setSuccessMessage("Phone number verified successfully.");
    } catch (error) {
      console.error("Error verifying code:", error);
      setApiError("Invalid verification code.");
    }
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        <button type="button" onClick={handlePhoneLogin}>Send Verification Code</button>
      </form>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="verificationCode">Verification Code</label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
          />
        </div>
        <button type="button" onClick={handleVerifyCode}>Verify Code</button>
      </form>
      {apiError && <div>{apiError}</div>}
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
}
