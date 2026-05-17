#!/usr/bin/env node
// Asset pipeline: reads decompiled source, copies organized assets per temple
// Output: assets/temple/{temple}/ with sprites, sounds, backgrounds, manifest.json

import fs from "fs";
import path from "path";

const SOURCE = "../temp-as-source";
const OUTPUT = "../assets/temple";
const TEMPLES = ["Forest Temple", "Light Temple", "Ice Temple", "Crystal Temple"];
const TEMPLE_KEYS = ["forest", "light", "ice", "crystal"];

// Priority sprites to extract (high value game objects)
const PRIORITY_SPRITES = [
  "FireBoy", "WaterGirl", "FireBoystairs", "WaterGirlStairs",
  "GroundBox1", "GroundBox2", "GroundBox3", "GroundBox4", "GroundBox5",
  "GroundBoxHalf", "GroundTri_1",
  "BlueDiamond", "RedDiamond", "SilverDiamond",
  "FireBox", "FireBoxTri", "WaterBox", "WaterBoxTri",
  "FinishBoy", "FinishGirl", "deadFire",
  "Ball", "PhysCircle", "MovingBox",
  "LeverBase", "LeverMc", "ButtonBox", "ButtonMask", "ButtonPlants",
  "PulleyAnchor", "PulleyAnchor2", "Rope", "RopePulley", "RopeTriangle",
  "Connector", "JumperBox", "Platform1", "PlatformBox", "PlatformPulleyBox",
  "Roman", "RomanBase", "Wind", "WindMaker",
  "Watch", "GameOvero", "Hiscore", "PauseMenu", "Muter", "Instructions",
  "IntroMenu", "MainMenu", "TutLayer", "Credits",
  // Light Temple additions
  "RotMirror", "RotMirrorInfinite", "MovingMirror", "LightBeamer", "LightPusher", "LightMask",
  "Bullet", "MovingBox2", "SliderLever", "SliderHole",
  // Ice Temple additions
  "FreezingEffect", "MeltSmoke",
  // Crystal Temple additions
  "Portal", "PortalSide", "PoartalBase", "NodeTree", "PortalMask",
];

function parseSymbols(csvPath) {
  const mapping = {};
  const text = fs.readFileSync(csvPath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const semi = trimmed.indexOf(";");
    if (semi < 0) continue;
    const id = trimmed.substring(0, semi);
    let name = trimmed.substring(semi + 1);
    // Clean up name: remove package prefix like "FireBoyAndWaterGirl_fla."
    const dotIdx = name.lastIndexOf(".");
    if (dotIdx >= 0) name = name.substring(dotIdx + 1);
    mapping[id] = name;
    // Also store by name for lookup
    mapping[name] = id;
  }
  return mapping;
}

function findSpriteDir(spritesDir, symbolId, name) {
  // Try exact match: DefineSprite_{id}_{name}
  let dirName = `DefineSprite_${symbolId}_${name}`;
  let fullPath = path.join(spritesDir, dirName);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) return fullPath;

  // Try: DefineSprite_{id} (unnamed)
  dirName = `DefineSprite_${symbolId}`;
  fullPath = path.join(spritesDir, dirName);
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) return fullPath;

  // Search for partial match
  if (fs.existsSync(spritesDir)) {
    for (const entry of fs.readdirSync(spritesDir)) {
      if (entry.startsWith(`DefineSprite_${symbolId}_`) || entry === `DefineSprite_${symbolId}`) {
        return path.join(spritesDir, entry);
      }
    }
  }

  return null;
}

function copySpriteFrames(spriteDir, outputDir, name) {
  if (!spriteDir) return 0;
  const frames = fs.readdirSync(spriteDir).filter(f => /^\d+\.png$/i.test(f));
  for (const frame of frames) {
    const src = path.join(spriteDir, frame);
    const frameNum = parseInt(frame.split(".")[0]);
    const destName = frames.length === 1 ? `${name}.png` : `${name}_${frameNum}.png`;
    fs.copyFileSync(src, path.join(outputDir, destName));
  }
  return frames.length;
}

function copySounds(soundsDir, assetsDir, outputDir) {
  let count = 0;
  for (const dir of [soundsDir, assetsDir]) {
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (/\.(mp3|wav)$/i.test(file)) {
        const src = path.join(dir, file);
        const dest = path.join(outputDir, file);
        if (!fs.existsSync(dest)) {
          fs.copyFileSync(src, dest);
          count++;
        }
      }
    }
  }
  return count;
}

