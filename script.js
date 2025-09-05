// class BrainrotGenerator {
//     constructor() {
//         this.speechSynth = window.speechSynthesis;
//         this.currentUtterance = null;
//         this.voices = [];
//         this.isPlaying = false;
        
//         this.initElements();
//         this.loadVoices();
//         this.bindEvents();
//         this.setupPresetVideos();
//     }
    
//     initElements() {
//         this.textInput = document.getElementById('textInput');
//         this.voiceSelect = document.getElementById('voiceSelect');
//         this.speedRange = document.getElementById('speedRange');
//         this.speedValue = document.getElementById('speedValue');
//         this.pitchRange = document.getElementById('pitchRange');
//         this.pitchValue = document.getElementById('pitchValue');
//         this.playBtn = document.getElementById('playBtn');
//         this.stopBtn = document.getElementById('stopBtn');
//         this.backgroundVideo = document.getElementById('backgroundVideo');
//         this.videoInput = document.getElementById('videoInput');
//         this.uploadBtn = document.getElementById('uploadBtn');
//         this.randomVideoBtn = document.getElementById('randomVideoBtn');
//         this.statusText = document.getElementById('statusText');
//     }
    
//     loadVoices() {
//         const updateVoices = () => {
//             this.voices = this.speechSynth.getVoices();
//             this.populateVoiceSelect();
//         };
        
//         updateVoices();
//         this.speechSynth.addEventListener('voiceschanged', updateVoices);
//     }
    
//     populateVoiceSelect() {
//         this.voiceSelect.innerHTML = '<option value="">Default</option>';
        
//         this.voices.forEach((voice, index) => {
//             const option = document.createElement('option');
//             option.value = index;
//             option.textContent = `${voice.name} (${voice.lang})`;
//             this.voiceSelect.appendChild(option);
//         });
//     }
    
//     bindEvents() {
//         this.playBtn.addEventListener('click', () => this.startBrainrot());
//         this.stopBtn.addEventListener('click', () => this.stopBrainrot());
        
//         this.speedRange.addEventListener('input', () => {
//             this.speedValue.textContent = this.speedRange.value + 'x';
//         });
        
//         this.pitchRange.addEventListener('input', () => {
//             this.pitchValue.textContent = this.pitchRange.value + 'x';
//         });
        
//         this.videoInput.addEventListener('change', (e) => this.handleVideoUpload(e));
//         this.uploadBtn.addEventListener('click', () => this.videoInput.click());
//         this.randomVideoBtn.addEventListener('click', () => this.loadRandomVideo());
//     }
    
//     setupPresetVideos() {
//         const presetVideos = {
//             'subway-surfers': 'https://www.w3schools.com/html/mov_bbb.mp4', // Sample video
//             'minecraft': 'https://www.w3schools.com/html/movie.mp4', // Sample video
//             'satisfying': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4' // Sample video
//         };
        
//         document.querySelectorAll('.thumbnail').forEach(thumbnail => {
//             thumbnail.addEventListener('click', () => {
//                 const videoType = thumbnail.dataset.video;
//                 this.loadPresetVideo(presetVideos[videoType]);
//                 this.updateStatus(`Loaded ${videoType} video! 🎮`);
//             });
//         });
//     }
    
//     loadPresetVideo(videoUrl) {
//         this.backgroundVideo.src = videoUrl;
//         this.backgroundVideo.load();
//     }
    
//     handleVideoUpload(event) {
//         const file = event.target.files[0];
//         if (file && file.type.startsWith('video/')) {
//             const videoUrl = URL.createObjectURL(file);
//             this.backgroundVideo.src = videoUrl;
//             this.backgroundVideo.load();
//             this.updateStatus(`Uploaded ${file.name}! 📹`);
//         } else {
//             this.updateStatus('Please select a valid video file! ❌');
//         }
//     }
    
//     loadRandomVideo() {
//         const randomVideos = [
//             'https://www.w3schools.com/html/mov_bbb.mp4',
//             'https://www.w3schools.com/html/movie.mp4',
//             'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
//         ];
        
//         const randomUrl = randomVideos[Math.floor(Math.random() * randomVideos.length)];
//         this.loadPresetVideo(randomUrl);
//         this.updateStatus('Loaded random brainrot video! 🎲');
//     }
    
//     startBrainrot() {
//         const text = this.textInput.value.trim();
        
//         if (!text) {
//             this.updateStatus('Please enter some text first! 📝');
//             return;
//         }
        
//         if (!this.backgroundVideo.src) {
//             this.updateStatus('Please select a video first! 🎥');
//             return;
//         }
        
//         // Stop any current speech
//         this.stopBrainrot();
        
//         // Create new utterance
//         this.currentUtterance = new SpeechSynthesisUtterance(text);
        
