import os
import sys
import json
from pathlib import Path
from datetime import datetime

# Priority configuration files (ordered by importance)
PRIORITY_FILES = [
    "package.json",
    "astro.config.mjs",
    "tailwind.config.cjs",
    "tsconfig.json",
    ".env",
    ".gitignore",
    ".eslintrc",
    ".prettierrc",
    "public/robots.txt",
    "public/sitemap.xml"
]

def read_file_content(file_path):
    """Read and return the content of a file with error handling."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read().strip()
    except Exception as e:
        return f"Error reading file: {str(e)}"

def get_file_importance(file_name):
    """Return priority index for sorting (lower = more important)."""
    try:
        return PRIORITY_FILES.index(file_name)
    except ValueError:
        return len(PRIORITY_FILES)

def extract_config_files(base_dir, output_file):
    """Extract and format configuration files with priority sorting."""
    with open(output_file, 'w', encoding='utf-8') as out_file:
        # Header with timestamp
        out_file.write(f"# PRECIO HOGAR - CONFIGURATION SUMMARY\n\n")
        out_file.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        out_file.write(f"Project: {os.path.basename(base_dir)}\n\n")
        
        # Process priority files first
        for file_name in sorted(PRIORITY_FILES, key=get_file_importance):
            file_path = os.path.join(base_dir, file_name)
            
            if os.path.exists(file_path):
                content = read_file_content(file_path)
                out_file.write(f"## {file_name}\n\n")
                
                # Format content based on file type
                if file_name.endswith('.json'):
                    try:
                        json_content = json.loads(content)
                        out_file.write("```json\n")
                        out_file.write(json.dumps(json_content, indent=2, ensure_ascii=False))
                        out_file.write("\n```\n\n")
                    except:
                        out_file.write(f"```\n{content}\n```\n\n")
                else:
                    out_file.write(f"```\n{content}\n```\n\n")
            else:
                out_file.write(f"## {file_name}\n\n")
                out_file.write(f"⚠️ File not found\n\n")

        # Add project structure summary
        out_file.write("## Project Structure Summary\n\n")
        out_file.write("```\n")
        for root, dirs, files in os.walk(base_dir):
            level = root.replace(base_dir, '').count(os.sep)
            if level > 2:  # Limit depth to 2 levels for summary
                continue
            indent = ' ' * 4 * level
            out_file.write(f"{indent}{os.path.basename(root)}/\n")
            sub_indent = ' ' * 4 * (level + 1)
            for f in sorted(files)[:5]:  # Show max 5 files per directory
                out_file.write(f"{sub_indent}{f}\n")
        out_file.write("```\n")

if __name__ == "__main__":
    base_dir = os.path.dirname(os.path.abspath(__file__))
    output_file = os.path.join(base_dir, "config_summary.md")
    
    print(f"Generating configuration summary for {base_dir}")
    extract_config_files(base_dir, output_file)
    print(f"Summary saved to {output_file}")