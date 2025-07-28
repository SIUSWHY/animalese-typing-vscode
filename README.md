# Animalese Typing for VSCode

A fun VSCode/Cursor extension that plays Animalese sounds (like in Animal Crossing) when typing in the editor! 🎵

## ✨ Features

- 🎵 **8 different voices**: 4 male and 4 female variants
- 🎛️ **Customizable pitch and volume**
- 🔠 **Different sounds for capital letters** (louder and higher)
- 🎹 **Musical notes for digits** (depends on selected voice)
- ✨ **Special sound effects** for special characters (@, #, !, ? etc.)
- ⚡ **Quick toggle** with hotkeys
- 📊 **Visual feedback** in status bar when playing sounds

## 🚀 Installation

### From Source Code

1. Clone the repository:

```bash
git clone https://github.com/your-username/animalese-typing-vscode.git
cd animalese-typing-vscode
```

2. Install dependencies:

```bash
npm install
```

3. Compile the project:

```bash
npm run compile
```

4. Open folder in VSCode and press `F5` to launch in development mode

## 🎯 Usage

1. After installation, the extension activates automatically
2. Start typing in any file - sounds will play automatically!
3. Use `Ctrl+Alt+A` (or `Cmd+Alt+A` on Mac) to toggle on/off
4. Open command palette (`Ctrl+Shift+P`) and find "Animalese" commands:
   - `Animalese: Toggle Animalese Typing` - enable/disable
   - `Animalese: Change Voice` - change voice
   - `Animalese: Open Settings` - open settings

## ⚙️ Settings

Configure the extension through Settings (`Ctrl+,`):

| Setting                   | Description                                   | Default |
| ------------------------- | --------------------------------------------- | ------- |
| `animalese.enabled`       | Enable/disable extension                      | `true`  |
| `animalese.voice`         | Voice selection (male1-4, female1-4)          | `male1` |
| `animalese.pitch`         | Pitch modifier (0.5 - 2.0)                    | `1.0`   |
| `animalese.volume`        | Volume level (0.0 - 1.0)                      | `0.5`   |
| `animalese.specialSounds` | Enable special effects for special characters | `true`  |
| `animalese.debug`         | Enable debug logging                          | `false` |

## 🎨 Sound Types

### Vowel sounds (a, e, i, o, u)

- Melodic tones of different heights
- Higher for female voices
- Longer for capital letters

### Consonant sounds

- Short characteristic sounds
- Differ by groups:
  - Hard consonants (k, g, t, d, p, b) - higher
  - Soft consonants (s, f, h) - even higher
  - Nasal (m, n) - lower
  - Liquid (l, r) - medium

### Digits (0-9)

Play musical notes:

- 1 = C4 (Do)
- 2 = D4 (Re)
- 3 = E4 (Mi)
- 4 = F4 (Fa)
- 5 = G4 (Sol)
- 6 = A4 (La)
- 7 = B4 (Ti)
- 8 = C5 (Do)
- 9 = D5 (Re)
- 0 = E5 (Mi)

### Special characters

- `@` - high sound
- `#` - medium sound
- `!` - exclamation sound
- `?` - question sound
- `~` - long wavy sound
- `.` - period (short low)
- `,` - comma (very short)

## 🛠️ Development

### Requirements

- Node.js 16+
- VSCode 1.74.0+
- TypeScript 4.9+

### Commands

```bash
# Install dependencies
npm install

# Compile
npm run compile

# Watch mode
npm run watch

# Linting
npm run lint

# Testing
npm test

# Build for publishing
npm run vscode:prepublish
```

### Running in Development Mode

1. Open project in VSCode
2. Press `F5` to launch Extension Development Host
3. In new VSCode window start typing to test

### Architecture

- `src/extension.ts` - main extension logic, commands, settings
- `src/animalese.ts` - sound generation and playback
- `package.json` - extension metadata and configuration

## 🎵 How It Works

1. **Input tracking**: extension listens to `onDidChangeTextDocument` events
2. **Character analysis**: each typed character is classified (vowel, consonant, digit, special)
3. **Sound generation**: appropriate tone is generated for each character type
4. **Playback**: sound is played through system audio or visual feedback is shown

## 🤝 Inspiration

This project is based on [animalese-typing](https://github.com/joshxviii/animalese-typing) by joshxviii - a browser extension for Chrome and Firefox.

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🐛 Bugs and Suggestions

If you found a bug or want to suggest a new feature, please create an issue in the repository.

---

Happy coding with fun sounds! 🎵✨
