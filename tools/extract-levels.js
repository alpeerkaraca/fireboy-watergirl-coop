#!/usr/bin/env node
// Extracts level data from decompiled ActionScript source
// Reads level.as and Game.as from each temple, outputs JSON

import fs from "fs";
import path from "path";

const SOURCE = "../temp-as-source";
const OUTPUT = "../data/levels";
const TEMPLES = ["Forest Temple", "Light Temple", "Ice Temple", "Crystal Temple"];

// Tile code mappings derived from CreateGround and the level data
const TILE_MAP = {
  "0": "empty",
  "1": "solid",
  "-1": "spike",
  "-2": "diamond",
  "-3": "rope",
  "-4": "platform_zone",
  "51": "conveyor_start",
  "52": "conveyor_end",
  "61": "conveyor",
  "62": "conveyor",
  "71": "decorative",
  "72": "decorative",
};

// These are variable-substituted strings in the AS source
// _loc6_ = "bd" (blue diamond), _loc7_ = "rd" (red diamond), _loc8_ = "gr" (green)

function parseLevelArray(str) {
  // The level array is a JavaScript-like nested array in AS3
  // Format: new Array(new Array(...), new Array(...), ...)
  // We need to extract each row

  // Remove "new Array(" prefix and trailing ")"
  // Handle variable substitutions: _loc6_, _loc7_, _loc8_
  str = str
    .replace(/_loc6_/g, '"bd"')
    .replace(/_loc7_/g, '"rd"')
    .replace(/_loc8_/g, '"gr"');

  const rows = [];
  let depth = 0;
  let current = "";
  let i = 0;

  // Skip "LevelArray = new Array("
  while (i < str.length && !str.startsWith("new Array(", i)) i++;
  i += "new Array(".length;

  // Parse each nested new Array(...)
  while (i < str.length) {
    const ch = str[i];
    if (ch === "(") depth++;
    else if (ch === ")") {
      depth--;
      if (depth === 0 && current.trim()) {
        // End of a row — parse the contents
        const rowStr = current;
        const values = [];
        let val = "";
        let inString = false;
        for (let j = 0; j < rowStr.length; j++) {
          const c = rowStr[j];
          if (c === '"') {
            inString = !inString;
            val += c;
          } else if (c === "," && !inString) {
            values.push(parseTileValue(val.trim()));
            val = "";
          } else {
            val += c;
          }
        }
        if (val.trim()) values.push(parseTileValue(val.trim()));
        rows.push(values);
        current = "";
      }
    } else if (depth > 0 && !(depth === 1 && ch === "," && str[i - 1] === ")")) {
      current += ch;
    }
    i++;
  }

  return rows;
}

function parseTileValue(v) {
  if (v.startsWith('"')) {
    // String-based tile (diamond type)
    return v.replace(/"/g, "");
  }
  const num = Number(v);
  return isNaN(num) ? v : num;
}

function parseVec2(str) {
  // Parse: new b2Vec2(15,4)
  const match = str.match(/new b2Vec2\(([^,]+),([^)]+)\)/);
  if (!match) return null;
  return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
}

