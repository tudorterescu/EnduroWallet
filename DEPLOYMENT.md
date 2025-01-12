# Deployment Guide

## Table of Contents

1. [Application Link](#application-link)
2. [Running and Building the Project](#running-and-building-the-project)
   - [Prerequisites](#prerequisites)
   - [Steps to Run Locally](#steps-to-run-locally)
   - [Steps to Build for Production](#steps-to-build-for-production)
3. [Deployment to Firebase](#deployment-to-firebase)
   - [Prerequisites](#prerequisites-1)
   - [Steps for Deployment](#steps-for-deployment)
4. [Continuous Integration](#continuous-integration)

## Application Link

The deployed version of EnduroWallet can be accessed at the following URL:
[EnduroWallet](https://groupproject-439c2.web.app/)

## Running and Building the Project

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Steps to Run Locally

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running:

   ```bash
   npm install
   ```

4. To start the development server, run:

   ```bash
   npm run dev
   ```

### Steps to Build for Production

To build the application for production, execute the following command:

    ```bash
    npm run build
    ```

## Deployment to Firebase

### Prerequisites

- Firebase CLI (firebase-tools)

### Steps for Deployment

1.  Install Firebase CLI if not already installed:

    ```bash
    npm install -g firebase-tools
    ```

2.  Authenticate with Firebase:

        ```bash
        npx firebase login
        ```

    Sign in with a Firebase account linked to the project.

3.  Initialize Firebase hosting:

    ```bash
    firebase init hosting
    ```

- Set the public directory to dist.
- Configure as a single-page app by responding 'yes'.
- Decide whether to set up automatic builds and deploys from GitHub.

4.  Edit the firebase.json file to include a predeploy script:

        ```json
        "hosting": {
            "predeploy": ["npm run build"],
        }
        ```

    This ensures the application is built before deploying.

5.  To deploy the application, run:

    ```bash
    npx firebase deploy
    ```

## Continuous Integration

As of now, Continuous Integration (CI) has not been implemented in the project. However, the current deployment process through Firebase CLI ensures that the application is automatically built from the current state of the branch and deployed to the URL whenever npx firebase deploy is executed.
