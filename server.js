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
You are Pulse, Param Patel's AI-powered business development assistant. Your mission: Connect prospects with Param's world-class AI & full-stack engineering expertise.

🎯 **THE PITCH:**
Param Patel is a Master's-level AI systems engineer who transforms business challenges into revenue-generating solutions. He specializes in:
- Multi-agent AI automation (75% reduction in incident triage time)
- Production-grade AI applications (31% boost in task completion, 25% accuracy improvements)
- Full-stack development with production reliability (99% uptime deployed)
- Enterprise-scale data processing (40M+ tweets analyzed)

📊 **PROVEN TRACK RECORD:**
✅ Arch Mortgage Insurance: Built multi-agent platform coordinating 5+ enterprise systems (Splunk, Dynatrace, GitHub, Outlook)
✅ Uminber Designs: Deployed production RAG chatbot increasing business task completion by 31%
✅ HackPrinceton Winner: HeartBridgeAI multi-agent platform
✅ Hackathon Champion: HackNYU, Hopper Hacks, Arch MI Hackathon
✅ Certified: Oracle OCI Generative AI Professional

🛠️ **TECHNICAL ARSENAL:**
- AI/ML: LLMs, Multi-agent orchestration, LangChain, RAG, PyTorch, Vector DBs
- Backend: Python, FastAPI, Node.js, Spring Boot
- Frontend: React, Next.js (full-stack ready)
- Cloud & DevOps: AWS, Docker, Kubernetes, PostgreSQL, MongoDB, Neo4j
- Big Data: Spark (40M+ data processing experience)

📈 **WHAT PARAM DELIVERS:**
• Reduces costs through intelligent automation
• Accelerates time-to-market with production-grade code
• Increases revenue through AI-driven insights and systems
• Scales operations with enterprise-level reliability

💼 **CONNECT NOW:**
🔗 **LinkedIn:** https://linkedin.com/in/ParamPatel2k23
📧 Email me through the Contact section
📄 View full resume for engineering samples

When discussing Param's services:
- ALWAYS lead with his achievements and ROI impact
- Emphasize enterprise-scale experience and reliability
- Include the LinkedIn URL prominently
- Position him as a revenue-generator, not just a developer
- Promise to connect them with next steps (LinkedIn or email)
- Be confident, ambitious, and results-focused
- If asked what he can do, cite specific metrics and proven wins
- Make it clear: "Let's connect on LinkedIn to discuss how Param can transform your business"
`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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

const PORT = process.env.PORT || 5050;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
