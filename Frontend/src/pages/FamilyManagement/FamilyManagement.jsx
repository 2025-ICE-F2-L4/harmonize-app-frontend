import React from "react";
import { useState } from "react";

import MakeAdmin from "../../assets/icons/upgrade.svg";
import Downgrade from "../../assets/icons/down-arrow.svg";
import KickOut from "../../assets/icons/kick-out.svg";

import "./FamilyManagement.css";

const FamilyManagement = () => {

    const [familyCode, setFamilyCode] = useState("00000");
    const familyrole = "Admin"; // This should be fetched from the server

    return (
        <div>
            <h1>Family Management</h1>
            <p>Manage your family members.</p>
            <div>
                <h2>Add Family Member</h2>
                <div className="family-code-container">
                    Your family code:
                    <div className="family-code"> {familyCode} </div>
                </div>
            </div>
            <div>
                <h2>Family Members List</h2>
                {/* This will be replaced with actual family members data */}
                <ul>
                    <li>John Doe - {familyrole} <button className="upgrade-member-button"><img src={ MakeAdmin }/> </button> <button className="downgrade-member-button"><img src={ Downgrade }/> </button> <button className="delete-member-button">  <img src={KickOut}/> </button></li>
                    <li>Jane Doe - {familyrole} <button className="upgrade-member-button"><img src={ MakeAdmin }/> </button> <button className="downgrade-member-button"><img src={ Downgrade }/> </button> <button className="delete-member-button">  <img src={KickOut}/> </button></li>
                </ul>
            </div>
        </div>
    );
}
 
export default FamilyManagement;