# 🚀 Animalese Typing Quick Start

## What We Built

A fully functional VSCode extension that plays Animalese sounds when typing, just like in Animal Crossing! 🎵

## ⚡ Testing Setup

1. **Open project in VSCode**:

   ```bash
   code .
   ```

2. **Press F5** to launch Extension Development Host

3. **In the new VSCode window**:
   - Open any file
   - Start typing - you should hear real Animalese sounds! 🎵
   - Emojis also appear in the status bar as visual feedback

## 🎯 Main Commands

- `Ctrl+Alt+A` (or `Cmd+Alt+A`) - toggle sounds on/off
- `Ctrl+Shift+P` → `Animalese: Change Voice` - change voice
- `Ctrl+Shift+P` → `Animalese: Open Settings` - open settings

## 🎨 What Works

### ✅ Implemented Features

- 🎵 **8 voices** (male1-4, female1-4) with different frequencies
- 🔠 **Different sounds** for vowels, consonants, digits
- 🎹 **Musical notes** for digits 0-9
- ✨ **Special effects** for symbols (@, #, !, ?, ~, ., ,)
- 📊 **Visual feedback** in status bar
- ⚙️ **Settings** for volume, pitch, effect toggles
- 🔄 **Hotkeys** for quick control
- 🎯 **Active editor tracking only**

### 🎵 Sound Effects

- **Vowels** (a,e,i,o,u) - melodic tones of different heights
- **Consonants** - short characteristic sounds by groups
- **Digits** - musical notes (C4-E5)
- **Special symbols** - unique effects
- **Capital letters** - louder and higher than normal

### 📊 Visual Effects

- 🎵 Vowels
- 🎶 Consonants
- 🎹 Notes (digits)
- ❗ Exclamation
- ❓ Question
- ⏹️ Period
- ⏸️ Comma
- ✨ Special symbols

## 🛠️ Development

```bash
# Install dependencies
npm install

# Compile
npm run compile

# Watch mode
npm run watch

# Testing
npm test
```

## 🎯 Next Steps

1. ✅ **Real sounds**: Integrated and converted original audio files from Animal Crossing (244 WAV files)
2. **Publishing**: Create .vsix package for distribution
3. ✅ **Audio format**: AAC issue resolved, using WAV files
4. **Integration**: Sounds for autocomplete and other events

## 🎵 Audio Structure

- **4 male voices**: `assets/audio_wav/animalese/male/voice_1-4/`
- **4 female voices**: `assets/audio_wav/animalese/female/voice_1-4/`
- **Individual files**: a.wav, b.wav, ..., z.wav, 0.wav, 1.wav, ..., 9.wav
- **Total WAV files**: 244 (converted from original AAC)
- **Quality**: 22050 Hz, 16-bit, Stereo

## 🔧 Audio Problem Fixed

✅ **Problem solved**: AAC files didn't play correctly on Linux
✅ **Solution**: All files converted to WAV format using ffmpeg
✅ **Result**: Now plays real Animalese sounds!

## 📝 Settings

All settings available in VSCode Settings:

- `animalese.enabled` - enable/disable
- `animalese.voice` - voice selection
- `animalese.pitch` - pitch modifier (0.5-2.0)
- `animalese.volume` - volume level (0.0-1.0)
- `animalese.specialSounds` - special effects
- `animalese.debug` - debug logging

## 🎉 Done!

The extension is fully functional and ready to use. Enjoy coding with Animalese sounds! 🎵✨

---

_Based on [animalese-typing](https://github.com/joshxviii/animalese-typing) for browsers_
