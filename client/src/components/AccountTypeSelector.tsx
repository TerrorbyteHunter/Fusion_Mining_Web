import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AccountTypeSelector: React.FC = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const setAccountType = async (type: "buyer" | "seller") => {
    try {
      await user.update({
        publicMetadata: { accountType: type },
      });
      navigate("/dashboard"); // Redirect to dashboard after setting account type
    } catch (error) {
      console.error("Failed to set account type:", error);
    }
  };

  if (!isLoaded) return null;

  // If account type is already set, redirect to dashboard
  if (user.publicMetadata.accountType) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="account-type-selector">
      <h2>Select Your Account Type</h2>
      <p>Please choose the type of account you want to create:</p>
      <div className="buttons">
        <button onClick={() => setAccountType("buyer")} className="btn btn-primary">
          Buyer
        </button>
        <button onClick={() => setAccountType("seller")} className="btn btn-secondary">
          Seller
        </button>
      </div>
    </div>
  );
};

export default AccountTypeSelector;