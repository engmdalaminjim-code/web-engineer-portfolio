import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  MessageSquare,
  Mic,
  MicOff,
  Search,
  MapPin,
  Image as ImageIcon,
  Video,
  FileAudio,
  Send,
  Loader2,
  X,
  Volume2,
  Upload,
  Play,
  RotateCw,
  ExternalLink,
  Bot,
  User as UserIcon,
  CheckCircle2,
  Sliders,
  Music,
  Download
} from 'lucide-react';

interface AiStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'chat' | 'voice' | 'search' | 'image' | 'video' | 'transcribe' | 'music';
}

export const AiStudioModal: React.FC<AiStudioModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'chat',
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'voice' | 'search' | 'image' | 'video' | 'transcribe' | 'music'>(initialTab);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  // 1. Chatbot state
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'model'; content: string }>>([
    {
      role: 'model',
      content:
        'Hello! I am Al Amin’s AI Assistant. Ask me about custom web engineering, 3D e-commerce models, restaurant QR menu systems, or request a website security audit.',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatModel, setChatModel] = useState<'gemini-3.5-flash' | 'gemini-3.1-flash-lite' | 'gemini-3.1-pro-preview'>('gemini-3.5-flash');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = { role: 'user' as const, content: chatInput.trim() };
    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          model: chatModel,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setChatMessages([...newHistory, { role: 'model', content: data.reply }]);
      } else if (data.error) {
        setChatMessages([...newHistory, { role: 'model', content: `Notice: ${data.error}` }]);
      }
    } catch (err: any) {
      setChatMessages([...newHistory, { role: 'model', content: 'Connection error while communicating with Gemini API.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // 2. Live Voice State (gemini-3.8-live)
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<string>('Idle (Click start to speak)');
  const voiceWsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const startVoiceSession = async () => {
    try {
      setVoiceStatus('Connecting to Gemini 3.8 Live API...');
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live-voice`;
      const ws = new WebSocket(wsUrl);
      voiceWsRef.current = ws;

      const inputAudioCtx = new AudioContext({ sampleRate: 16000 });
      const outputAudioCtx = new AudioContext({ sampleRate: 24000 });
      audioContextRef.current = outputAudioCtx;

      ws.onopen = async () => {
        setIsVoiceActive(true);
        setVoiceStatus('Live voice connected! Speak into your microphone...');
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const source = inputAudioCtx.createMediaStreamSource(stream);
          const processor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
          source.connect(processor);
          processor.connect(inputAudioCtx.destination);

          processor.onaudioprocess = (e) => {
            if (ws.readyState === WebSocket.OPEN) {
              const inputData = e.inputBuffer.getChannelData(0);
              // convert Float32 to 16-bit PCM
              const pcm16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                pcm16[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7fff;
              }
              const bytes = new Uint8Array(pcm16.buffer);
              let binary = '';
              for (let i = 0; i < bytes.length; i++) {
                binary += String.fromCharCode(bytes[i]);
              }
              const base64Audio = btoa(binary);
              ws.send(JSON.stringify({ audio: base64Audio }));
            }
          };
        } catch (micErr) {
          setVoiceStatus('Microphone permission required for Live Voice.');
        }
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.audio) {
            setVoiceStatus('Gemini Live is speaking...');
            const binary = atob(msg.audio);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
              bytes[i] = binary.charCodeAt(i);
            }
            const pcm16 = new Int16Array(bytes.buffer);
            const float32 = new Float32Array(pcm16.length);
            for (let i = 0; i < pcm16.length; i++) {
              float32[i] = pcm16[i] / 0x7fff;
            }
            const audioBuffer = outputAudioCtx.createBuffer(1, float32.length, 24000);
            audioBuffer.getChannelData(0).set(float32);
            const sourceNode = outputAudioCtx.createBufferSource();
            sourceNode.buffer = audioBuffer;
            sourceNode.connect(outputAudioCtx.destination);
            sourceNode.start();
          }
          if (msg.error) {
            setVoiceStatus(`Live Voice info: ${msg.error}`);
          }
        } catch (e) {
          // ignore
        }
      };

      ws.onclose = () => {
        setIsVoiceActive(false);
        setVoiceStatus('Live voice session ended.');
      };
    } catch (err: any) {
      setVoiceStatus('Unable to open WebSocket to Live Voice API.');
    }
  };

  const stopVoiceSession = () => {
    voiceWsRef.current?.close();
    setIsVoiceActive(false);
    setVoiceStatus('Voice session stopped.');
  };

  // 3. Search & Maps Grounding
  const [groundingQuery, setGroundingQuery] = useState('');
  const [groundingType, setGroundingType] = useState<'search' | 'maps'>('search');
  const [groundingResult, setGroundingResult] = useState<string>('');
  const [groundingChunks, setGroundingChunks] = useState<any[]>([]);
  const [isGroundingLoading, setIsGroundingLoading] = useState(false);

  const handleRunGrounding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groundingQuery.trim() || isGroundingLoading) return;
    setIsGroundingLoading(true);
    setGroundingResult('');
    setGroundingChunks([]);

    const endpoint = groundingType === 'search' ? '/api/gemini/search' : '/api/gemini/maps';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: groundingQuery }),
      });
      const data = await res.json();
      setGroundingResult(data.text || data.error || 'No grounded text returned.');
      setGroundingChunks(data.groundingChunks || []);
    } catch (err: any) {
      setGroundingResult('Grounding call error.');
    } finally {
      setIsGroundingLoading(false);
    }
  };

  // 4. Create & Edit Images (gemini-3.1-flash-image-preview)
  const [imgPrompt, setImgPrompt] = useState('High-tech cybersecurity dashboard with glowing data visualizers');
  const [imgAspectRatio, setImgAspectRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('1:1');
  const [inputImageBase64, setInputImageBase64] = useState<string>('');
  const [generatedImg, setGeneratedImg] = useState<string>('');
  const [isImgLoading, setIsImgLoading] = useState(false);

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInputImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imgPrompt.trim() || isImgLoading) return;
    setIsImgLoading(true);

    try {
      const res = await fetch('/api/gemini/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imgPrompt,
          aspectRatio: imgAspectRatio,
          base64InputImage: inputImageBase64 || undefined,
        }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedImg(data.imageUrl);
      } else if (data.error) {
        alert(data.error);
      }
    } catch (err: any) {
      alert('Image generation request failed.');
    } finally {
      setIsImgLoading(false);
    }
  };

  // 5. Veo Video Generation (veo-3.1-fast-generate-preview)
  const [videoPrompt, setVideoPrompt] = useState('Smooth aerial camera glide over a futuristic Dhaka skyline at twilight');
  const [videoAspect, setVideoAspect] = useState<'16:9' | '9:16'>('16:9');
  const [videoPhotoBase64, setVideoPhotoBase64] = useState<string>('');
  const [videoStatus, setVideoStatus] = useState<string>('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string>('');
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  const handleStartVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isVideoLoading) return;
    setIsVideoLoading(true);
    setVideoStatus('Initiating Veo 3.1 video generation...');
    setGeneratedVideoUrl('');

    try {
      const res = await fetch('/api/gemini/video-start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: videoPrompt,
          aspectRatio: videoAspect,
          base64Image: videoPhotoBase64 || undefined,
        }),
      });
      const data = await res.json();
      if (data.operationName) {
        pollVideoOperation(data.operationName);
      } else {
        setVideoStatus(`Notice: ${data.error || 'Could not start video generation'}`);
        setIsVideoLoading(false);
      }
    } catch (err) {
      setVideoStatus('Failed to communicate with Veo service.');
      setIsVideoLoading(false);
    }
  };

  const pollVideoOperation = async (operationName: string) => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      setVideoStatus(`Rendering video with Veo 3.1... (Poll step ${attempts})`);
      try {
        const res = await fetch('/api/gemini/video-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ operationName }),
        });
        const statusData = await res.json();

        if (statusData.done) {
          clearInterval(interval);
          setVideoStatus('Downloading completed video stream...');
          const dlRes = await fetch('/api/gemini/video-download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ operationName }),
          });
          const blob = await dlRes.blob();
          const url = URL.createObjectURL(blob);
          setGeneratedVideoUrl(url);
          setVideoStatus('Video generated successfully!');
          setIsVideoLoading(false);
        } else if (attempts > 30) {
          clearInterval(interval);
          setVideoStatus('Video rendering is taking longer than usual. Please check back shortly.');
          setIsVideoLoading(false);
        }
      } catch (err) {
        clearInterval(interval);
        setVideoStatus('Video polling encountered an error.');
        setIsVideoLoading(false);
      }
    }, 10000);
  };

  // 6. Transcribe Audio (gemini-3.5-transcribe)
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecordingAudio = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = async () => {
          const base64Audio = reader.result as string;
          setIsTranscribing(true);
          try {
            const res = await fetch('/api/gemini/transcribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ base64Audio, mimeType: 'audio/webm' }),
            });
            const data = await res.json();
            setTranscriptionText(data.transcription || data.error || 'No text detected.');
          } catch {
            setTranscriptionText('Transcription request failed.');
          } finally {
            setIsTranscribing(false);
          }
        };
        reader.readAsDataURL(audioBlob);
      };

      recorder.start();
      setIsRecording(true);
    } catch {
      alert('Microphone access is required to record audio.');
    }
  };

  const stopRecordingAudio = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  // 7. Lyria Music Generation state
  const [musicPrompt, setMusicPrompt] = useState('Upbeat modern ambient electronic tech showcase soundtrack');
  const [musicModel, setMusicModel] = useState<'lyria-3-clip-preview' | 'lyria-3-pro-preview'>('lyria-3-clip-preview');
  const [isGeneratingMusic, setIsGeneratingMusic] = useState(false);
  const [generatedMusicUrl, setGeneratedMusicUrl] = useState<string | null>(null);
  const [musicDescription, setMusicDescription] = useState('');
  const [musicError, setMusicError] = useState('');

  const handleGenerateMusic = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!musicPrompt.trim() || isGeneratingMusic) return;

    setIsGeneratingMusic(true);
    setMusicError('');
    setGeneratedMusicUrl(null);

    try {
      const res = await fetch('/api/gemini/music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: musicPrompt.trim(),
          model: musicModel,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Music generation failed');

      setGeneratedMusicUrl(data.audioUrl || null);
      setMusicDescription(data.description || 'AI music successfully generated with Lyria');
    } catch (err: any) {
      setMusicError(err.message || 'Failed to generate music');
    } finally {
      setIsGeneratingMusic(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Al Amin AI Studio & Gemini Suite</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/40 text-cyan-300">
                  Live Production AI
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Explore voice conversations, multimodal chat, video generation, search/maps grounding & transcription.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 py-2.5 border-b border-slate-800/80 bg-slate-900/30 flex items-center gap-1.5 overflow-x-auto text-xs font-medium">
          {[
            { id: 'chat', label: 'Gemini Chatbot', icon: MessageSquare },
            { id: 'voice', label: 'Voice (Live API)', icon: Mic },
            { id: 'search', label: 'Search & Maps Data', icon: Search },
            { id: 'image', label: 'Create & Edit Images', icon: ImageIcon },
            { id: 'video', label: 'Veo Video Studio', icon: Video },
            { id: 'transcribe', label: 'Audio Transcriber', icon: FileAudio },
            { id: 'music', label: 'Lyria Music Studio', icon: Music },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-cyan-500 text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          {/* TAB 1: GEMINI CHATBOT */}
          {activeTab === 'chat' && (
            <div className="h-full flex flex-col">
              {/* Model Selector & System Role */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Select Model:</span>
                  <select
                    value={chatModel}
                    onChange={(e) => setChatModel(e.target.value as any)}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-cyan-300 font-mono text-xs focus:outline-none"
                  >
                    <option value="gemini-3.5-flash">gemini-3.5-flash (General Tasks)</option>
                    <option value="gemini-3.1-flash-lite">gemini-3.1-flash-lite (Fast Speed)</option>
                    <option value="gemini-3.1-pro-preview">gemini-3.1-pro-preview (Complex Reasoning)</option>
                  </select>
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  Multi-Turn Memory Active
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto space-y-3.5 pr-2">
                {chatMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 ${
                      m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        m.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      }`}
                    >
                      {m.role === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-2xl rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gemini is thinking...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChat} className="pt-3 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask Gemini about Al Amin's services, e-commerce, QR menus, or security..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  disabled={isChatLoading}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: VOICE CONVERSATIONS (gemini-3.8-live) */}
          {activeTab === 'voice' && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto space-y-6">
              <div className="relative">
                <div
                  className={`w-32 h-32 rounded-full flex items-center justify-center border-2 transition-all ${
                    isVoiceActive
                      ? 'border-cyan-400 bg-cyan-950/40 shadow-2xl shadow-cyan-500/30 scale-105 animate-pulse'
                      : 'border-slate-800 bg-slate-900'
                  }`}
                >
                  <Mic
                    className={`w-12 h-12 transition-colors ${
                      isVoiceActive ? 'text-cyan-400' : 'text-slate-500'
                    }`}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Live Voice Conversation</h3>
                <p className="text-xs text-cyan-400 font-mono mt-1">Model: gemini-3.8-live</p>
                <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
                  Engage in a natural voice conversation with ultra-low latency real-time audio streaming.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 w-full">
                Status: {voiceStatus}
              </div>

              <div className="flex gap-3">
                {!isVoiceActive ? (
                  <button
                    onClick={startVoiceSession}
                    className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-2 shadow-lg"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Start Voice Session</span>
                  </button>
                ) : (
                  <button
                    onClick={stopVoiceSession}
                    className="px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs flex items-center gap-2"
                  >
                    <MicOff className="w-4 h-4" />
                    <span>End Voice Session</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SEARCH & MAPS GROUNDING */}
          {activeTab === 'search' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Google Search & Maps Grounding</h3>
                <p className="text-xs text-slate-400">
                  Grounded with real-time web knowledge and location datasets via model <code className="text-cyan-400 font-mono">gemini-3.5-flash</code>.
                </p>
              </div>

              <form onSubmit={handleRunGrounding} className="space-y-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setGroundingType('search')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                      groundingType === 'search'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-900 border border-slate-800 text-slate-400'
                    }`}
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Google Search Tool</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGroundingType('maps')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                      groundingType === 'maps'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 border border-slate-800 text-slate-400'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Google Maps Tool</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={groundingQuery}
                    onChange={(e) => setGroundingQuery(e.target.value)}
                    placeholder={
                      groundingType === 'search'
                        ? 'e.g. Bangladesh e-commerce regulations or bKash merchant API updates'
                        : 'e.g. Top cafes and dining hubs in Gulshan 2, Dhaka'
                    }
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                  <button
                    type="submit"
                    disabled={isGroundingLoading}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs"
                  >
                    {isGroundingLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Run Query'}
                  </button>
                </div>
              </form>

              {groundingResult && (
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase font-mono">Grounded Response:</h4>
                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {groundingResult}
                  </div>

                  {groundingChunks.length > 0 && (
                    <div className="pt-3 border-t border-slate-800">
                      <span className="text-[11px] font-mono text-slate-400 block mb-2">Sources & References:</span>
                      <div className="flex flex-wrap gap-2">
                        {groundingChunks.map((chunk, idx) => (
                          <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300">
                            {chunk.web?.title || chunk.maps?.title || `Source #${idx + 1}`}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CREATE & EDIT IMAGES */}
          {activeTab === 'image' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <form onSubmit={handleGenerateImage} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Create & Edit Images</h3>
                  <p className="text-xs text-slate-400">
                    Model: <code className="text-cyan-400 font-mono">gemini-3.1-flash-image-preview</code>. Generate brand visuals or upload an image to edit.
                  </p>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Text Prompt</label>
                  <textarea
                    rows={3}
                    value={imgPrompt}
                    onChange={(e) => setImgPrompt(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Aspect Ratio</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['1:1', '16:9', '9:16', '4:3'] as const).map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setImgAspectRatio(ratio)}
                        className={`p-2 rounded-lg text-xs font-mono font-medium ${
                          imgAspectRatio === ratio
                            ? 'bg-cyan-500 text-black font-bold'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Optional: Upload Base Image to Edit</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFile}
                    className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-slate-800 file:text-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isImgLoading}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center justify-center gap-2"
                >
                  {isImgLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                  <span>Generate / Edit Image</span>
                </button>
              </form>

              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col items-center justify-center min-h-[300px]">
                {generatedImg ? (
                  <img
                    src={generatedImg}
                    alt="Generated by Gemini"
                    className="max-h-[380px] w-auto rounded-xl shadow-2xl object-contain"
                  />
                ) : (
                  <div className="text-center text-slate-500 space-y-2">
                    <ImageIcon className="w-12 h-12 mx-auto stroke-1" />
                    <p className="text-xs">Generated image will appear here</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: VEO VIDEO STUDIO */}
          {activeTab === 'video' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <form onSubmit={handleStartVideo} className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Veo Video Studio</h3>
                  <p className="text-xs text-slate-400">
                    Model: <code className="text-cyan-400 font-mono">veo-3.1-fast-generate-preview</code>. Generate video from text or animate photos.
                  </p>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Video Scene Description</label>
                  <textarea
                    rows={3}
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Aspect Ratio (16:9 or 9:16)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['16:9', '9:16'] as const).map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        onClick={() => setVideoAspect(ratio)}
                        className={`p-2 rounded-lg text-xs font-mono font-medium ${
                          videoAspect === ratio
                            ? 'bg-cyan-500 text-black font-bold'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}
                      >
                        {ratio === '16:9' ? '16:9 Landscape' : '9:16 Portrait'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">
                    Animate Image into Video (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setVideoPhotoBase64(reader.result as string);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-slate-800 file:text-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isVideoLoading}
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center justify-center gap-2"
                >
                  {isVideoLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
                  <span>Generate Video with Veo</span>
                </button>

                {videoStatus && (
                  <p className="text-xs text-cyan-300 font-mono bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    {videoStatus}
                  </p>
                )}
              </form>

              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col items-center justify-center min-h-[300px]">
                {generatedVideoUrl ? (
                  <video
                    src={generatedVideoUrl}
                    controls
                    autoPlay
                    loop
                    className="max-h-[380px] w-auto rounded-xl shadow-2xl"
                  />
                ) : (
                  <div className="text-center text-slate-500 space-y-2">
                    <Video className="w-12 h-12 mx-auto stroke-1" />
                    <p className="text-xs">Generated Veo video will play here</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: AUDIO TRANSCRIBER (gemini-3.5-transcribe) */}
          {activeTab === 'transcribe' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Audio Transcription</h3>
                <p className="text-xs text-slate-400">
                  Model: <code className="text-cyan-400 font-mono">gemini-3.5-transcribe</code>. Speak with your microphone and receive fast, accurate transcription.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
                <button
                  onClick={isRecording ? stopRecordingAudio : startRecordingAudio}
                  className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all ${
                    isRecording
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-black'
                  }`}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>

                <div>
                  <div className="text-sm font-bold text-white">
                    {isRecording ? 'Recording... Click to Stop' : 'Click to Record Voice'}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Powered by Gemini 3.5 audio transcription.
                  </p>
                </div>
              </div>

              {isTranscribing && (
                <div className="flex items-center justify-center gap-2 text-xs text-cyan-400 font-mono">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transcribing with Gemini 3.5...</span>
                </div>
              )}

              {transcriptionText && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                    Transcription Result:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {transcriptionText}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 7: LYRIA MUSIC GENERATOR (lyria-3-clip-preview & lyria-3-pro-preview) */}
          {activeTab === 'music' && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Music className="w-5 h-5 text-cyan-400" />
                  <span>Lyria AI Music Generator</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Generate music clips and tracks with Google DeepMind&apos;s Lyria models. Choose{' '}
                  <code className="text-cyan-400 font-mono">lyria-3-clip-preview</code> for short clips (up to 30s) or{' '}
                  <code className="text-cyan-400 font-mono">lyria-3-pro-preview</code> for full-length tracks.
                </p>
              </div>

              {/* Controls Form */}
              <form
                onSubmit={handleGenerateMusic}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4"
              >
                {/* Model Selection */}
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1.5">
                    Select Lyria Model:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setMusicModel('lyria-3-clip-preview')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        musicModel === 'lyria-3-clip-preview'
                          ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 ring-2 ring-cyan-500/20'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold font-mono text-white flex items-center justify-between">
                        <span>lyria-3-clip-preview</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-900/60 text-cyan-300">
                          Short (≤30s)
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Short clip generation for teasers, reels & web loops
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMusicModel('lyria-3-pro-preview')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        musicModel === 'lyria-3-pro-preview'
                          ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 ring-2 ring-cyan-500/20'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold font-mono text-white flex items-center justify-between">
                        <span>lyria-3-pro-preview</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300">
                          Full Track
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Full-length high-fidelity studio track generation
                      </div>
                    </button>
                  </div>
                </div>

                {/* Prompt Input */}
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 font-bold block mb-1.5">
                    Music Prompt / Genre & Mood:
                  </label>
                  <textarea
                    rows={3}
                    value={musicPrompt}
                    onChange={(e) => setMusicPrompt(e.target.value)}
                    placeholder="Describe the desired genre, tempo, instruments, and mood..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                {/* Quick Presets */}
                <div className="space-y-1.5">
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">
                    Quick Inspiration Presets:
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    {[
                      'Upbeat futuristic synthwave for tech agency storefront',
                      'Lo-Fi chill ambient beats for late night coding',
                      'Energetic corporate soundtrack with acoustic guitar & subtle drums',
                      'Dramatic cinematic orchestral intro with rising brass and strings',
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setMusicPrompt(preset)}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-slate-700 transition-colors text-[11px]"
                      >
                        + {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {musicError && (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-xs text-rose-300">
                    {musicError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isGeneratingMusic || !musicPrompt.trim()}
                  className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGeneratingMusic ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Composing Music with {musicModel}...</span>
                    </>
                  ) : (
                    <>
                      <Music className="w-4 h-4" />
                      <span>Generate Music with {musicModel}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Generated Audio Player */}
              {generatedMusicUrl && (
                <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Generated Lyria Soundtrack ({musicModel})</span>
                    </div>

                    <a
                      href={generatedMusicUrl}
                      download="lyria-soundtrack.mp3"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download MP3</span>
                    </a>
                  </div>

                  <audio controls src={generatedMusicUrl} className="w-full rounded-xl" autoPlay />

                  {musicDescription && (
                    <p className="text-xs text-slate-400 italic">
                      {musicDescription}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
