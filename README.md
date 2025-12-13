# AI Health Chains – Frontend Implementation

## Overview

This project is a frontend implementation for **AI Health Chains**, a Web3-enabled healthcare data management platform.
The goal of this assessment was to complete the React frontend by filling in the provided TODO sections while integrating with an existing backend API and MetaMask for blockchain-related functionality.

All work was completed **exclusively in the frontend**, as instructed.
The backend, API logic, and provided scaffolding components were not modified.

---

## Implementation Summary

### General Approach

- Implemented all required features using the existing project structure and CSS
- Focused on correctness, clarity, and user experience rather than over-engineering
- Followed a consistent pattern for data fetching, loading states, and error handling
- Avoided console logging in favor of user-facing error states
- Ensured the application works with MetaMask both connected and disconnected

---

## Feature Breakdown

### 1. Patient List

- Fetches paginated patients from the API
- Implements debounced search input
- Displays patients in a card-based grid layout
- Supports pagination
- Patient cards are clickable and navigate to patient detail view

API:
GET /api/patients?page=&limit=&search=

---

### 2. Patient Detail

- Fetches and displays patient information
- Fetches and displays patient medical records
- Formats dates for readability
- Medical records support expandable descriptions
- Record types and statuses are visually distinguished

API:
GET /api/patients/:id  
GET /api/patients/:id/records

---

### 3. Consent Management

- Fetches and displays consents with status filtering
- Supports consent creation using MetaMask signatures
- Uses the provided useWeb3 hook to sign messages
- Supports updating consent status (pending → active)
- Displays blockchain transaction hashes

Message format:
I consent to: {purpose} for patient: {patientId}

API:
GET /api/consents  
POST /api/consents  
PATCH /api/consents/:id

---

### 4. Transaction History

- Fetches blockchain transactions
- Filters transactions by connected wallet address
- Truncates wallet addresses and hashes
- Formats timestamps into readable dates
- Displays transactions in a clean card layout

API:
GET /api/transactions?walletAddress=&limit=20

---

### 5. Statistics Dashboard

- Fetches platform statistics
- Displays metrics in a responsive grid layout
- Highlights key metrics for visual hierarchy

Metrics shown:
- Total Patients
- Total Records
- Total Consents
- Active Consents
- Pending Consents
- Total Transactions

API:
GET /api/stats

---

## Running the Project

Backend:
cd backend
npm install
npm start

Frontend:
cd frontend
npm install
npm start

---

## Notes

- Backend code was not modified
- WalletConnection was not modified
- Existing CSS files were reused
- All required TODO sections were completed
