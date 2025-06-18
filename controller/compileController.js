import fs from "fs";
import path from "path";
import { exec } from "child_process";
import fsExtra from "fs-extra"; // safer file handling

export const compileCode = (req, res) => {
  const latexCode = req.body.latex;

  if (!latexCode) {
    return res.status(400).json({ error: "No LaTeX code provided." });
  }

  const tempDir = path.join(process.cwd(), "temp");

  // Ensure temp directory exists
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const texPath = path.join(tempDir, "resume.tex");

  // Write LaTeX string to file
  fs.writeFileSync(texPath, latexCode, "utf8");

  // Compile with pdflatex
  exec(`pdflatex -output-directory=${tempDir} ${texPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error("LaTeX compilation error:", stderr);
      return res.status(500).json({ error: "LaTeX compilation failed." });
    }

    const pdfPath = path.join(tempDir, "resume.pdf");

    // Send PDF and cleanup safely
   res.download(pdfPath, "resume.pdf", () => {
  setTimeout(() => {
    try {
      fsExtra.emptyDirSync(tempDir);  // delete contents
      fsExtra.removeSync(tempDir);    // delete folder
      console.log("✅ Temp files cleaned.");
    } catch (cleanupError) {
      console.warn("⚠️ Cleanup failed:", cleanupError.message);
    }
  }, 1000); // wait 1 second before deleting
});
  });
};
