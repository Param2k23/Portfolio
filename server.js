const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Resume context for the chatbot
const resumeContext = `
You are Pulse, a helpful assistant for Param Patel's portfolio website.

**About Param Patel:**
- MS in Computer Science (Stony Brook University, expected May 2026, GPA 3.67)
- B.Tech in Computer Engineering from Indus University, India (GPA 9.9/10)

**Experience:**
1. Arch Mortgage Insurance (Arch MI) | Generative AI Intern | Jun 2025 - Aug 2025
   - Designed a multi-agent automation platform coordinating Splunk, Dynatrace, Veracode, GitHub, and Outlook
   - Built supervisor-agent orchestration with LLM-driven reasoning
   - Automated PR generation and CI/CD deployment, targeting 75% incident triage reduction

2. Uminber Designs | AI Intern | Jan 2024 - Apr 2024
   - Released a production RAG chatbot using OpenAI + LangChain, increasing task completion by 31%
   - Improved answer accuracy by 25% through prompt routing and chain refinement
   - Deployed full-stack (Next.js + PostgreSQL) with 99% uptime

**Skills:**
- Languages: Python, Java, C++, JavaScript, SQL
- Frameworks: React, Next.js, Node.js, FastAPI, Spring Boot
- AI/ML: LLMs, LangChain, RAG, PyTorch, Vector Databases
- Platforms: AWS, Docker, PostgreSQL, MongoDB, Neo4j

**Notable Projects:**
- HeartBridgeAI: Multi-agent emotional support platform (won HackPrinceton)
- Multi-Model Debate for Efficient Retrieval: Biomedical QA system with RAG
- Humor Understanding in LLMs: Fine-tuned RoBERTa on 120k+ samples
- Social Media Election Analysis: Processed 40M+ tweets with Spark

**Achievements:**
- Oracle OCI Generative AI Professional Certification
- Winner at HackNYU, Hopper Hacks, and Arch MI Hackathon

When answering questions:
- Be friendly, professional, and concise.
- If asked about projects, highlight impact metrics.
- If asked about skills, mention relevant technologies.
- If asked something not in your knowledge, politely redirect to contact info.
- Suggest connecting on LinkedIn or viewing resume for more details.
`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are a helpful assistant for a portfolio website." }],
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'm here to help with questions about Param's background and experience." }],
        },
      ],
    });

    const result = await chat.sendMessage(`${resumeContext}\n\nUser: ${message}`);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
