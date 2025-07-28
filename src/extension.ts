import * as vscode from "vscode";
import { AnimaleSounds } from "./animalese";

let animaleSounds: AnimaleSounds;
let isEnabled = true;
let typingListener: vscode.Disposable | undefined;

/**
 * Activates the extension
 */
export function activate(context: vscode.ExtensionContext) {
  console.log("Animalese Typing extension is now active!");

  // Initialize Animalese sounds
  animaleSounds = new AnimaleSounds(context.extensionPath);

  // Load settings
  loadSettings();

  // Register commands
  const toggleCommand = vscode.commands.registerCommand(
    "animalese.toggle",
    () => {
      isEnabled = !isEnabled;
      if (isEnabled) {
        startListening();
        vscode.window.showInformationMessage("Animalese Typing: Enabled 🎵");
      } else {
        stopListening();
        vscode.window.showInformationMessage("Animalese Typing: Disabled 🔇");
      }

      // Save state to configuration
      vscode.workspace
        .getConfiguration("animalese")
        .update("enabled", isEnabled, true);
    }
  );

  const changeVoiceCommand = vscode.commands.registerCommand(
    "animalese.changeVoice",
    async () => {
      const voices = [
        { label: "👨 Male Voice 1", value: "male1" },
        { label: "👨 Male Voice 2", value: "male2" },
        { label: "👨 Male Voice 3", value: "male3" },
        { label: "👨 Male Voice 4", value: "male4" },
        { label: "👩 Female Voice 1", value: "female1" },
        { label: "👩 Female Voice 2", value: "female2" },
        { label: "👩 Female Voice 3", value: "female3" },
        { label: "👩 Female Voice 4", value: "female4" },
      ];

      const currentVoice = vscode.workspace
        .getConfiguration("animalese")
        .get<string>("voice", "male1");
      const currentIndex = voices.findIndex((v) => v.value === currentVoice);

      const selectedVoice = await vscode.window.showQuickPick(voices, {
        placeHolder: `Current: ${voices[currentIndex]?.label || currentVoice}`,
        title: "Animalese Voice Selection",
      });

      if (selectedVoice) {
        vscode.workspace
          .getConfiguration("animalese")
          .update("voice", selectedVoice.value, true);
        animaleSounds.setVoice(selectedVoice.value);
        vscode.window.showInformationMessage(
          `Voice changed to: ${selectedVoice.label}`
        );
      }
    }
  );

  const settingsCommand = vscode.commands.registerCommand(
    "animalese.settings",
    () => {
      vscode.commands.executeCommand(
        "workbench.action.openSettings",
        "animalese"
      );
    }
  );

  // Register disposables
  context.subscriptions.push(
    toggleCommand,
    changeVoiceCommand,
    settingsCommand
  );

  // Start listening if enabled
  if (isEnabled) {
    startListening();
  }

  // Listen for configuration changes
  vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration("animalese")) {
      loadSettings();
    }
  });

  // Show welcome message on first install
  const hasShownWelcome = context.globalState.get(
    "animalese.hasShownWelcome",
    false
  );
  if (!hasShownWelcome) {
    vscode.window
      .showInformationMessage(
        "Animalese Typing is now active! 🎵 Use Ctrl+Alt+A to toggle sounds.",
        "Open Settings",
        "Change Voice"
      )
      .then((selection) => {
        if (selection === "Open Settings") {
          vscode.commands.executeCommand("animalese.settings");
        } else if (selection === "Change Voice") {
          vscode.commands.executeCommand("animalese.changeVoice");
        }
      });
    context.globalState.update("animalese.hasShownWelcome", true);
  }
}

/**
 * Loads settings from configuration
 */
function loadSettings() {
  const config = vscode.workspace.getConfiguration("animalese");
  isEnabled = config.get<boolean>("enabled", true);
  const voice = config.get<string>("voice", "male1");
  const pitch = config.get<number>("pitch", 1.0);
  const volume = config.get<number>("volume", 0.5);
  const specialSounds = config.get<boolean>("specialSounds", true);

  animaleSounds.setVoice(voice);
  animaleSounds.setPitch(pitch);
  animaleSounds.setVolume(volume);
  animaleSounds.setSpecialSounds(specialSounds);

  // Restart listening if settings changed
  if (isEnabled && !typingListener) {
    startListening();
  } else if (!isEnabled && typingListener) {
    stopListening();
  }
}

/**
 * Starts listening for typing events
 */
function startListening() {
  if (typingListener) {
    return; // Already listening
  }

  typingListener = vscode.workspace.onDidChangeTextDocument((event) => {
    if (!isEnabled || !event.contentChanges.length) {
      return;
    }

    // Only process changes in active editor
    if (event.document !== vscode.window.activeTextEditor?.document) {
      return;
    }

    // Process each change
    for (const change of event.contentChanges) {
      if (change.text && change.rangeLength === 0) {
        // Text was inserted (typed)
        for (const char of change.text) {
          if (char !== "\n" && char !== "\r" && char !== "\t") {
            animaleSounds.playForCharacter(char);
          }
        }
      }
    }
  });
}

/**
 * Stops listening for typing events
 */
function stopListening() {
  if (typingListener) {
    typingListener.dispose();
    typingListener = undefined;
  }
}

/**
 * Deactivates the extension
 */
export function deactivate() {
  stopListening();
  if (animaleSounds) {
    animaleSounds.dispose();
  }
}