function extractLevel(source, templeName) {
  const levels = [];

  // Find all level blocks: if(param2 == N) { ... }
  const levelRegex = /if\s*\(\s*param2\s*==\s*(\d+)\s*\)\s*\{/g;
  let match;

  while ((match = levelRegex.exec(source)) !== null) {
    const levelNum = parseInt(match[1]);
    const blockStart = match.index;

    // Find matching closing brace
    let depth = 1;
    let pos = blockStart + match[0].length;
    while (depth > 0 && pos < source.length) {
      if (source[pos] === "{") depth++;
      else if (source[pos] === "}") depth--;
      pos++;
    }
    const block = source.substring(blockStart, pos);

    const levelData = {
      temple: templeName,
      level: levelNum,
      tileMap: null,
      startFire: null,
      startWater: null,
      finish1: null,
      finish2: null,
      mechanisms: [],
    };

    // Extract LevelArray
    const arrayMatch = block.match(/LevelArray\s*=\s*(new Array\([\s\S]*?\)\);)/);
    if (arrayMatch) {
      levelData.tileMap = parseLevelArray(arrayMatch[0]);
    }

    // Extract start positions
    const fireMatch = block.match(/StartPosFire\s*=\s*(new b2Vec2\([^)]+\))/);
    if (fireMatch) levelData.startFire = parseVec2(fireMatch[1]);

    const waterMatch = block.match(/StartPosWater\s*=\s*(new b2Vec2\([^)]+\))/);
    if (waterMatch) levelData.startWater = parseVec2(waterMatch[1]);

    // Extract finish positions
    const finishRegex = /CreateFinish\(new b2Vec2\(([^)]+)\),new b2Vec2\(([^)]+)\)\)/;
    const finishMatch = block.match(finishRegex);
    if (finishMatch) {
      levelData.finish1 = { x: parseFloat(finishMatch[1].split(",")[0]), y: parseFloat(finishMatch[1].split(",")[1]) };
      levelData.finish2 = { x: parseFloat(finishMatch[2].split(",")[0]), y: parseFloat(finishMatch[2].split(",")[1]) };
    }

    // Extract mechanisms
    extractMechanisms(block, levelData.mechanisms);

    levels.push(levelData);
  }

  return levels;
}

