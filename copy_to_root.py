import os
import shutil

source_dir = r"C:\Users\User\.gemini\antigravity\scratch\walletbeds"
dest_dir = r"C:\Users\User\.gemini\antigravity\scratch"

files_to_copy = [
    "index.html",
    "privacy-policy.html",
    "refund-policy.html",
    "terms-of-service.html",
    "style.css",
    "script.js"
]

folders_to_copy = [
    "images"
]

print("Starting local file copy to root scratch folder:")

# Copy files
for filename in files_to_copy:
    src_file = os.path.join(source_dir, filename)
    dest_file = os.path.join(dest_dir, filename)
    if os.path.exists(src_file):
        shutil.copy2(src_file, dest_file)
        print(f"[OK] Copied file: {filename} -> root")
    else:
        print(f"[FAIL] Source file not found: {filename}")

# Copy folders
for foldername in folders_to_copy:
    src_folder = os.path.join(source_dir, foldername)
    dest_folder = os.path.join(dest_dir, foldername)
    if os.path.exists(src_folder):
        if os.path.exists(dest_folder):
            shutil.rmtree(dest_folder)
        shutil.copytree(src_folder, dest_folder)
        print(f"[OK] Copied folder: {foldername} -> root")
    else:
        print(f"[FAIL] Source folder not found: {foldername}")

print("\nAll files successfully synced to root!")
