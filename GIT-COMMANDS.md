# Git Commands Reference for This Project

This document lists common Git commands used for this repository and how to handle typical workflows on macOS.

## Repository Setup

```bash
# Initialize repository in current folder
git init

# Create initial commit
git add -A
git commit -m "chore: initial commit for Vite React TS app"

# Set default branch to main (if needed)
git branch -M main
```

## Configure Identity

```bash
# Global (recommended for all repos on your machine)
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Per-repo (run inside this project if you prefer local-only config)
git config user.name "Your Name"
git config user.email "you@example.com"

# Verify what is set and where
git config --list --show-origin | grep '^user\.'
```

## Working With Remotes (GitHub)

```bash
# View current remotes
git remote -v

# Set HTTPS remote (replace with your repo URL)
git remote set-url origin https://github.com/YourUser/YourRepo.git
# Or add if origin doesn't exist yet
git remote add origin https://github.com/YourUser/YourRepo.git
```

## Push (HTTPS + Personal Access Token)

```bash
# Stage and commit changes
git add -A
git commit -m "feat: implement study, quiz, redo, and stats"

# Use macOS Keychain for credentials
git config --global credential.helper osxkeychain

# First push (you will be prompted for username + PAT as password)
git push -u origin main
```

Notes:
- GitHub does not accept account passwords for Git over HTTPS. Use a Personal Access Token (PAT).
- Pasted credentials at the prompt are invisible by design; just press Enter after pasting.

## Credential Troubleshooting (macOS Keychain)

```bash
# Clear a bad saved credential for github.com
printf "protocol=https\nhost=github.com\n" | git credential-osxkeychain erase

# Manually store credentials (replace placeholders)
printf "protocol=https\nhost=github.com\nusername=YOUR_USER\npassword=YOUR_TOKEN\n" | git credential-osxkeychain store

# Test retrieval
printf "protocol=https\nhost=github.com\n" | git credential-osxkeychain get
```

Make sure your remote is HTTPS (`https://github.com/...`) so the osxkeychain helper applies.

## View History

```bash
# Full log (press q to exit, space to scroll)
git log

# Compact, with graph
git log --oneline --graph --decorate --all

# Last 10 commits
git log -n 10 --oneline

# History for a specific file
git log -- path/to/file
```

## Amending the Last Commit (e.g., after fixing identity)

```bash
git commit --amend --reset-author --no-edit

# If the commit was already pushed and you truly must overwrite:
git push --force-with-lease
```

## SSH Alternative (Optional)

```bash
# Generate an SSH key (macOS)
ssh-keygen -t ed25519 -C "you@example.com"

# Start agent and add key (persist in Keychain)
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519

# Copy public key and add it to GitHub → Settings → SSH and GPG keys
pbcopy < ~/.ssh/id_ed25519.pub

# Switch origin to SSH
git remote set-url origin git@github.com:YourUser/YourRepo.git

# Test connection
ssh -T git@github.com

# Push
git push -u origin main
```

If you see a prompt like “Are you sure you want to continue connecting (yes/no)?” on first SSH use, type `yes` to trust GitHub’s host key.

## Common Status Commands

```bash
git status
git remote -v
```

---
Keep this file updated as your workflow evolves. For issues with authentication, double-check the remote URL, your PAT scopes (or SSH key), and any saved credentials in Keychain Access. 