//         // Configure voice settings
//         if (this.voiceSelect.value) {
//             this.currentUtterance.voice = this.voices[this.voiceSelect.value];
//         }
        
//         this.currentUtterance.rate = parseFloat(this.speedRange.value);
//         this.currentUtterance.pitch = parseFloat(this.pitchRange.value);
        
//         // Event listeners
//         this.currentUtterance.onstart = () => {
//             this.isPlaying = true;
//             this.playBtn.textContent = '🔊 Speaking...';
//             this.playBtn.disabled = true;
//             this.backgroundVideo.play();
//             document.querySelector('.video-container').classList.add('playing');
//             this.updateStatus('Generating epic brainrot content! 🧠💥');
//         };
        
//         this.currentUtterance.onend = () => {
//             this.resetUI();
//             this.updateStatus('Brainrot complete! Ready for more! 🎉');
//         };
        
//         this.currentUtterance.onerror = () => {
//             this.resetUI();
//             this.updateStatus('Speech error occurred! Try again! ❌');
//         };
        
//         // Start speech synthesis
//         this.speechSynth.speak(this.currentUtterance);
//     }
    
//     stopBrainrot() {
//         if (this.speechSynth.speaking) {
//             this.speechSynth.cancel();
//         }
        
//         this.backgroundVideo.pause();
//         this.resetUI();
//         this.updateStatus('Brainrot stopped! 🛑');
//     }
    
//     resetUI() {
//         this.isPlaying = false;
//         this.playBtn.textContent = '🎵 Start Brainrot';
//         this.playBtn.disabled = false;
//         document.querySelector('.video-container').classList.remove('playing');
//     }
    
//     updateStatus(message) {
//         this.statusText.textContent = message;
//     }
// }

// // Initialize the brainrot generator when the page loads
// document.addEventListener('DOMContentLoaded', () => {
//     new BrainrotGenerator();
// });

// // Add some sample brainrot text for demonstration
// document.addEventListener('DOMContentLoaded', () => {
//     const sampleTexts = [
//         "Yo what's good fam, this is absolutely BUSSIN! No cap, this is straight fire and totally sigma energy. The rizzler just dropped the most Ohio facts that will literally break your gyatt! This is so slay, periodt!",
//         "Bruh, this hits different! It's giving main character energy, no cap. This is so based and red-pilled, literally touching grass while being chronically online. Sheesh, that's some serious drip!",
//         "Facts! This is straight up sending me to the shadow realm! No printer, just fax! This slaps harder than my mom's chancla. It's giving Y2K vibes but make it gen alpha!"
//     ];
    
//     const textInput = document.getElementById('textInput');
//     if (textInput && !textInput.value) {
//         textInput.placeholder = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
//     }
// });


class BrainrotGenerator {
    constructor() {
        this.speechSynth = window.speechSynthesis;
        this.currentUtterance = null;
        this.voices = [];
        this.isPlaying = false;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.recordedChunks = [];
        this.recordingStartTime = null;
        this.recordingTimer = null;
        this.audioContext = null;
        this.audioDestination = null;
        this.videoStream = null;
        this.audioStream = null;
        
        this.initElements();
        this.loadVoices();
        this.bindEvents();
        this.setupPresetVideos();
        this.setupRecording();
    }
    
