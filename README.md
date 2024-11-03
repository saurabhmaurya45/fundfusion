# FundFusion
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <img width="45%" alt="1" src="https://github.com/user-attachments/assets/e40ffb45-5c65-4636-ad83-4da386521209" style="display: inline-block; margin: 2.5%;">
    <img width="45%" alt="2" src="https://github.com/user-attachments/assets/67521d43-98d1-4f34-b59d-73b0fba5179c" style="display: inline-block; margin: 2.5%;">
    <img width="45%" alt="3" src="https://github.com/user-attachments/assets/a5609741-427f-44c1-8434-8ca953b1294c"style="display: inline-block; margin: 2.5%;">
    <img width="45%" alt="4" src="https://github.com/user-attachments/assets/8c67f6d5-357f-4f74-a2f8-1ff33f9dd867" style="display: inline-block; margin: 2.5%;">
    <img width="45%" alt="5" src="https://github.com/user-attachments/assets/19c79ec5-adc4-4a84-9392-bd56245cb8ad" style="display: inline-block; margin: 2.5%;">
    <img width="45%" alt="6" src="https://github.com/user-attachments/assets/164a6829-0ab6-4e05-8af4-df661d24297a" style="display: inline-block; margin: 2.5%;">
    <img width="45%" alt="7" src="https://github.com/user-attachments/assets/8b65c5b6-9def-47da-9d68-3e139bed8189" style="display: inline-block; margin: 2.5%;">
    <img width="45%" alt="8" src="https://github.com/user-attachments/assets/07cf9e14-f0cc-4904-9244-3b9e121635b0" style="display: inline-block; margin: 2.5%;">
</div>


[![GitHub](https://img.shields.io/badge/GitHub-FundFusion-green)](https://github.com/saurabhmaurya45/FundFusion)

**FundFusion** is a decentralized fundraising platform designed to connect startups and potential funders in a transparent, secure, and accessible way using blockchain technology. The platform enables companies to showcase their projects, and funders can invest in ideas they find promising. Built on a decentralized blockchain network, FundFusion ensures secure transactions and real-time project updates.

## 🌐 Project Overview

**Profiles**:  
- **Company**: Companies can register, create a profile, and list their projects to seek funding.
- **Funder**: Funders can explore projects, view details, and invest in those they support.

## 🍕 Features

✅ **User Registration & Login**: Secure authentication for companies and funders.  
✅ **Profile Management**: Companies can manage profiles, view projects, and track funding status.  
✅ **Dashboard**: A personalized dashboard to access project and funding information.  
✅ **Project Creation**: Companies can create and showcase new projects.  
✅ **Funding**: Funders can contribute to projects, with transactions recorded on the blockchain.  
✅ **Funder Details**: Display funder information for transparency.  
✅ **Project Listings**: View all projects, personal projects, and filter by status (active or completed).  
✅ **Status Tracking**: Monitor project status, showing if it's ongoing or has reached its deadline.  
✅ **Role-Based Access**: Differentiated access for companies and funders, ensuring secure data handling.  
✅ **Error Handling**: Robust error handling to ensure smooth operation and feedback.

## ⚙ Technology Stack

### Frontend

- **React**: JavaScript library for building dynamic UIs.
- **React Router**: For managing navigation and routes within the application.
- **Redux**: Manages and centralizes application state.
- **Web3.js**: Facilitates interaction with the blockchain network.

### Backend / Blockchain

- **ThirdWeb SDK**: Simplifies interaction with blockchain assets.
- **Solidity**: Smart contract language used to create secure blockchain transactions.
- **Hardhat**: Development environment for compiling, testing, and deploying Solidity contracts.
- **IPFS**: Decentralized storage for secure and tamper-resistant data storage.

## 🚀 Getting Started

### Installation and Setup

To set up FundFusion locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/saurabhmaurya45/FundFusion.git
    cd FundFusion
    ```

2. **Install Dependencies**:

    Ensure [Node.js](https://nodejs.org/) is installed, then run:

    ```bash
    npm install
    ```

3. **Configure Environment Variables**:

    Set up your environment variables in a `.env` file with the following information:

    ```plaintext
    REACT_APP_THIRDWEB_API_KEY=your_thirdweb_api_key
    REACT_APP_INFURA_PROJECT_ID=your_infura_project_id
    REACT_APP_BLOCKCHAIN_NETWORK=your_blockchain_network
    ```

4. **Run the Development Server**:

    ```bash
    npm start
    ```

    Open [http://localhost:3000](http://localhost:3000) to view the application.

5. **Compile and Deploy Contracts**:

    Use Hardhat to compile and deploy Solidity contracts:

    ```bash
    npx hardhat compile
    npx hardhat run scripts/deploy.js --network your_network
    ```

6. **IPFS Integration**:

    Use IPFS for decentralized storage of project files. Configure IPFS and add files as needed.

## 💡 Key Concepts

- **Blockchain Security**: Transactions and data are secured through blockchain, providing transparency and immutability.
- **Smart Contracts**: Utilizes Solidity contracts to manage transactions and enforce terms between companies and funders.
- **Decentralized Data**: IPFS ensures that all project data is securely stored in a decentralized manner.


## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

We hope FundFusion helps bridge the gap between visionary startups and supportive funders!
