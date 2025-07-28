import * as vscode from "vscode";
import * as path from "path";
const playSound = require("play-sound");

/**
 * Manages Animalese sound playback using real audio files
 */
export class AnimaleSounds {
  private extensionPath: string;
  private voice: string = "male1";
  private pitch: number = 1.0;
  private volume: number = 0.5;
  private specialSounds: boolean = true;
  private lastPlayTime: number = 0;
  private playbackDelay: number = 50; // Minimum delay between sounds in ms
  private audioPlayer: any = null;
  private audioFiles: { [key: string]: string } = {};
  private currentCharacter: string = "a";

  // Character mappings for different sound types
  private readonly vowels = ["a", "e", "i", "o", "u"];
  private readonly consonants = [
    "b",
    "c",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "p",
    "q",
    "r",
    "s",
    "t",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  private readonly numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  private readonly specialChars = [
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "+",
    "=",
    "[",
    "]",
    "{",
    "}",
    "\\",
    "|",
    ";",
    ":",
    '"',
    "'",
    "<",
    ">",
    ",",
    ".",
    "/",
    "?",
    "~",
    "`",
  ];

  constructor(extensionPath: string) {
    this.extensionPath = extensionPath;
    this.initializeAudio();
  }

  /**
   * Initialize audio player and load audio files
   */
  private initializeAudio(): void {
    try {
      this.audioPlayer = playSound();
      this.loadAudioFiles();
    } catch (error) {
      console.log("Audio initialization skipped - using fallback methods");
    }
  }

  /**
   * Load audio files from assets directory
   */
  private loadAudioFiles(): void {
    const audioDir = path.join(this.extensionPath, "assets", "audio_wav");
    this.audioFiles = {
      maleVoicesDir: path.join(audioDir, "animalese", "male"),
      femaleVoicesDir: path.join(audioDir, "animalese", "female"),
      sfxDir: path.join(audioDir, "sfx"),
      vocalsDir: path.join(audioDir, "vocals"),
    };
  }

  /**
   * Sets the voice type
   */
  setVoice(voice: string): void {
    this.voice = voice;
  }

  /**
   * Sets the pitch modifier
   */
  setPitch(pitch: number): void {
    this.pitch = Math.max(0.5, Math.min(2.0, pitch));
  }

  /**
   * Sets the volume level
   */
  setVolume(volume: number): void {
    this.volume = Math.max(0.0, Math.min(1.0, volume));
  }

  /**
   * Enables or disables special sound effects
   */
  setSpecialSounds(enabled: boolean): void {
    this.specialSounds = enabled;
  }

  /**
   * Plays appropriate sound for the given character
   */
  playForCharacter(char: string): void {
    // Throttle rapid typing
    const now = Date.now();
    if (now - this.lastPlayTime < this.playbackDelay) {
      return;
    }
    this.lastPlayTime = now;

    const lowerChar = char.toLowerCase();

    if (this.vowels.includes(lowerChar)) {
      this.playVowelSound(lowerChar, char === char.toUpperCase());
    } else if (this.consonants.includes(lowerChar)) {
      this.playConsonantSound(lowerChar, char === char.toUpperCase());
    } else if (this.numbers.includes(char)) {
      this.playNumberSound(char);
    } else if (this.specialChars.includes(char) && this.specialSounds) {
      this.playSpecialSound(char);
    } else if (char === " ") {
      this.playSpaceSound();
    }
  }

  /**
   * Plays a vowel sound with appropriate pitch and tone
   */
  private playVowelSound(vowel: string, isUpperCase: boolean): void {
    this.currentCharacter = vowel;
    const frequency = this.getVowelFrequency(vowel);
    const duration = isUpperCase ? 0.15 : 0.1;
    const pitch = isUpperCase ? this.pitch * 1.2 : this.pitch;

    this.playTone(frequency, duration, pitch, "vowel");
  }

  /**
   * Plays a consonant sound with appropriate characteristics
   */
  private playConsonantSound(consonant: string, isUpperCase: boolean): void {
    this.currentCharacter = consonant;
    const frequency = this.getConsonantFrequency(consonant);
    const duration = isUpperCase ? 0.12 : 0.08;
    const pitch = isUpperCase ? this.pitch * 1.1 : this.pitch;

    this.playTone(frequency, duration, pitch, "consonant");
  }

  /**
   * Plays a musical note for numbers
   */
  private playNumberSound(number: string): void {
    this.currentCharacter = number;
    const noteFrequencies = [
      261.63, // C4 - 1
      293.66, // D4 - 2
      329.63, // E4 - 3
      349.23, // F4 - 4
      392.0, // G4 - 5
      440.0, // A4 - 6
      493.88, // B4 - 7
      523.25, // C5 - 8
      587.33, // D5 - 9
      659.25, // E5 - 0
    ];

    const index = number === "0" ? 9 : parseInt(number) - 1;
    const frequency = noteFrequencies[index];
    this.playTone(frequency, 0.2, this.pitch, "note");
  }

  /**
   * Plays special sound effects for special characters
   */
  private playSpecialSound(char: string): void {
    let frequency: number;
    let duration: number;
    let soundType = "special";

    switch (char) {
      case "@":
        frequency = 800;
        duration = 0.1;
        break;
      case "#":
        frequency = 600;
        duration = 0.08;
        break;
      case "!":
        frequency = 1000;
        duration = 0.15;
        soundType = "exclamation";
        break;
      case "?":
        frequency = 400;
        duration = 0.12;
        soundType = "question";
        break;
      case "~":
        frequency = 300;
        duration = 0.2;
        break;
      case ".":
        frequency = 200;
        duration = 0.1;
        soundType = "period";
        break;
      case ",":
        frequency = 250;
        duration = 0.05;
        soundType = "comma";
        break;
      default:
        frequency = 500;
        duration = 0.06;
    }

    this.playTone(frequency, duration, this.pitch, soundType);
  }

  /**
   * Plays a subtle sound for spaces
   */
  private playSpaceSound(): void {
    const frequency = this.voice.includes("female") ? 150 : 100;
    this.playTone(frequency, 0.03, this.pitch * 0.5, "space");
  }

  /**
   * Gets frequency for vowel sounds based on voice type
   */
  private getVowelFrequency(vowel: string): number {
    const isFemale = this.voice.includes("female");
    const baseFrequencies: { [key: string]: number } = {
      a: isFemale ? 900 : 600,
      e: isFemale ? 800 : 500,
      i: isFemale ? 1000 : 700,
      o: isFemale ? 700 : 400,
      u: isFemale ? 600 : 300,
    };

    // Add voice variation
    const voiceNumber = parseInt(this.voice.slice(-1));
    const variation = (voiceNumber - 1) * 50;

    return baseFrequencies[vowel] + variation;
  }

  /**
   * Gets frequency for consonant sounds based on voice type
   */
  private getConsonantFrequency(consonant: string): number {
    const isFemale = this.voice.includes("female");
    const baseFrequency = isFemale ? 500 : 350;

    // Different consonant groups have different characteristics
    const hardConsonants = ["k", "g", "t", "d", "p", "b"];
    const softConsonants = ["s", "f", "h", "th"];
    const nasals = ["m", "n"];
    const liquids = ["l", "r"];

    let frequency = baseFrequency;

    if (hardConsonants.includes(consonant)) {
      frequency += 100;
    } else if (softConsonants.includes(consonant)) {
      frequency += 200;
    } else if (nasals.includes(consonant)) {
      frequency -= 50;
    } else if (liquids.includes(consonant)) {
      frequency += 50;
    }

    // Add voice variation
    const voiceNumber = parseInt(this.voice.slice(-1));
    const variation = (voiceNumber - 1) * 30;

    return frequency + variation;
  }

  /**
   * Plays a tone using various methods depending on platform
   */
  private playTone(
    frequency: number,
    duration: number,
    pitch: number,
    soundType: string
  ): void {
    // Debug logging if enabled
    if (
      vscode.workspace
        .getConfiguration("animalese")
        .get<boolean>("debug", false)
    ) {
      console.log(
        `[Animalese] Playing ${soundType}: voice=${this.voice}, volume=${this.volume}`
      );
    }

    // Try to play real audio file
    if (this.playAnimalseAudio(soundType, this.currentCharacter)) {
      return;
    }

    // Fallback to visual feedback
    this.playSystemBeepWithFeedback(soundType);
  }

  /**
   * Plays real Animalese audio file
   */
  private playAnimalseAudio(soundType: string, character?: string): boolean {
    if (!this.audioPlayer) {
      return false;
    }

    try {
      const audioFile = this.getAudioFileForCharacter(character || "a");
      if (!audioFile) {
        return false;
      }

      // Play the audio file
      this.audioPlayer.play(audioFile, { timeout: 1000 }, (err: any) => {
        if (
          err &&
          vscode.workspace
            .getConfiguration("animalese")
            .get<boolean>("debug", false)
        ) {
          console.log("[Animalese] Audio playback error:", err.message);
        }
      });

      return true;
    } catch (error) {
      if (
        vscode.workspace
          .getConfiguration("animalese")
          .get<boolean>("debug", false)
      ) {
        console.log("[Animalese] Audio playback failed:", error);
      }
      return false;
    }
  }

  /**
   * Gets the correct audio file path for a character
   */
  private getAudioFileForCharacter(character: string): string | null {
    const voiceNumber = this.voice.slice(-1); // Extract number from voice (male1 -> 1)
    const genderDir = this.voice.includes("female")
      ? this.audioFiles.femaleVoicesDir
      : this.audioFiles.maleVoicesDir;

    if (!genderDir) return null;

    const voiceDir = path.join(genderDir, `voice_${voiceNumber}`);
    const fileName = `${character.toLowerCase()}.wav`;
    const filePath = path.join(voiceDir, fileName);

    return filePath;
  }

  /**
   * Attempts to use Web Audio API method (if available in VSCode context)
   */
  private tryWebAudioMethod(
    frequency: number,
    duration: number,
    volume: number
  ): boolean {
    try {
      // This won't work in Node.js context, but we'll keep it for potential future use
      if (typeof window !== "undefined" && window.AudioContext) {
        const audioContext = new window.AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime
        );
        oscillator.type = "triangle"; // Softer than square wave

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          volume * 0.3,
          audioContext.currentTime + 0.01
        );
        gainNode.gain.exponentialRampToValueAtTime(
          0.001,
          audioContext.currentTime + duration
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);

        return true;
      }
    } catch (error) {
      // Not available, continue to next method
    }
    return false;
  }

  /**
   * Attempts to use Node.js audio libraries
   */
  private tryNodeAudioMethod(
    frequency: number,
    duration: number,
    volume: number
  ): boolean {
    try {
      // Generate a simple sine wave buffer and play it
      this.generateAndPlayTone(frequency, duration, volume);
      return true;
    } catch (error) {
      // Library not available or failed, continue to fallback
    }
    return false;
  }

  /**
   * Generates and plays a tone using mathematical synthesis
   */
  private generateAndPlayTone(
    frequency: number,
    duration: number,
    volume: number
  ): void {
    // Generate a simple sine wave as a basic animalese sound
    const sampleRate = 22050; // Lower sample rate for retro feel
    const numSamples = Math.floor(duration * sampleRate);
    const buffer = Buffer.alloc(numSamples * 2); // 16-bit samples

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;

      // Create a more complex waveform that sounds more like animalese
      let sample = Math.sin(2 * Math.PI * frequency * t); // Base frequency
      sample += 0.3 * Math.sin(2 * Math.PI * frequency * 2 * t); // Harmonic
      sample += 0.1 * Math.sin(2 * Math.PI * frequency * 3 * t); // Another harmonic

      // Add some subtle vibrato for more character
      const vibrato = 1 + 0.05 * Math.sin(2 * Math.PI * 5 * t);
      sample *= vibrato;

      // Apply envelope (attack-decay-sustain-release)
      let envelope = 1;
      const attackTime = 0.01;
      const releaseTime = 0.05;

      if (t < attackTime) {
        envelope = t / attackTime;
      } else if (t > duration - releaseTime) {
        envelope = (duration - t) / releaseTime;
      }

      sample *= envelope * volume;

      // Convert to 16-bit signed integer
      const intSample = Math.max(
        -32768,
        Math.min(32767, Math.floor(sample * 32767))
      );
      buffer.writeInt16LE(intSample, i * 2);
    }

    // Try to play the buffer (this would need actual audio library)
    this.playAudioBuffer(buffer, sampleRate);
  }

  /**
   * Plays an audio buffer (placeholder for actual implementation)
   */
  private playAudioBuffer(buffer: Buffer, sampleRate: number): void {
    // This would use node-speaker or similar library in a real implementation
    // For now, we'll just simulate it

    // If speaker library is available:
    try {
      // const Speaker = require('speaker');
      // const speaker = new Speaker({
      //   channels: 1,
      //   bitDepth: 16,
      //   sampleRate: sampleRate
      // });
      // speaker.write(buffer);
      // speaker.end();
    } catch (error) {
      // Speaker not available, use fallback
    }
  }

  /**
   * Plays a system beep with visual feedback as ultimate fallback
   */
  private playSystemBeepWithFeedback(soundType: string): void {
    // Visual feedback in status bar
    const statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      1000
    );
    const icons: { [key: string]: string } = {
      vowel: "🎵",
      consonant: "🎶",
      note: "🎹",
      special: "✨",
      exclamation: "❗",
      question: "❓",
      period: "⏹️",
      comma: "⏸️",
      space: "␣",
    };

    statusBarItem.text = icons[soundType] || "🔊";
    statusBarItem.show();

    // Hide after short delay
    setTimeout(() => {
      statusBarItem.dispose();
    }, 100);

    // System beep as audio fallback
    process.stdout.write("\u0007");
  }

  /**
   * Cleanup resources
   */
  dispose(): void {
    // Cleanup any audio resources
    if (this.audioPlayer) {
      try {
        // Audio player cleanup if needed
        this.audioPlayer = null;
      } catch (error) {
        // Ignore cleanup errors
      }
    }
  }
}