    initElements() {
        this.textInput = document.getElementById('textInput');
        this.voiceSelect = document.getElementById('voiceSelect');
        this.speedRange = document.getElementById('speedRange');
        this.speedValue = document.getElementById('speedValue');
        this.pitchRange = document.getElementById('pitchRange');
        this.pitchValue = document.getElementById('pitchValue');
        this.playBtn = document.getElementById('playBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.recordVideo = document.getElementById('recordVideo');
        this.qualitySelect = document.getElementById('qualitySelect');
        this.backgroundVideo = document.getElementById('backgroundVideo');
        this.recordingCanvas = document.getElementById('recordingCanvas');
        this.videoInput = document.getElementById('videoInput');
        this.uploadBtn = document.getElementById('uploadBtn');
        this.randomVideoBtn = document.getElementById('randomVideoBtn');
        this.statusText = document.getElementById('statusText');
        this.recordingInfo = document.getElementById('recordingInfo');
        this.recordingTime = document.getElementById('recordingTime');
    }
    
    async setupRecording() {
        try {
            // Setup audio context for speech synthesis capture
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.audioDestination = this.audioContext.createMediaStreamDestination();
        } catch (error) {
            console.warn('Audio context setup failed:', error);
        }
    }
    
    loadVoices() {
        const updateVoices = () => {
            this.voices = this.speechSynth.getVoices();
            this.populateVoiceSelect();
        };
        
        updateVoices();
        this.speechSynth.addEventListener('voiceschanged', updateVoices);
    }
    
    populateVoiceSelect() {
        this.voiceSelect.innerHTML = '<option value="">Default</option>';
        
        this.voices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${voice.name} (${voice.lang})`;
            this.voiceSelect.appendChild(option);
        });
    }
    
    bindEvents() {
        this.playBtn.addEventListener('click', () => this.startBrainrot());
        this.stopBtn.addEventListener('click', () => this.stopBrainrot());
        this.downloadBtn.addEventListener('click', () => this.downloadRecording());
        
        this.speedRange.addEventListener('input', () => {
            this.speedValue.textContent = this.speedRange.value + 'x';
        });
        
        this.pitchRange.addEventListener('input', () => {
            this.pitchValue.textContent = this.pitchRange.value + 'x';
        });
        
        this.videoInput.addEventListener('change', (e) => this.handleVideoUpload(e));
        this.uploadBtn.addEventListener('click', () => this.videoInput.click());
        this.randomVideoBtn.addEventListener('click', () => this.loadRandomVideo());
    }
    
    setupPresetVideos() {
        const presetVideos = {
            'subway-surfers': 'https://www.w3schools.com/html/mov_bbb.mp4',
            'minecraft': 'https://www.w3schools.com/html/movie.mp4',
            'satisfying': 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        };
        
        document.querySelectorAll('.thumbnail').forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const videoType = thumbnail.dataset.video;
                this.loadPresetVideo(presetVideos[videoType]);
                this.updateStatus(`Loaded ${videoType} video! 🎮`);
            });
        });
    }
    
    loadPresetVideo(videoUrl) {
        this.backgroundVideo.src = videoUrl;
        this.backgroundVideo.load();
    }
    
    handleVideoUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('video/')) {
            const videoUrl = URL.createObjectURL(file);
            this.backgroundVideo.src = videoUrl;
            this.backgroundVideo.load();
            this.updateStatus(`Uploaded ${file.name}! 📹`);
        } else {
            this.updateStatus('Please select a valid video file! ❌');
        }
    }
    
    loadRandomVideo() {
        const randomVideos = [
            'https://www.w3schools.com/html/mov_bbb.mp4',
            'https://www.w3schools.com/html/movie.mp4',
            'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
        ];
        
        const randomUrl = randomVideos[Math.floor(Math.random() * randomVideos.length)];
        this.loadPresetVideo(randomUrl);
        this.updateStatus('Loaded random brainrot video! 🎲');
    }
    
    async setupCanvasRecording() {
        const canvas = this.recordingCanvas;
        const ctx = canvas.getContext('2d');
        const video = this.backgroundVideo;
        
        // Set canvas dimensions based on quality
        const quality = this.qualitySelect.value;
        const dimensions = {
            '480p': { width: 854, height: 480 },
            '720p': { width: 1280, height: 720 },
            '1080p': { width: 1920, height: 1080 }
        };
        
        canvas.width = dimensions[quality].width;
        canvas.height = dimensions[quality].height;
        
        // Function to draw video frame to canvas
        const drawFrame = () => {
            if (this.isRecording && !video.paused && !video.ended) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                requestAnimationFrame(drawFrame);
            }
        };
        
        return { canvas, drawFrame };
    }
    
    async startRecording() {
        if (!this.recordVideo.checked) return;
        
        try {
            const { canvas, drawFrame } = await this.setupCanvasRecording();
            
            // Get canvas stream
            this.videoStream = canvas.captureStream(30); // 30 FPS
            
            // Create audio context for speech synthesis
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.audioDestination = this.audioContext.createMediaStreamDestination();
            
            // Get microphone audio (for speech synthesis mixing)
            this.audioStream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                } 
            });
            
            // Combine video and audio streams
            const combinedStream = new MediaStream([
                ...this.videoStream.getVideoTracks(),
                ...this.audioStream.getAudioTracks()
            ]);
            
            // Setup MediaRecorder
            this.mediaRecorder = new MediaRecorder(combinedStream, {
                mimeType: 'video/webm;codecs=vp8,opus',
                videoBitsPerSecond: 2500000 // 2.5 Mbps
            });
            
            this.recordedChunks = [];
            
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.recordedChunks.push(event.data);
                }
            };
            
            this.mediaRecorder.onstop = () => {
                this.finalizeRecording();
            };
            
            // Start recording
            this.mediaRecorder.start(1000); // Record in 1-second chunks
            this.isRecording = true;
            
            // Start canvas drawing
            drawFrame();
            
            // Start recording timer
            this.startRecordingTimer();
            this.recordingInfo.style.display = 'flex';
            
            this.updateStatus('Recording brainrot video! 🔴');
            
        } catch (error) {
            console.error('Failed to start recording:', error);
            this.updateStatus('Recording failed! Check permissions. ❌');
        }
    }
    
    stopRecording() {
        if (!this.isRecording) return;
        
        this.isRecording = false;
        
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
        }
        
        if (this.audioStream) {
            this.audioStream.getTracks().forEach(track => track.stop());
        }
        
        if (this.videoStream) {
            this.videoStream.getTracks().forEach(track => track.stop());
        }
        
        this.stopRecordingTimer();
        this.recordingInfo.style.display = 'none';
    }
    
    startRecordingTimer() {
        this.recordingStartTime = Date.now();
        this.recordingTimer = setInterval(() => {
            const elapsed = Date.now() - this.recordingStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.recordingTime.textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    stopRecordingTimer() {
        if (this.recordingTimer) {
            clearInterval(this.recordingTimer);
            this.recordingTimer = null;
        }
    }
    
    finalizeRecording() {
        if (this.recordedChunks.length > 0) {
            const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
            this.recordedBlob = blob;
            this.downloadBtn.disabled = false;
            this.updateStatus('Recording complete! Ready to download! 📹✅');
        }
    }
    
    downloadRecording() {
        if (!this.recordedBlob) {
            this.updateStatus('No recording available to download! ❌');
            return;
        }
        
        const url = URL.createObjectURL(this.recordedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `brainrot-video-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.updateStatus('Video downloaded successfully! 🎉');
    }
    
    async startBrainrot() {
        const text = this.textInput.value.trim();
        
        if (!text) {
            this.updateStatus('Please enter some text first! 📝');
            return;
        }
        
        if (!this.backgroundVideo.src) {
            this.updateStatus('Please select a video first! 🎥');
            return;
        }
        
        // Stop any current speech and recording
        this.stopBrainrot();
        
        // Start recording if enabled
        if (this.recordVideo.checked) {
            await this.startRecording();
        }
        
        // Create new utterance
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        
        // Configure voice settings
        if (this.voiceSelect.value) {
            this.currentUtterance.voice = this.voices[this.voiceSelect.value];
        }
        
        this.currentUtterance.rate = parseFloat(this.speedRange.value);
        this.currentUtterance.pitch = parseFloat(this.pitchRange.value);
        
        // Event listeners
        this.currentUtterance.onstart = () => {
            this.isPlaying = true;
            this.playBtn.textContent = '🔊 Speaking...';
            this.playBtn.disabled = true;
            this.backgroundVideo.play();
            document.querySelector('.video-container').classList.add('playing');
            
            if (this.isRecording) {
                this.updateStatus('Generating epic brainrot content! 🧠💥🔴');
            } else {
                this.updateStatus('Generating epic brainrot content! 🧠💥');
            }
        };
        
        this.currentUtterance.onend = () => {
            this.resetUI();
            if (this.isRecording) {
                this.stopRecording();
                this.updateStatus('Brainrot complete! Processing video... ⏳');
            } else {
                this.updateStatus('Brainrot complete! Ready for more! 🎉');
            }
        };
        
        this.currentUtterance.onerror = () => {
            this.resetUI();
            if (this.isRecording) {
                this.stopRecording();
            }
            this.updateStatus('Speech error occurred! Try again! ❌');
        };
        
        // Start speech synthesis
        this.speechSynth.speak(this.currentUtterance);
    }
    
    stopBrainrot() {
        if (this.speechSynth.speaking) {
            this.speechSynth.cancel();
        }
        
        this.backgroundVideo.pause();
        
        if (this.isRecording) {
            this.stopRecording();
        }
        
        this.resetUI();
        this.updateStatus('Brainrot stopped! 🛑');
    }
    
    resetUI() {
        this.isPlaying = false;
        this.playBtn.textContent = '🎵 Start Brainrot';
        this.playBtn.disabled = false;
        document.querySelector('.video-container').classList.remove('playing');
    }
    
    updateStatus(message) {
        this.statusText.textContent = message;
    }
}

// Initialize the brainrot generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new BrainrotGenerator();
});

// Add some sample brainrot text for demonstration
document.addEventListener('DOMContentLoaded', () => {
    const sampleTexts = [
        "Yo what's good fam, this is absolutely BUSSIN! No cap, this is straight fire and totally sigma energy. The rizzler just dropped the most Ohio facts that will literally break your gyatt! This is so slay, periodt!",
        "Bruh, this hits different! It's giving main character energy, no cap. This is so based and red-pilled, literally touching grass while being chronically online. Sheesh, that's some serious drip!",
        "Facts! This is straight up sending me to the shadow realm! No printer, just fax! This slaps harder than my mom's chancla. It's giving Y2K vibes but make it gen alpha!"
    ];
    
    const textInput = document.getElementById('textInput');
    if (textInput && !textInput.value) {
        textInput.placeholder = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    }
});