function extractMechanisms(block, mechanisms) {
  // Pushers: CreatePusher(new b2Vec2(x,y),size,group,active);
  const pusherRegex = /CreatePusher\(new b2Vec2\(([^)]+)\),(\d+\.?\d*),(\d+),(true|false)\)/g;
  let m;
  while ((m = pusherRegex.exec(block)) !== null) {
    mechanisms.push({
      type: "pusher",
      pos: { x: parseFloat(m[1].split(",")[0]), y: parseFloat(m[1].split(",")[1]) },
      size: parseFloat(m[2]),
      group: parseInt(m[3]),
      active: m[4] === "true",
    });
  }

  // Levers: CreateLever(new b2Vec2(x,y),group,"onDir","offDir",state);
  const leverRegex = /CreateLever\(new b2Vec2\(([^)]+)\),(\d+),"([^"]+)","([^"]+)",(true|false)\)/g;
  while ((m = leverRegex.exec(block)) !== null) {
    mechanisms.push({
      type: "lever",
      pos: { x: parseFloat(m[1].split(",")[0]), y: parseFloat(m[1].split(",")[1]) },
      group: parseInt(m[2]),
      onDir: m[3],
      offDir: m[4],
      state: m[5] === "true",
    });
  }

  // Slide platforms: CreateSlidePlatform(new b2Vec2(p),w,h,new b2Vec2(d),range,start,end,"type",group);
  const slideRegex = /CreateSlidePlatform\(new b2Vec2\(([^)]+)\),([^,]+),([^,]+),new b2Vec2\(([^)]+)\),([^,]+),([^,]+),([^,]+),"([^"]+)",(\d+)\)/g;
  while ((m = slideRegex.exec(block)) !== null) {
    mechanisms.push({
      type: "slide_platform",
      pos: { x: parseFloat(m[1].split(",")[0]), y: parseFloat(m[1].split(",")[1]) },
      sizeW: parseFloat(m[2]),
      sizeH: parseFloat(m[3]),
      direction: { x: parseFloat(m[4].split(",")[0]), y: parseFloat(m[4].split(",")[1]) },
      range: parseFloat(m[5]),
      startOff: parseFloat(m[6]),
      endOff: parseFloat(m[7]),
      trigger: m[8],
      group: parseInt(m[9]),
    });
  }

  // Pulleys: CreatePulley(new b2Vec2(p1),new b2Vec2(p2),new b2Vec2(s1),new b2Vec2(s2),new b2Vec2(a1),new b2Vec2(a2));
  const pulleyRegex = /CreatePulley\(new b2Vec2\(([^)]+)\),new b2Vec2\(([^)]+)\),new b2Vec2\(([^)]+)\),new b2Vec2\(([^)]+)\),new b2Vec2\(([^)]+)\),new b2Vec2\(([^)]+)\)\)/g;
  while ((m = pulleyRegex.exec(block)) !== null) {
    mechanisms.push({
      type: "pulley",
      pos1: { x: parseFloat(m[1].split(",")[0]), y: parseFloat(m[1].split(",")[1]) },
      pos2: { x: parseFloat(m[2].split(",")[0]), y: parseFloat(m[2].split(",")[1]) },
      size1: { x: parseFloat(m[3].split(",")[0]), y: parseFloat(m[3].split(",")[1]) },
      size2: { x: parseFloat(m[4].split(",")[0]), y: parseFloat(m[4].split(",")[1]) },
      anchor1: { x: parseFloat(m[5].split(",")[0]), y: parseFloat(m[5].split(",")[1]) },
      anchor2: { x: parseFloat(m[6].split(",")[0]), y: parseFloat(m[6].split(",")[1]) },
    });
  }

  // Winds: CreateWind(new b2Vec2(c1),new b2Vec2(c2),strength,group,"dir",active);
  const windRegex = /CreateWind\(new b2Vec2\(([^)]+)\),new b2Vec2\(([^)]+)\),([^,]+),(\d+),"([^"]+)",(true|false)\)/g;
  while ((m = windRegex.exec(block)) !== null) {
    mechanisms.push({
      type: "wind",
      corner1: { x: parseFloat(m[1].split(",")[0]), y: parseFloat(m[1].split(",")[1]) },
      corner2: { x: parseFloat(m[2].split(",")[0]), y: parseFloat(m[2].split(",")[1]) },
      strength: parseFloat(m[3]),
      group: parseInt(m[4]),
      direction: m[5],
      active: m[6] === "true",
    });
  }

  // Balls: CreateBall(new b2Vec2(pos));
  const ballRegex = /CreateBall\(new b2Vec2\(([^)]+)\)\)/g;
  while ((m = ballRegex.exec(block)) !== null) {
    mechanisms.push({
      type: "ball",
      pos: { x: parseFloat(m[1].split(",")[0]), y: parseFloat(m[1].split(",")[1]) },
    });
  }

  // Moving boxes: CreateMovingBox(new b2Vec2(pos),new b2Vec2(size));
  const boxRegex = /CreateMovingBox\(new b2Vec2\(([^)]+)\),new b2Vec2\(([^)]+)\)\)/g;
  while ((m = boxRegex.exec(block)) !== null) {
    mechanisms.push({
      type: "moving_box",
      pos: { x: parseFloat(m[1].split(",")[0]), y: parseFloat(m[1].split(",")[1]) },
      size: { x: parseFloat(m[2].split(",")[0]), y: parseFloat(m[2].split(",")[1]) },
    });
  }

  // Romans/crushers: CreatRoman(new b2Vec2(pos),width,height,"dir");
  const romanRegex = /CreatRoman\(new b2Vec2\(([^)]+)\),([^,]+),([^,]+),"([^"]+)"\)/g;
  while ((m = romanRegex.exec(block)) !== null) {
    mechanisms.push({
      type: "roman",
      pos: { x: parseFloat(m[1].split(",")[0]), y: parseFloat(m[1].split(",")[1]) },
      width: parseFloat(m[2]),
      height: parseFloat(m[3]),
      direction: m[4],
    });
  }

  // Hanging platforms: CreateHangingPlatform(new b2Vec2(pos),new b2Vec2(size),length,"dir");
  const hangRegex = /CreateHangingPlatform\(new b2Vec2\(([^)]+)\),new b2Vec2\(([^)]+)\),([^,]+),"([^"]+)"\)/g;
  while ((m = hangRegex.exec(block)) !== null) {
    mechanisms.push({
      type: "hanging_platform",
      pos: { x: parseFloat(m[1].split(",")[0]), y: parseFloat(m[1].split(",")[1]) },
      size: { x: parseFloat(m[2].split(",")[0]), y: parseFloat(m[2].split(",")[1]) },
      length: parseFloat(m[3]),
      direction: m[4],
    });
  }

  // Rotating platforms: CreateRotPlatform(new b2Vec2(pos),hx,hy,angle,speed,offset,group,"dir",active);
  const rotRegex = /CreateRotPlatform\(new b2Vec2\(([^)]+)\),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),(\d+),"([^"]+)",(\d+)\)/g;
  while ((m = rotRegex.exec(block)) !== null) {
    mechanisms.push({
      type: "rot_platform",
      pos: { x: parseFloat(m[1].split(",")[0]), y: parseFloat(m[1].split(",")[1]) },
      hx: parseFloat(m[2]),
      hy: parseFloat(m[3]),
      angle: parseFloat(m[4]),
      speed: parseFloat(m[5]),
      offset: parseFloat(m[6]),
      group: parseInt(m[7]),
      direction: m[8],
      active: parseInt(m[9]),
    });
  }
}

