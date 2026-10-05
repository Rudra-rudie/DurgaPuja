// Web Audio API authentic Dhaak rhythm generator
class DhaakAudioPlayer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generate a realistic acoustic drum beat resembling a Bengali Dhaak (Kashi + Dhaak strike)
  playStrike(pitch = 180, decay = 0.25, type = 'high') {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Drum oscillator
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type === 'bell' ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(pitch, now);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, now + decay);

    gain.gain.setValueAtTime(type === 'bell' ? 0.3 : 0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + decay);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + decay);

    // Add noise snap for authentic stick attack
    if (type !== 'bell') {
      const bufferSize = this.ctx.sampleRate * 0.05;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      noise.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(now);
    }
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Traditional "Dhaak er Taal" syncopated rhythm loop:
    // Dha - Tin - Tin - Ta / Dha - Dha - Tin - Ta
    let beat = 0;
    const tempo = 220; // ms per sixteenth/eighth step

    this.timer = setInterval(() => {
      const step = beat % 8;
      if (step === 0) {
        this.playStrike(160, 0.3, 'low'); // Dha
        this.playStrike(800, 0.15, 'bell'); // Kanshi accent
      } else if (step === 2) {
        this.playStrike(220, 0.15, 'high'); // Tin
      } else if (step === 3) {
        this.playStrike(240, 0.12, 'high'); // Tin
      } else if (step === 4) {
        this.playStrike(180, 0.25, 'low'); // Dha
        this.playStrike(800, 0.15, 'bell');
      } else if (step === 6) {
        this.playStrike(230, 0.18, 'high'); // Ta
      }
      beat++;
    }, tempo);
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const dhaakPlayer = new DhaakAudioPlayer();
