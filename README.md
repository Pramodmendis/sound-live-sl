# SOUND-LIVE-SL

_Empowering Events with Seamless Booking Solutions_

![Last Commit](https://img.shields.io/badge/last_commit-today-brightgreen) 
![Project Status](https://img.shields.io/badge/status-99.9%25-blue) 
![Languages](https://img.shields.io/badge/languages-3-lightgrey)

_Built with the tools and technologies:_

![Express](https://img.shields.io/badge/Express-000?logo=express)
![JSON](https://img.shields.io/badge/JSON-000000?logo=json)
![Markdown](https://img.shields.io/badge/Markdown-000000?logo=markdown)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose)
![ENV](https://img.shields.io/badge/.ENV-8DD6F9?logo=dotenv)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs)
![React](https://img.shields.io/badge/React-61DAFB?logo=react)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios)

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Note](#note)

---

## Overview

Sound Live is a powerful event management tool designed to streamline the booking process for sound equipment, studio sessions, and live bands.

### Why Sound Live?

This project serves as a comprehensive solution for managing events and bookings efficiently. The core features include:

- 🎤 **Comprehensive Management**: A centralized platform for sound equipment, studio sessions, and live band bookings.
- 💳 **Integrated Payments**: Seamless online payment capabilities to enhance the booking experience.
- 📊 **Analytics & Insights**: Slot-based bookings and analytics for better resource management.
- 👨‍💻 **User-Friendly Interface**: Simplified navigation for both clients and administrators.
- 🙋‍♂️ **Profile Management**: Personalized experiences for users with efficient account handling.

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language**: JavaScript
- **Package Manager**: Npm

---

### Installation

Build sound-live-sl from the source and install dependencies:

1. **Clone the repository**:

```bash
git clone https://github.com/pramodmendis/sound-live-sl
```

Or, Extract the ZIP file

2. **Navigate to the backend directory**:
   ```bash
   > cd sound-live-sl-main/backend
   ```

3. **Install the dependencies**:
   ```bash
   > npm install
   ```

4. **Navigate to the frontend directory**:
   ```bash
   > cd sound-live-sl-main/frontend
   ```

5. **Install the dependencies**:
   ```bash
   > npm install
   ```

### Usage

1. **Run the backend of the project with**:
   ```bash
   npm run dev
   ```

2. **Run the frontend of the project with**:
   ```bash
   npm start
   ```

---

### Note

- The PayHere sandbox integration was fully functional until mid-May 2025. However, due to an unexpected issue with the PayHere sandbox environment (likely from PayHere’s side), live payment simulation stopped working consistently.
- This issue was communicated and clarified with the project supervisor during the Viva presentation on [22nd of May 2025].
- All payment logic, invoice generation, and booking confirmation flows are correctly implemented and can be tested with real credentials or when the sandbox resumes normal function.


* Default Login Credentials:

Client Test Account:
  Email: induwaramendis001@gmail.com
  Password: 1234567890

Admin Test Account:
  Email: super@soundlive.com
  Password: Super@1234 (Super admin)

Note:
- These accounts are already created in the database for demo purposes.
- You can log in and test full booking, profile, and admin functionalities using the above credentials.
