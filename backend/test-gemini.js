import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyAW80MjAWA6CXItCxBmg8M_ejqqH4YES4A";
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent("Write a one-liner joke about coding");
    const response = await result.response;
    console.log(response.text());
  } catch (error) {
    console.error("Error calling Gemini API:", error);
  }
}

run();
