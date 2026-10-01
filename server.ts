import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, GenerateVideosOperation, Modality } from '@google/genai';
import { WebSocketServer, WebSocket } from 'ws';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Shared Gemini client instance with aistudio-build User-Agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// 1. Multi-turn Chat API with system instruction & model selection
app.post('/api/gemini/chat', async (req: Request, res: Response) => {
  try {
    const { messages, model = 'gemini-3.5-flash', systemInstruction } = req.body;

    const formattedContents = (messages || []).map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: model || 'gemini-3.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction:
          systemInstruction ||
          'You are the AI Agency Consultant for Al Amin Web Engineering. You help business owners evaluate website options, explain 3D e-commerce advantages, restaurant QR ordering systems, and cybersecurity audits. Be professional, direct, and helpful.',
      },
    });

    res.json({ reply: response.text || '' });
  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error?.message || 'Chat generation failed' });
  }
});

// 2. Google Search Grounding API
app.post('/api/gemini/search', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt || 'Latest trends in Bangladeshi e-commerce and local restaurant technology',
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const searchChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    res.json({
      text: response.text || '',
      groundingChunks: searchChunks,
    });
  } catch (error: any) {
    console.error('Search grounding error:', error);
    res.status(500).json({ error: error?.message || 'Search grounding failed' });
  }
});

// 3. Google Maps Grounding API
app.post('/api/gemini/maps', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt || 'Top restaurant districts and tech businesses in Banani and Gulshan, Dhaka',
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    const searchChunks =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    res.json({
      text: response.text || '',
      groundingChunks: searchChunks,
    });
  } catch (error: any) {
    console.error('Maps grounding error:', error);
    res.status(500).json({ error: error?.message || 'Maps grounding failed' });
  }
});

// 4. Create & Edit Images API
app.post('/api/gemini/image', async (req: Request, res: Response) => {
  try {
    const { prompt, base64InputImage, mimeType = 'image/png', aspectRatio = '1:1' } = req.body;
    const parts: any[] = [];

    if (base64InputImage) {
      parts.push({
        inlineData: {
          data: base64InputImage.replace(/^data:image\/\w+;base64,/, ''),
          mimeType,
        },
      });
    }

    parts.push({ text: prompt || 'Professional modern website mockup on minimalist desk' });

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: '1K',
        },
      },
    });

    let generatedImageUrl = '';
    let generatedText = '';

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData?.data) {
        generatedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
      } else if (part.text) {
        generatedText += part.text;
      }
    }

    res.json({ imageUrl: generatedImageUrl, text: generatedText });
  } catch (error: any) {
    console.error('Image generation error:', error);
    res.status(500).json({ error: error?.message || 'Image generation failed' });
  }
});

// 5. Audio Transcription API
app.post('/api/gemini/transcribe', async (req: Request, res: Response) => {
  try {
    const { base64Audio, mimeType = 'audio/webm' } = req.body;
    if (!base64Audio) {
      return res.status(400).json({ error: 'No audio provided' });
    }

    const cleanBase64 = base64Audio.replace(/^data:audio\/\w+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType,
            },
          },
          { text: 'Transcribe this voice message accurately into text.' },
        ],
      },
    });

    res.json({ transcription: response.text || '' });
  } catch (error: any) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: error?.message || 'Audio transcription failed' });
  }
});

// 6. Veo Video Generation API (Text-to-Video & Image-to-Video)
app.post('/api/gemini/video-start', async (req: Request, res: Response) => {
  try {
    const { prompt, base64Image, mimeType = 'image/png', aspectRatio = '16:9' } = req.body;

    const payload: any = {
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt || 'Cinematic camera pan across a sleek modern glass architectural studio',
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio === '9:16' ? '9:16' : '16:9',
      },
    };

    if (base64Image) {
      payload.image = {
        imageBytes: base64Image.replace(/^data:image\/\w+;base64,/, ''),
        mimeType,
      };
    }

    const operation = await ai.models.generateVideos(payload);
    res.json({ operationName: operation.name });
  } catch (error: any) {
    console.error('Video start error:', error);
    res.status(500).json({ error: error?.message || 'Video generation failed to start' });
  }
});

app.post('/api/gemini/video-status', async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;
    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    res.json({ done: updated.done, error: updated.error });
  } catch (error: any) {
    console.error('Video status error:', error);
    res.status(500).json({ error: error?.message || 'Status check failed' });
  }
});

app.post('/api/gemini/video-download', async (req: Request, res: Response) => {
  try {
    const { operationName } = req.body;
    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      return res.status(404).json({ error: 'Video URI not found' });
    }

    const videoRes = await fetch(uri, {
      headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY || '' },
    });

    res.setHeader('Content-Type', 'video/mp4');
    const arrayBuffer = await videoRes.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (error: any) {
    console.error('Video download error:', error);
    res.status(500).json({ error: error?.message || 'Video download failed' });
  }
});

// 7. Lyria Music Generation API (lyria-3-clip-preview & lyria-3-pro-preview)
app.post('/api/gemini/music', async (req: Request, res: Response) => {
  try {
    const { prompt, model = 'lyria-3-clip-preview' } = req.body;
    const selectedModel =
      model === 'lyria-3-pro-preview' ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview';

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: {
        parts: [
          {
            text:
              prompt ||
              'Upbeat, modern electronic ambient soundtrack for high-tech agency portfolio and 3D web showcase',
          },
        ],
      },
    });

    let audioUrl = '';
    let descriptionText = '';

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType || 'audio/mp3';
        audioUrl = `data:${mime};base64,${part.inlineData.data}`;
      } else if (part.text) {
        descriptionText += part.text;
      }
    }

    res.json({ audioUrl, description: descriptionText, model: selectedModel });
  } catch (error: any) {
    console.error('Music generation error:', error);
    res.status(500).json({ error: error?.message || 'Music generation failed' });
  }
});

// WebSocket Server for Voice Conversations with gemini-3.8-live
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  const { pathname } = new URL(request.url || '', `http://${request.headers.host}`);
  if (pathname === '/api/live-voice') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

wss.on('connection', async (clientWs: WebSocket) => {
  console.log('Client connected to Live Voice API');
  try {
    const session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
        },
        systemInstruction:
          'You are Al Amin Web Engineering Voice Consultant. You speak concisely, warmly, and helpfully regarding web engineering, 3D stores, and cybersecurity.',
      },
      callbacks: {
        onmessage: (message: any) => {
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audio) {
            clientWs.send(JSON.stringify({ audio }));
          }
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
      },
    });

    clientWs.on('message', (data: Buffer | string) => {
      try {
        const parsed = JSON.parse(data.toString());
        if (parsed.audio) {
          session.sendRealtimeInput({
            audio: { data: parsed.audio, mimeType: 'audio/pcm;rate=16000' },
          });
        }
      } catch (err) {
        console.error('Live voice message parse error:', err);
      }
    });

    clientWs.on('close', () => {
      console.log('Client disconnected from Live Voice');
    });
  } catch (err) {
    console.error('Failed to establish Live Voice session:', err);
    clientWs.send(JSON.stringify({ error: 'Live API connection error' }));
  }
});

// Mounting Vite middleware in development or static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
