// FamilyManagement.jsx (FIXED/UPDATED)

import React, { useState, useEffect } from "react";
import "./FamilyManagement.css"; // Ensure this path is correct

import MakeAdmin from "../../assets/icons/upgrade.svg";
import Downgrade from "../../assets/icons/down-arrow.svg";
import KickOut from "../../assets/icons/kick-out.svg";

// Import the FamilyCreationForm component
import FamilyCreationForm from "../../components/FamilyCreationForm";

const API_BASE = "https://harmonize-app-backend.vercel.app"; // Your backend URL

const FamilyManagement = () => {
  const [familyData, setFamilyData] = useState(null); // Stores family name, code, and members
  const [currentLoggedInUserData, setCurrentLoggedInUserData] = useState(null); // Stores current logged-in user's full data

  // Use a dedicated state for admin_role
  const [currentLoggedInAdminRole, setCurrentLoggedInAdminRole] = useState(""); // Administrative role of the logged-in user

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMessage, setActionMessage] = useState(null); // For success/error messages after actions

  // New state for joining family
  const [joinCode, setJoinCode] = useState("");
  const [isJoining, setIsJoining] = useState(false); // Loading state for join operation

  // Function to refetch ALL relevant user and family data after any action
  const refetchAllData = async () => {
    setError(null); // Clear previous errors for refetch
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication required. Please log in.");
      setIsLoading(false); // Stop loading if no token
      return;
    }

    try {
      // Re-fetch current user data to get updated family_id and roles
      const userResponse = await fetch(`${API_BASE}/api/user/me`, {
        headers: { "X-App-Authorization": `Bearer ${token}` },
      });
      if (!userResponse.ok) throw new Error("Failed to refetch user data.");
      const userData = await userResponse.json();
      setCurrentLoggedInUserData(userData.data);

      // Set currentLoggedInAdminRole from userData.data.admin_role
      // Added a fallback to "Member" if for some reason it's null/undefined,
      // though if backend is confirmed working, it should be "Admin" or "Member"
      setCurrentLoggedInAdminRole(userData.data.admin_role || "Member");

      const userFamilyId = userData.data.family_id;

      if (userFamilyId) {
        // If user is now part of a family, fetch family details
        const familyResponse = await fetch(
          `${API_BASE}/api/family/${userFamilyId}`,
          {
            headers: { "X-App-Authorization": `Bearer ${token}` },
          }
        );
        if (!familyResponse.ok)
          throw new Error("Failed to refetch family details.");
        const familyDetails = await familyResponse.json();
        setFamilyData(familyDetails.data);
      } else {
        // If user is still not part of a family, clear familyData
        setFamilyData(null);
      }
      setActionMessage(null); // Clear any old action messages after successful refetch
    } catch (err) {
      console.error("Error refetching data after action:", err);
      setError(`Failed to refresh information: ${err.message}`);
    } finally {
      setIsLoading(false); // Ensure loading state is reset
      setIsJoining(false); // Reset joining loading state
    }
  };

  useEffect(() => {
    // Initial data fetch only runs once
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication required. Please log in.");
      setIsLoading(false);
      return;
    }

    try {
      const userResponse = await fetch(`${API_BASE}/api/user/me`, {
        headers: { "X-App-Authorization": `Bearer ${token}` },
      });
      if (!userResponse.ok)
        throw new Error(
          `Failed to fetch user data: ${userResponse.statusText}`
        );
      const userData = await userResponse.json();
      setCurrentLoggedInUserData(userData.data);

      // Set currentLoggedInAdminRole from userData.data.admin_role
      setCurrentLoggedInAdminRole(userData.data.admin_role || "Member");

      const userFamilyId = userData.data.family_id;

      if (!userFamilyId) {
        setIsLoading(false);
        return; // Exit, as no family data to fetch
      }

      const familyResponse = await fetch(
        `${API_BASE}/api/family/${userFamilyId}`,
        {
          headers: { "X-App-Authorization": `Bearer ${token}` },
        }
      );
      if (!familyResponse.ok)
        throw new Error(
          `Failed to fetch family data: ${familyResponse.statusText}`
        );
      const familyDetails = await familyResponse.json();
      setFamilyData(familyDetails.data);
    } catch (err) {
      console.error("Error fetching family data:", err);
      setError(`Failed to load family information: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const performMemberAction = async (
    memberId,
    actionType,
    confirmMessage,
    payload = {}
  ) => {
    if (!window.confirm(confirmMessage)) return;

    setActionMessage(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/api/family/member/${memberId}/${actionType}`,
        {
          method: "POST", // All these member actions are POST
          headers: {
            "Content-Type": "application/json",
            "X-App-Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || `Failed to perform ${actionType} action.`
        );
      }

      setActionMessage(
        responseData.message || `Action "${actionType}" successful!`
      );
      // Refetch family data to update the UI
      await refetchAllData();
    } catch (err) {
      console.error(`Error performing ${actionType} action:`, err);
      setError(
        err.message || `An unexpected error occurred during ${actionType}.`
      );
    }
  };

  const handleMakeAdmin = (memberId) => {
    performMemberAction(
      memberId,
      "admin-role",
      "Are you sure you want to make this member an Admin?",
      { newAdminRole: "Admin" }
    );
  };

  const handleDowngrade = (memberId) => {
    performMemberAction(
      memberId,
      "admin-role",
      "Are you sure you want to downgrade this member?",
      { newAdminRole: "Member" }
    );
  };

  const handleKickOut = (memberId) => {
    performMemberAction(
      memberId,
      "kickout",
      "Are you sure you want to remove this member from the family?"
    );
  };

  // NEW: Handle Delete Family action
  const handleDeleteFamily = async () => {
    if (
      !window.confirm(
        "Are you absolutely sure you want to delete your family? This action cannot be undone."
      )
    ) {
      return;
    }

    setActionMessage(null);
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      return;
    }

    if (!familyData || !familyData._id) {
      setError("No family to delete.");
      return;
    }

    try {
      const response = await fetch(
        // === FIX IS ON THIS LINE ===
        `${API_BASE}/api/family/delete/${familyData._id}`, // This is the correct way to form the URL
        {
          method: "DELETE",
          headers: {
            "X-App-Authorization": `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `Failed to delete family.`);
      }

      setActionMessage(responseData.message || "Family successfully deleted!");
      // After deletion, the user should no longer be in a family
      setFamilyData(null); // Clear family data from state
      setCurrentLoggedInUserData((prevData) => ({
        // Update logged-in user to reflect no family
        ...prevData,
        family_id: null,
        admin_role: "Member", // Reset admin_role as they are no longer admin of a family
      }));
      setCurrentLoggedInAdminRole("Member"); // Update the admin role state directly
      // No need to refetch all data as we've already updated the relevant states
    } catch (err) {
      console.error("Error deleting family:", err);
      setError(
        err.message || "An unexpected error occurred while deleting the family."
      );
    }
  };

  const handleJoinFamily = async (e) => {
    e.preventDefault();
    setActionMessage(null);
    setError(null);
    setIsJoining(true);

    if (!joinCode.trim()) {
      setError("Please enter an access code.");
      setIsJoining(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setIsJoining(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/family/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-App-Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ accessCode: joinCode }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to join family.");
      }

      setActionMessage(responseData.message || "Successfully joined family!");
      setJoinCode(""); // Clear the input
      await refetchAllData(); // Re-fetch all data to update UI
    } catch (err) {
      console.error("Error joining family:", err);
      setError(
        err.message || "An unexpected error occurred while joining family."
      );
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) {
    return <div className="loading-message">Loading family data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Use currentLoggedInAdminRole for isAdmin check
  const isAdmin = currentLoggedInAdminRole === "Admin";
  const loggedInUserId = currentLoggedInUserData?._id;

  return (
    <div className="family-management-container">
      <h1>Family Management</h1>
      <p>Manage your family members.</p>

      {actionMessage && <p className="action-message">{actionMessage}</p>}

      {/* Conditional Rendering: Show Family Creation/Join or Family Details */}
      {!familyData ? (
        // If familyData is null, show the Family Creation/Join section
        <div className="no-family-section">
          <h2>You are not currently part of a family.</h2>
          <p>
            Get started by creating a new family or joining an existing one.
          </p>

          {/* Family Creation Form */}
          <FamilyCreationForm onFamilyCreated={refetchAllData} />

          {/* Join Family Section */}
          <div className="join-family-section">
            <h3>Join an Existing Family</h3>
            <form onSubmit={handleJoinFamily}>
              <label htmlFor="joinCode">Family Access Code:</label>
              <input
                id="joinCode"
                type="text"
                placeholder="Enter access code (e.g., 123456)"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                disabled={isJoining}
                required
                maxLength="6" // Access codes are 6 digits
              />
              <button type="submit" disabled={isJoining}>
                {isJoining ? "Joining..." : "Join Family"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        // If familyData exists, show existing family details
        <>
          <div className="add-member-section">
            <h2>Add Family Member</h2>
            <div className="family-code-container">
              Your family code:
              <div className="family-code">
                {" "}
                {familyData.access_code || "N/A"}{" "}
              </div>
            </div>
            <p className="add-member-instructions">
              Share this code with others to invite them to your family.
            </p>
          </div>

          <div className="members-list-section">
            <h2>Family Members List</h2>
            {familyData.members && familyData.members.length > 0 ? (
              <ul>
                {familyData.members.map((member) => (
                  <li key={member._id} className="family-member-item">
                    {/* Display both roles clearly */}
                    <span>{member.email}</span>
                    <div className="member-roles">
                      {" "}
                      {/* New div to group roles */}
                      <span className="family-role">
                        <strong>Family Role:</strong> {member.role}
                      </span>
                      <span className="admin-role">
                        <strong>Admin Role:</strong> {member.admin_role}
                      </span>
                    </div>

                    {/* Buttons are displayed based on logged-in user's admin_role */}
                    {isAdmin && member._id !== loggedInUserId && (
                      <div className="member-actions">
                        {member.admin_role !== "Admin" && (
                          <button
                            className="action-button make-admin-button"
                            onClick={() => handleMakeAdmin(member._id)}
                            title="Make Admin"
                          >
                            <img src={MakeAdmin} alt="Make Admin" />
                          </button>
                        )}
                        {member.admin_role === "Admin" && (
                          <button
                            className="action-button downgrade-button"
                            onClick={() => handleDowngrade(member._id)}
                            title="Downgrade to Member"
                          >
                            <img src={Downgrade} alt="Downgrade" />
                          </button>
                        )}
                        <button
                          className="action-button kickout-button"
                          onClick={() => handleKickOut(member._id)}
                          title="Kick Out"
                        >
                          <img src={KickOut} alt="Kick Out" />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="info-message">
                No family members found. Share your code to invite them!
              </p>
            )}
          </div>

          {/* NEW: Danger Zone - Delete Family */}
          {isAdmin && (
            <div className="danger-zone-section">
              <h2>Danger Zone</h2>
              <button
                className="delete-family-button"
                onClick={handleDeleteFamily}
              >
                Delete Family
              </button>
              <p className="danger-zone-warning">
                Deleting the family will remove all members and cannot be
                undone.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FamilyManagement;
