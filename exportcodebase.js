const fs = require("fs");
const path = require("path");

// Add folders to ignore here
const foldersToIgnore = [
  "vendor",
  "bin",
  "db",
  "llm_text_transcripts",
  "public",
  "storage",
  "log",
  "test",
  "tmp",
  "app/assets",
  ".git",
  "git",
]; // Add specific files to ignore here
const filesToIgnore = [".DS_Store"];

// Add media file extensions to ignore here
const mediaExtensions = [
  // Images
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".tiff",
  ".webp",
  // Audio
  ".mp3",
  ".wav",
  ".ogg",
  ".flac",
  ".aac",
  // Video
  ".mp4",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".webm",
  // Other media
  ".pdf",
  ".psd",
  ".ai",
  ".eps",
];

function isMediaFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mediaExtensions.includes(ext);
}

async function collectFiles(currentDir, indent = "") {
  const selectedFiles = [];
  const files = await fs.promises.readdir(currentDir);

  for (const file of files) {
    const filePath = path.join(currentDir, file);
    const stats = await fs.promises.stat(filePath);

    if (stats.isDirectory()) {
      if (!foldersToIgnore.includes(file)) {
        console.log(`${indent}${file}/`);
        const subFiles = await collectFiles(filePath, indent + "  ");
        selectedFiles.push(...subFiles);
      }
    } else if (!isMediaFile(filePath) && !filesToIgnore.includes(file)) {
      console.log(`${indent}${file}`);
      selectedFiles.push(filePath);
    }
  }

  return selectedFiles;
}

async function mergeFiles(selectedFiles, outputFilePath) {
  let mergedContent = "";

  for (const filePath of selectedFiles) {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    const sectionHeader = `\n${filePath.toUpperCase()} CODE IS BELOW\n`;
    mergedContent += sectionHeader + fileContent + "\n";
  }

  await fs.promises.writeFile(outputFilePath, mergedContent);
}

async function createOutputDirectory(outputDirPath) {
  try {
    await fs.promises.access(outputDirPath);
  } catch (error) {
    await fs.promises.mkdir(outputDirPath);
  }
}

function getTimestampedFileName() {
  const timestamp = new Date().toISOString().replace(/:/g, "-");
  return `merged-repo-${timestamp}.txt`;
}

async function main() {
  const currentDir = process.cwd();

  console.log("Collecting files and folders to include in the merge:");
  const selectedFiles = await collectFiles(currentDir);

  const outputDirName = "llm_text_transcripts";
  const outputDirPath = path.join(currentDir, outputDirName);
  await createOutputDirectory(outputDirPath);

  const outputFileName = getTimestampedFileName();
  const outputFilePath = path.join(outputDirPath, outputFileName);
  await mergeFiles(selectedFiles, outputFilePath);

  console.log(`Merged repository saved to: ${outputFilePath}`);
}

main().catch(console.error);
