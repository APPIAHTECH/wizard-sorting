# Wizard Sorting

This project is a Vue.js application that simulates a chat-like interface to sort students into four different houses based on their personalities. The sorting is conducted by a virtual sorting hat that asks a series of questions to determine the most suitable house for each user.

## Overview

The app is designed to be visually appealing and maintainable, leveraging Vue 3 and Vite. It incorporates animations for a smooth user experience and responds to various screen sizes.

### Key Features
- **Interactive Chat Interface**: Engages users in a conversation to determine their suitable house.
- **Dynamic Scoring System**: Utilizes a matching score for each house based on user responses to questions.
- **Responsive Design**: Works seamlessly across devices with varying screen sizes.
- **Smooth Animations**: Questions and answers transition smoothly, enhancing user interaction.
- **Unit Testing with Vite**: Comprehensive unit tests ensure the reliability and correctness of the application.
- **End-to-End Testing with Cypress**: E2E tests validate the overall functionality and user experience of the application.

### Functional Specifications
- Asks the user's name.
- Presents sorting hat questions based on a JSON file containing questions and scoring.
- Computes the user's house based on the scores accumulated from their responses.

### Browser Compatibility
The app is designed to work flawlessly on:
- Safari on iPhone
- Firefox on Windows or Linux

### Live Demo
You can test the application in real-time at [Wizard Sorting Live Demo](https://wizard-sorting.onrender.com/chat).

---

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```


## Contributing

We welcome contributions to enhance the functionality and usability of the Rocket Launch Telegram Bot. Please follow the guidelines below to ensure a smooth collaboration process.

### How to Contribute

1. **Fork the Repository**:
    - Click on the "Fork" button at the top right corner of the repository page to create a personal copy of the project.

2. **Clone Your Fork**:
    - Clone your forked repository to your local machine using the command:
      ```bash
      git clone https://github.com/your-username/your-forked-repo.git
      ```
    - Replace `your-username` and `your-forked-repo` with your GitHub username and the name of the repository.

3. **Create a New Branch**:
    - Before making changes, create a new branch for your feature or bug fix:
      ```bash
      git checkout -b feature/my-new-feature
      ```

4. **Make Changes**:
    - Implement your feature or fix the bug. Ensure that your code adheres to the project's coding standards.

5. **Write Tests**:
    - Add unit tests to verify that your changes work as expected and do not break existing functionality.

6. **Commit Your Changes**:
    - After making your changes, commit them with a descriptive message:
      ```bash
      git commit -m "Add a new feature or fix a bug"
      ```

7. **Push to Your Fork**:
    - Push your changes back to your forked repository:
      ```bash
      git push origin feature/my-new-feature
      ```

8. **Create a Pull Request**:
    - Go to the original repository where you want to propose your changes. Click on "Pull Requests" and then "New Pull Request."
    - Select your branch and provide a description of the changes you made. Submit the pull request for review.

### Code Style Guidelines

- Follow PEP 8 guidelines for Python code style.
- Ensure that your code is well-documented, including docstrings for classes and methods.

### Issues and Feature Requests

If you encounter any issues or have feature requests, please open an issue in the repository. Be as detailed as possible to help us understand and address your concerns effectively.

### Thank You!

We appreciate your interest in contributing to the Rocket Launch Telegram Bot. Your contributions help improve the project and benefit the community!
