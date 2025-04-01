import os
import sys
import json
import shutil
from pathlib import Path

def read_file_content(file_path):
    """Read and return the content of a file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Error reading file: {str(e)}"

def extract_config_files(base_dir, output_file):
    """Extract configuration files and write their content to the output file."""
    # Define the configuration files to extract
    config_files = [
        "package.json",
        "astro.config.mjs",
        "tailwind.config.cjs",
        "tsconfig.json",
        ".gitignore",
        "public/robots.txt",
        "public/sitemap.xml",
        ".gitattributes"
    ]
    
    with open(output_file, 'w', encoding='utf-8') as out_file:
        out_file.write("# PRECIO HOGAR - CONFIGURATION FILES\n\n")
        out_file.write(f"Project directory: {base_dir}\n")
        out_file.write("Date: " + os.popen('date /t').read().strip() + "\n\n")
        
        for file_name in config_files:
            file_path = os.path.join(base_dir, file_name)
            if os.path.exists(file_path):
                out_file.write(f"## {file_name}\n\n")
                out_file.write("```\n")
                out_file.write(read_file_content(file_path))
                out_file.write("\n```\n\n")
            else:
                out_file.write(f"## {file_name}\n\n")
                out_file.write(f"File not found: {file_path}\n\n")
        
        # Also extract product data structure (first few items)
        product_files = [f for f in os.listdir(os.path.join(base_dir, "src", "productos")) 
                         if f.endswith('.json')]
        
        if product_files:
            sample_file = product_files[0]
            file_path = os.path.join(base_dir, "src", "productos", sample_file)
            out_file.write(f"## Product Data Structure (sample from {sample_file})\n\n")
            out_file.write("```json\n")
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    # Only show first 2 items to keep it concise
                    if isinstance(data, list) and len(data) > 0:
                        sample_data = data[:2]
                        out_file.write(json.dumps(sample_data, indent=2, ensure_ascii=False))
                    else:
                        out_file.write(json.dumps(data, indent=2, ensure_ascii=False))
            except Exception as e:
                out_file.write(f"Error reading product data: {str(e)}")
            out_file.write("\n```\n\n")
        
        # Add project structure
        out_file.write("## Project Structure\n\n")
        out_file.write("```\n")
        structure_file = os.path.join(base_dir, "estructura.txt")
        if os.path.exists(structure_file):
            out_file.write(read_file_content(structure_file))
        else:
            # Generate a simplified structure
            out_file.write("Main directories:\n")
            for item in os.listdir(base_dir):
                if os.path.isdir(os.path.join(base_dir, item)) and not item.startswith('.'):
                    out_file.write(f"- {item}/\n")
        out_file.write("```\n")

if __name__ == "__main__":
    # Get the base directory of the project
    base_dir = os.path.dirname(os.path.abspath(__file__))
    output_file = os.path.join(base_dir, "configuracion.txt")
    
    print(f"Extracting configuration files from {base_dir}")
    extract_config_files(base_dir, output_file)
    print(f"Configuration files have been extracted to {output_file}")