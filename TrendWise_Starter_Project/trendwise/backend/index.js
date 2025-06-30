
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const { Configuration, OpenAIApi } = require('openai')
const getTrendingTopics = require('./trends')

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}))

app.post('/generate', async (req, res) => {
  const { topic } = req.body
  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [{ role: "user", content: `Write an SEO article about: ${topic}` }],
  })
  res.json({ content: response.data.choices[0].message.content })
})

app.get('/api/trends', async (req, res) => {
  try {
    const topics = await getTrendingTopics()
    res.json({ topics })
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trends" })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