function extractGameData(source, templeName) {
  const data = { temple: templeName, adjacencies: [], translation: [], timeTable: [] };

  // Extract Translation array (level ID mapping: "1_1", "3_2", etc.)
  const transMatch = source.match(/Translation\s*=\s*new Array\(([^)]+)\)/);
  if (transMatch) {
    data.translation = transMatch[1]
      .split(",")
      .map(s => s.trim().replace(/"/g, ""));
  }

  // Extract TimeTable (par times)
  const timeMatch = source.match(/TimeTable\s*=\s*new Array\(([^)]+)\)/);
  if (timeMatch) {
    data.timeTable = timeMatch[1]
      .split(",")
      .map(s => parseFloat(s.trim()) || 0);
  }

  // Extract Adjacencies (level progression graph)
  const adjMatch = source.match(/Adjacencies\s*=\s*new Array\(([\s\S]*?)\);/);
  if (adjMatch) {
    // Parse the nested array structure
    const adjStr = adjMatch[1];
    const groups = adjStr.match(/new Array\(([^)]+)\)/g);
    if (groups) {
      data.adjacencies = groups.map(g => {
        const nums = g.match(/\d+/g);
        return nums ? nums.map(Number) : [];
      });
    }
  }

  return data;
}

// Main extraction
function main() {
  const allLevels = [];
  const gameData = [];

  fs.mkdirSync(OUTPUT, { recursive: true });

  for (const temple of TEMPLES) {
    const levelPath = path.join(SOURCE, temple, "scripts", "level.as");
    const gamePath = path.join(SOURCE, temple, "scripts", "Game.as");

    if (!fs.existsSync(levelPath)) {
      console.warn(`Missing: ${levelPath}`);
      continue;
    }

    console.log(`Processing ${temple}...`);

    const levelSource = fs.readFileSync(levelPath, "utf8");
    const levels = extractLevel(levelSource, temple);
    console.log(`  Extracted ${levels.length} levels`);
    allLevels.push(...levels);

    if (fs.existsSync(gamePath)) {
      const gameSource = fs.readFileSync(gamePath, "utf8");
      const gd = extractGameData(gameSource, temple);
      gameData.push(gd);
      console.log(`  Game data: ${gd.translation.length} translations, ${gd.timeTable.length} times, ${gd.adjacencies.length} adjacencies`);
    }

    // Write per-temple level data
    const templeKey = temple.toLowerCase().replace(" ", "-");
    fs.writeFileSync(
      path.join(OUTPUT, `${templeKey}-levels.json`),
      JSON.stringify(levels, null, 2)
    );
  }

  // Write combined data
  fs.writeFileSync(
    path.join(OUTPUT, "all-levels.json"),
    JSON.stringify(allLevels, null, 2)
  );
  fs.writeFileSync(
    path.join(OUTPUT, "game-data.json"),
    JSON.stringify(gameData, null, 2)
  );

  console.log(`\nTotal: ${allLevels.length} levels across ${TEMPLES.length} temples`);
  console.log(`Output: ${OUTPUT}/`);

  // Print summary
  for (const temple of TEMPLES) {
    const count = allLevels.filter(l => l.temple === temple).length;
    const mechCount = allLevels
      .filter(l => l.temple === temple)
      .reduce((sum, l) => sum + l.mechanisms.length, 0);
    console.log(`  ${temple}: ${count} levels, ${mechCount} mechanisms`);
  }
}

main();