function findBackground(imagesDir, outputDir) {
  if (!fs.existsSync(imagesDir)) return null;

  let bestFile = null;
  let bestSize = 0;
  let bestW = 0;

  for (const file of fs.readdirSync(imagesDir)) {
    if (!/\.(png|jpg)$/i.test(file)) continue;
    const src = path.join(imagesDir, file);
    const stat = fs.statSync(src);
    if (stat.size > bestSize) {
      bestSize = stat.size;
      bestFile = src;
    }
  }

  if (bestFile) {
    const ext = path.extname(bestFile);
    const dest = path.join(outputDir, `background${ext}`);
    fs.copyFileSync(bestFile, dest);
    return dest;
  }
  return null;
}

function packTemple(templeName, key) {
  console.log(`\nPacking ${templeName}...`);

  const templeDir = path.join(SOURCE, templeName);
  const outputDir = path.join(OUTPUT, key);
  const spritesOut = path.join(outputDir, "sprites");
  const soundsOut = path.join(outputDir, "sounds");

  fs.mkdirSync(outputDir, { recursive: true });
  fs.mkdirSync(spritesOut, { recursive: true });
  fs.mkdirSync(soundsOut, { recursive: true });

  // Parse symbols
  const csvPath = path.join(templeDir, "symbolClass", "symbols.csv");
  if (!fs.existsSync(csvPath)) {
    console.warn(`  No symbols.csv for ${templeName}`);
    return { sprites: 0, sounds: 0 };
  }

  const symbols = parseSymbols(csvPath);
  const spritesDir = path.join(templeDir, "sprites");
  const imagesDir = path.join(templeDir, "images");
  const soundsDir = path.join(templeDir, "sounds");
  const assetsDir = path.join(templeDir, "scripts", "_assets");

  // Extract priority sprites
  let spriteCount = 0;
  const extractedSprites = {};

  for (const name of PRIORITY_SPRITES) {
    const id = symbols[name];
    if (!id) continue;

    const spriteDir = findSpriteDir(spritesDir, id, name);
    if (!spriteDir) continue;

    const frames = copySpriteFrames(spriteDir, spritesOut, name);
    if (frames > 0) {
      extractedSprites[name] = { symbolId: id, frames, path: `sprites/${name}.png` };
      spriteCount++;
    }
  }

  // Also extract remaining named sprites (non-priority but useful)
  for (const [id, name] of Object.entries(symbols)) {
    if (isNaN(parseInt(id))) continue; // skip reverse mappings
    if (extractedSprites[name]) continue;

    const spriteDir = findSpriteDir(spritesDir, id, name);
    if (!spriteDir) continue;

    const frames = copySpriteFrames(spriteDir, spritesOut, name);
    if (frames > 0) {
      extractedSprites[name] = { symbolId: id, frames, path: `sprites/${name}.png` };
      spriteCount++;
    }
  }

  // Copy sounds
  const soundCount = copySounds(soundsDir, assetsDir, soundsOut);

  // Copy background
  findBackground(imagesDir, outputDir);

  // Copy all images to a subfolder
  const imgsOut = path.join(outputDir, "images");
  fs.mkdirSync(imgsOut, { recursive: true });
  if (fs.existsSync(imagesDir)) {
    for (const file of fs.readdirSync(imagesDir)) {
      if (/\.(png|jpg)$/i.test(file)) {
        fs.copyFileSync(path.join(imagesDir, file), path.join(imgsOut, file));
      }
    }
  }

  // Generate manifest
  const manifest = {
    temple: templeName,
    key,
    sprites: extractedSprites,
    sounds: soundCount,
    background: fs.existsSync(path.join(outputDir, "background.png")) ? "background.png" : null,
  };

  fs.writeFileSync(
    path.join(outputDir, "manifest.json"),
    JSON.stringify(manifest, null, 2)
  );

  console.log(`  Sprites: ${spriteCount}, Sounds: ${soundCount}`);
  return manifest;
}

// --- Main ---
console.log("Fireboy & Watergirl — Asset Pipeline");
console.log("====================================\n");

const manifests = {};
for (let i = 0; i < TEMPLES.length; i++) {
  manifests[TEMPLE_KEYS[i]] = packTemple(TEMPLES[i], TEMPLE_KEYS[i]);
}

// Write master manifest
fs.writeFileSync(
  path.join(OUTPUT, "manifest.json"),
  JSON.stringify(manifests, null, 2)
);

// Summary
console.log("\n====================================");
for (const key of TEMPLE_KEYS) {
  const m = manifests[key];
  console.log(`${key}: ${m.sprites} sprites, ${m.sounds} sounds, bg=${m.background || "none"}`);
}
console.log(`\nOutput: ${path.resolve(OUTPUT)}/`);
