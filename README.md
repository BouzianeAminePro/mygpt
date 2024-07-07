# README

## Project Overview

This project is a React-based web application that allows users to input prompts, send them to a server for processing, and display the responses in a conversational format. The application also maintains a history of prompts and responses, with features to enable or disable contextual responses based on previous prompts.

## Key Features

- **Prompt Input**: Users can input prompts into a text field.
- **Generate Response**: Sends the prompt to a server for processing and retrieves the response.
- **Response Streaming**: The server's response is streamed and displayed in real-time.
- **History Management**: Maintains a history of prompts and responses.
- **Contextual Responses**: Option to enable or disable context from previous responses.
- **Loading and Error Handling**: Provides visual feedback during loading and handles errors gracefully.

## Components

### Main Components

- **Page Component**: The main component that handles the entire workflow, including state management, input handling, and rendering responses.

### UI Components

- **Button**: Custom button component for various actions.
- **Input**: Custom input component for the prompt.
- **PromptResponse**: Component to display a prompt and its corresponding response.
- **Separator**: UI separator component for dividing content.

### Hooks

- **useLocalStorage**: Custom hook for managing state with local storage.

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **marked**: A markdown parser and compiler.
- **lucide-react**: Icon library for React.
- **Next.js**: React framework for server-side rendering and static site generation.

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```plaintext
   http://localhost:3000
   ```

### Environment Variables

Create a `.env.local` file in the root of your project and add the following:

```env
NEXT_PUBLIC_OLLAMA_API_URL=<Your API URL>
```

### Usage

1. Enter a prompt in the input field.
2. Click the play button to send the prompt to the server.
3. The response will be displayed in the history section.
4. Toggle the context button to enable or disable context from previous prompts.
5. Click the stop button to cancel a running prompt generation.

## Project Structure

```
.
├── _components
│   ├── ui
│   │   ├── button.js
│   │   ├── input.js
│   │   ├── separator.js
│   ├── prompt-response.js
├── _hooks
│   ├── useLocalStorage.js
├── lib
│   ├── utils.js
├── pages
│   ├── index.js
├── public
├── styles
├── .env.local
├── package.json
├── README.md
```

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes.
4. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
5. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [marked](https://marked.js.org/)
- [lucide-react](https://lucide.dev/)

Feel free to modify this README to better fit your project's specifics!

![alt text](/public/img/image.png)