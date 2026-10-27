// frontend/js/pitch-detector.js
class PitchDetector {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.mediaStream = null;
        this.isListening = false;
        this.onNoteDetected = null;
        this.onRawPitch = null;
        this.animationId = null;

        this.lastDetectedTime = 0;
        this.cooldownMs = 200;
        this.threshold = 0.15;

        this.NOTE_FREQS = {
            "D": 293.66,
            "1": 110.00, "2": 146.83, "3": 130.81, "4": 329.63,
            "5": 698.46, "6": 1864.66, "7": 3135.96, "8": 3520.00
        };
    }

    async start(onNoteDetected, onRawPitch) {
        // 👇 هر بار کالبک‌ها رو تازه تنظیم کن، حتی اگه قبلاً استارت شده بود
        this.onNoteDetected = onNoteDetected;
        this.onRawPitch = onRawPitch;

        if (this.isListening && this.audioContext && this.audioContext.state === 'running') {
            console.log("🎤 میکروفون از قبل فعاله، فقط کالبک‌ها آپدیت شدند.");
            return;
        }

        try {
            console.log("🎤 درخواست دسترسی به میکروفون...");
            this.mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                }
            });
            console.log("✅ دسترسی به میکروفون گرفته شد. تعداد ترک‌ها:", this.mediaStream.getAudioTracks().length);

            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log("🎵 AudioContext ساخته شد، state:", this.audioContext.state);

            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
                console.log("▶️ AudioContext از suspend خارج شد، state جدید:", this.audioContext.state);
            }

            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 2048;
            this.analyser.smoothingTimeConstant = 0;

            const source = this.audioContext.createMediaStreamSource(this.mediaStream);
            source.connect(this.analyser);

            this.isListening = true;
            console.log("🟢 Loop شروع شد.");
            this._loop();

        } catch (err) {
            console.error("❌ خطای getUserMedia:", err.name, err.message);
            alert(`❌ خطا در دسترسی به میکروفون:\n${err.name}: ${err.message}`);
            throw err;
        }
    }

    stop() {
        this.isListening = false;
        if (this.animationId) cancelAnimationFrame(this.animationId);
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
            this.mediaStream = null;
        }
        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close();
            this.audioContext = null;
        }
        console.log("🛑 میکروفون خاموش شد.");
    }

    _loop() {
        if (!this.isListening) return;

        try {
            const buffer = new Float32Array(this.analyser.fftSize);
            this.analyser.getFloatTimeDomainData(buffer);

            // محاسبه RMS
            let sum = 0;
            for (let i = 0; i < buffer.length; i++) {
                sum += buffer[i] * buffer[i];
            }
            const rms = Math.sqrt(sum / buffer.length);

            const pitch = this._yinPitch(buffer);

            if (this.onRawPitch) {
                this.onRawPitch(pitch, rms);
            }

            if (pitch && pitch > 50 && pitch < 4000) {
                const now = Date.now();
                if (now - this.lastDetectedTime > this.cooldownMs) {
                    const matchedNote = this._findClosestNote(pitch);
                    if (matchedNote) {
                        this.lastDetectedTime = now;
                        if (this.onNoteDetected) this.onNoteDetected(matchedNote, pitch);
                    }
                }
            }
        } catch (err) {
            console.error("❌ خطا در loop:", err);
        }

        this.animationId = requestAnimationFrame(() => this._loop());
    }

    _yinPitch(buffer) {
        const sampleRate = this.audioContext.sampleRate;
        const bufferSize = buffer.length;
        const halfBuffer = Math.floor(bufferSize / 2);
        const yinBuffer = new Float32Array(halfBuffer);

        for (let tau = 0; tau < halfBuffer; tau++) {
            yinBuffer[tau] = 0;
            for (let i = 0; i < halfBuffer; i++) {
                const delta = buffer[i] - buffer[i + tau];
                yinBuffer[tau] += delta * delta;
            }
        }

        yinBuffer[0] = 1;
        let runningSum = 0;
        for (let tau = 1; tau < halfBuffer; tau++) {
            runningSum += yinBuffer[tau];
            yinBuffer[tau] *= tau / runningSum;
        }

        let tauEstimate = -1;
        for (let tau = 2; tau < halfBuffer; tau++) {
            if (yinBuffer[tau] < this.threshold) {
                while (tau + 1 < halfBuffer && yinBuffer[tau + 1] < yinBuffer[tau]) {
                    tau++;
                }
                tauEstimate = tau;
                break;
            }
        }

        if (tauEstimate === -1) return null;

        let betterTau;
        const x0 = tauEstimate < 1 ? tauEstimate : tauEstimate - 1;
        const x2 = tauEstimate + 1 < halfBuffer ? tauEstimate + 1 : tauEstimate;

        if (x0 === tauEstimate) {
            betterTau = (yinBuffer[tauEstimate] <= yinBuffer[x2]) ? tauEstimate : x2;
        } else if (x2 === tauEstimate) {
            betterTau = (yinBuffer[tauEstimate] <= yinBuffer[x0]) ? tauEstimate : x0;
        } else {
            const s0 = yinBuffer[x0];
            const s1 = yinBuffer[tauEstimate];
            const s2 = yinBuffer[x2];
            betterTau = tauEstimate + (s2 - s0) / (2 * (2 * s1 - s2 - s0));
        }

        return sampleRate / betterTau;
    }

    _findClosestNote(frequency) {
        // اول کالیبراسیون
        for (const [note, range] of Object.entries(this.calibration || {})) {
            if (range.min && range.max && frequency >= range.min && frequency <= range.max) {
                return note;
            }
        }

        let closestNote = null;
        let minDiff = Infinity;
        for (const [note, targetFreq] of Object.entries(this.NOTE_FREQS)) {
            const diff = Math.abs(frequency - targetFreq);
            if (diff < minDiff) {
                minDiff = diff;
                closestNote = note;
            }
        }
        if (!closestNote) return null;
        const targetFreq = this.NOTE_FREQS[closestNote];
        const tolerance = targetFreq * 0.05;
        return minDiff <= tolerance ? closestNote : null;
    }

    setCalibration(calib) {
        this.calibration = calib || {};
    }
}

window.pitchDetector = new PitchDetector();
console.log("✅ PitchDetector آماده است.");