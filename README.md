## AI_TESTER


In this project, I was working to build a web application that retrieves and displays interesting facts and recent events about any location using Google's Generative AI.

## Backend Development:
- Technology Used: Node.js, Express, Google Generative AI, REST API
- Description: As the backend developer, I built a REST API using Express that serves as the communication layer between the frontend and Google’s Generative AI model. The backend processes user requests, queries the AI model, and returns information about locations. 

**Key tasks included:**

- API Integration: Integrated Google's Generative AI to retrieve dynamic content based on location data, using the AI model (gemini-1.5-pro).
- Routing and Logic: Designed endpoints to handle user queries (/locationInfo), processed POST requests, and handled error scenarios such as missing data or server errors.
- Data Management: Implemented in-memory data storage using a dictionary (searchResults) to store search results and allow users to retrieve information via unique IDs.
- Error Handling: Managed errors gracefully, logging issues and sending informative error messages back to the client.
- Example: I developed the /locationInfo endpoint where the backend fetches interesting facts about a user-provided location using Google's AI. The server processes the user's input and returns relevant details like recent events and unique facts about the location.

##  Frontend Integration:
- Technology Used: HTML, CSS, JavaScript (DOM manipulation)
- Description: The backend API was integrated with a user-friendly interface where users can input a location and receive results in real time.
- Form Submission and Data Display: Users can submit a location, and the frontend sends a POST request to the server. The response is processed and displayed on the web page, with facts about the location being listed dynamically.
- Error Handling on Frontend: Added features to display error messages if the location is invalid or if there is an issue with data fetching.
- Example: On the frontend, after a user inputs a location, a list of facts about the area is displayed in a card-like format. The application processes responses and splits the data into individual facts using JavaScript, rendering it in the form of bullet points.

## Data Analysis:
- Technology Used: Google Generative AI
- Description: I handled the generation and presentation of factual information about locations, analyzing and validating the data returned by Google’s AI model. My role included:
- Data Extraction: Retrieved structured responses from the AI, ensuring accuracy and relevance to the requested location.
-  Formatting: Cleaned and formatted the AI-generated content into a user-friendly format for display, ensuring the data was easy to understand and navigate.
- Example: I designed logic to parse the output from Google’s AI model, split facts using asterisks (*), and present them as individual bullet points in a structured way on the frontend.
