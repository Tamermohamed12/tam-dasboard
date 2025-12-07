# How to Upload This Project to GitHub

Follow these steps to upload your React dashboard project to GitHub:

## Prerequisites

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/download/win
   - Or use: `winget install Git.Git` in PowerShell

2. **Create a GitHub Account** (if you don't have one):
   - Go to: https://github.com
   - Sign up for a free account

## Step-by-Step Instructions

### Step 1: Initialize Git Repository

Open PowerShell or Command Prompt in the `app-dasboard` folder and run:

```bash
cd app-dasboard
git init
```

### Step 2: Add All Files

```bash
git add .
```

### Step 3: Create Initial Commit

```bash
git commit -m "Initial commit: T.alisson Dashboard Application"
```

### Step 4: Create Repository on GitHub

1. Go to https://github.com
2. Click the **"+"** icon in the top right
3. Select **"New repository"**
4. Enter repository name (e.g., `t-alisson-dashboard` or `t-alisson`)
5. Choose **Public** or **Private**
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

### Step 5: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Alternative: Using GitHub Desktop

If you prefer a GUI:

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in with your GitHub account
3. Click **"File"** → **"Add Local Repository"**
4. Select the `app-dasboard` folder
5. Click **"Publish repository"**
6. Enter repository name and description
7. Click **"Publish Repository"**

## Quick Command Summary

```bash
# Navigate to project folder
cd app-dasboard

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: T.alisson Dashboard Application"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## After Uploading

Your project will be available at:
`https://github.com/YOUR_USERNAME/REPO_NAME`

## Future Updates

To update your repository after making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

## Troubleshooting

### If Git is not recognized:
- Make sure Git is installed and added to PATH
- Restart your terminal/PowerShell after installation

### If you get authentication errors:
- Use GitHub Personal Access Token instead of password
- Generate token at: https://github.com/settings/tokens

### If you need to change remote URL:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

## Need Help?

- Git Documentation: https://git-scm.com/doc
- GitHub Help: https://docs.github.com

