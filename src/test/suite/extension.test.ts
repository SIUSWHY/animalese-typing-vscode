import * as assert from "assert";
import * as vscode from "vscode";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Extension should be present", () => {
    assert.ok(
      vscode.extensions.getExtension("animalese.animalese-typing-vscode")
    );
  });

  test("Should register all commands", async () => {
    const commands = await vscode.commands.getCommands(true);

    assert.ok(commands.includes("animalese.toggle"));
    assert.ok(commands.includes("animalese.changeVoice"));
    assert.ok(commands.includes("animalese.settings"));
  });

  test("Configuration should have default values", () => {
    const config = vscode.workspace.getConfiguration("animalese");

    assert.strictEqual(config.get("enabled"), true);
    assert.strictEqual(config.get("voice"), "male1");
    assert.strictEqual(config.get("pitch"), 1.0);
    assert.strictEqual(config.get("volume"), 0.5);
    assert.strictEqual(config.get("specialSounds"), true);
    assert.strictEqual(config.get("debug"), false);
  });
});
