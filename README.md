# 🚀 Serverless API & Automated Quality Gate (SDET)

This project demonstrates a modern, enterprise-grade SDET workflow. It features a serverless backend deployed on AWS, validated by a multi-layered Playwright test suite, and fully automated via a GitHub Actions CI/CD pipeline.

## 🛠️ Tech Stack
* **Backend:** Python 3.12, AWS Lambda, DynamoDB.
* **Infrastructure:** AWS SAM (Serverless Application Model).
* **Testing:** Playwright (API & E2E), Node.js.
* **CI/CD:** GitHub Actions.

## 🏗️ Architecture
The pipeline follows a "Shift-Left" approach:
1.  **Code Push:** Triggered on every push to `main`.
2.  **Infrastructure as Code:** AWS SAM builds and deploys the stack to AWS.
3.  **Automated Validation:** Playwright executes API contract tests and E2E flows against the live AWS environment.
4.  **Artifact Management:** Test reports and traces are uploaded on failure for rapid debugging.

## 🧪 Testing Strategy
* **API Testing:** Validates JSON schema integrity, status codes (201/400/500), and DynamoDB persistence.
* **Reliability:** Implements auto-waiting and trace-viewer analysis to eliminate flakiness.
* **Security:** Utilizes GitHub Repository Secrets to manage AWS IAM credentials securely.

## 🚀 How to Run Locally
1.  Clone the repo.
2.  Install dependencies: `npm install` and `pip install -r requirements.txt`.
3.  Build: `sam build`.
4.  Test: `npx playwright test`.