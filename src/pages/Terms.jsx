import { useContext, useEffect, useState } from "react";
import PageLayout from "../components/App/PageLayout";
import { Stack, Avatar } from "@mui/material";
import noNotfiy from "../assets/noNotify.svg";
import axios from "axios";
import { URL } from "../data";
import { CarContext } from "../components/context/CarContext";
import login from "../assets/login.svg";
import AddIcon from "@mui/icons-material/Add";

const Terms = ({ f7router }) => {
  const { setAuthOpen, auth } = useContext(CarContext);

  return (
    <PageLayout title={"Terms and  Condition"} f7router={f7router} type="type3">
      <ul
        className="p-4 flex flex-col gap-4"
        style={{
          // background: "#EEF7F0",
          listStyleType: "decimal",
          borderTopRightRadius: "10px",
          borderTopLeftRadius: "10px",
          borderTop: "1px solid #f4f0f0",
        }}
      >
        <h3 style={{ fontWeight: "600", fontSize: "16px" }}>Terms of Use</h3>
        <li style={{ fontWeight: "600", fontSize: "16px", marginLeft: "10px" }}>
          ACCEPTANCE OF THE TERMS
        </li>
        <p>
          These Terms of Use (the “Terms”) constitute a binding and enforceable
          legal contract between Mango Cars Nigeria Limited, its affiliated
          companies (together, the “Administrator”, “we”, “us”) and you. Please
          read these Terms carefully. Your access and use of the mangocars.co
          website and mobile applications, as well as any service, content, and
          data available via them (together, the “Service” or the “Platform”)
          are governed by these Terms. If you do not agree with any part of
          these Terms, or if you are not eligible or authorized to be bound by
          the Terms, then do not access or use the Service. Please also review
          our Privacy Policy. The terms of the Privacy Policy and other
          supplemental terms, rules, policies, or documents that may be posted
          on the Platform from time to time are hereby expressly incorporated
          herein by reference. We reserve the right, in our sole discretion, to
          make changes or modifications to these Terms at any time and for any
          reason with or without prior notice.
        </p>
        <li style={{ fontWeight: "600", fontSize: "16px", marginLeft: "10px" }}>
          IMPORTANT DISCLAIMERS
        </li>
        <ul style={{ listStyleType: "initial", marginLeft: "15px" }}>
          <li>
            {" "}
            ALL SERVICES RENDERED BY THE ADMINISTRATOR ARE RENDERED “AS IS”, “AS
            AVAILABLE” AND “WITH ALL FAULTS”, AND THE ADMINISTRATOR DISCLAIMS
            ALL WARRANTIES, EXPRESSED OR IMPLIED, INCLUDING WITHOUT LIMITATION
            ANY GUARANTEES REGARDING CONDITION, QUALITY, LIFE DURATION,
            PERFORMANCE, ACCURACY, RELIABILITY, COMMERCIAL VALUE AND SUITABILITY
            FOR SPECIFIC PURPOSES. ALL SUCH WARRANTIES AND LIABILITIES ARE
            HEREBY EXCLUDED.
          </li>
          <li className="mt-2">
            {" "}
            ADMINISTRATOR HAS NO CONTROL OVER AND DOES NOT GUARANTEE THE
            EXISTENCE, QUALITY, SAFETY OR LEGALITY OF GOODS AND SERVICES
            PUBLISHED BY USERS ON THE PLATFORM; THE TRUSTWORTHINESS OR ACCURACY
            OF INFORMATION PROVIDED BY USERS IN THE ANNOUNCEMENTS; THE ABILITY
            OF SELLERS TO SELL GOODS OR TO PROVIDE SERVICES; THE ABILITY OF
            BUYERS TO PAY FOR GOODS OR SERVICES; OR THAT A USER WILL ACTUALLY
            COMPLETE A TRANSACTION. ADMINISTRATOR MAKES NO GUARANTEES CONCERNING
            THAT MANUFACTURING, IMPORT, EXPORT, OFFER, DISPLAYING, PURCHASE,
            SALE, ADVERTISING AND/OR USE OF PRODUCTS OR SERVICES, WHICH ARE
            OFFERED OR DISPLAYED ON THE PLATFORM DO NOT INFRINGE ANY THIRD
            PARTIES’ RIGHTS. THEREFORE, ADMINISTRATOR EXPRESSLY DISCLAIMS ANY
            LIABILITY IN CONNECTION TO MATERIALS AND INFORMATION POSTED BY USERS
            ON THE PLATFORM. YOU ARE ENCOURAGED TO CHECK THE GOODS BEFORE
            PAYMENT AND TO REQUEST THE SELLER TO PROVIDE DOCUMENTS CONFIRMING
            COMPLIANCE OF THE GOODS WITH APPLICABLE REQUIREMENTS OF LAWS,
            REGULATIONS, RULES, GUIDELINES, STANDARDS.
          </li>
          <li className="mt-2">
            {" "}
            YOU ACKNOWLEDGE THAT YOU ARE SOLELY RESPONSIBLE FOR YOUR SAFETY AND
            YOU UNDERSTAND THAT YOU SHOULD MEET WITH OTHER INDIVIDUALS FOR
            COMPLETION OF A TRANSACTION ONLY IN SAFE PUBLIC PLACES IN DAYLIGHT
            HOURS. YOU ARE SOLELY RESPONSIBLE FOR CONDUCTING DUE DILIGENCE OF
            ANY INDIVIDUAL OR ORGANIZATION REQUESTING A MEETING TO CONDUCT A JOB
            INTERVIEW OR TO COMPLETE A TRANSACTION. ADMINISTRATOR DISCLAIMS ANY
            RESPONSIBILITY FOR USER’S INTERACTION WITH ANY INDIVIDUAL OR
            ORGANIZATION.
          </li>
        </ul>
        <li style={{ fontWeight: "600", fontSize: "16px", marginLeft: "10px" }}>
          ACCOUNT REGISTRATION{" "}
        </li>
        <p>
          In order to use certain features of the Service you may need to
          register an account on the Platform (the “Account”) and provide
          certain information about yourself as prompted by the registration
          form. You may create an Account as an individual or as an authorized
          representative of a company You can register only one Account. If more
          than one person accesses its Account from the same device, we may
          request to upload the proof of identity to avoid duplicate accounts.
        </p>
      </ul>
      {/* <DeliveryModal
        handleClose={handleClose}
        open={open}
        notification={selectedNotification}
      /> */}
    </PageLayout>
  );
};

export default Terms;
