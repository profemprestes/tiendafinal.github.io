import os
import sys

def list_directory_structure(startpath, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(f"Directory structure of {startpath}:\n\n")
        
        for root, dirs, files in os.walk(startpath):
            level = root.replace(startpath, '').count(os.sep)
            indent = ' ' * 4 * level
            f.write(f"{indent}{os.path.basename(root)}/\n")
            sub_indent = ' ' * 4 * (level + 1)
            
            # Sort directories and files for better readability
            dirs.sort()
            files.sort()
            
            for file in files:
                f.write(f"{sub_indent}{file}\n")

if __name__ == "__main__":
    # Define the directory to scan and output file
    directory_to_scan = r"G:\01-Tienda\certain-corot\tiendafinal\src"
    output_file = r"G:\01-Tienda\certain-corot\tiendafinal\estructura.txt"
    
    # Check if directory exists
    if not os.path.exists(directory_to_scan):
        print(f"Error: Directory {directory_to_scan} does not exist.")
        sys.exit(1)
    
    # Generate the directory structure
    list_directory_structure(directory_to_scan, output_file)
    print(f"Directory structure has been written to {output_file}")