---
title: How an Auto-Commit Script Typically Works
aliases:
  - How an Auto-Commit Script Typically Works
tags:
  - Python
  - Bash
---

![[images/Pasted image 20250120145738.png]]
# How an Auto-Commit Script Typically Works: Manipulating Git History for Fake Commits
---
In the world of software development, GitHub contribution graphs have become a visual representation of a developer's activity. Many developers are proud of their green squares, which reflect their commitment to writing code. However, some may be tempted to manipulate these graphs by creating fake commits to make it look like they’ve been more active than they really are. While this may seem like an innocent or harmless effort to boost visibility, it can have unintended consequences.

In this blog, we will walk through how an automated "auto-commit" script works to fake contributions, the technical steps involved, and the ethical considerations surrounding this practice.

---
## 1. **Set Up the Local Repository**

The first step in using an auto-commit script is to set up a local Git repository. This can either be done by cloning a repository the user already owns or creating a fresh new one.

Here’s how you can do it:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

Once the repository is cloned or initialized, you are ready to start creating fake commits.

---
## 2. **Make Fake Commits with Custom Dates**

The heart of this process lies in the ability to manipulate commit dates. The `git commit` command allows users to set a custom commit date by using the `--date` flag. By backdating commits, users can simulate activity that took place on different days, making it look like they’ve been coding consistently over time.

For example, a commit on January 19, 2025, would look like this:

```bash
git commit --date="2025-01-19 12:00:00" -m "Fake commit for January 19, 2025"
```

In this command, the `--date` flag explicitly sets the commit date to January 19, 2025. A script can be created to loop through a range of dates and generate multiple fake commits on different days, all of which will appear on your contribution graph as if they were made over a period of time.

---
## 3. **Push Commits to GitHub**

Once the fake commits are created locally, the next step is to push them to the remote GitHub repository. The following command pushes your local commits to GitHub:

```bash
git push origin main
```

At this point, the commits are now visible on GitHub, and your contribution graph will reflect them as if they were real contributions.

---
## 4. **Automating the Process (Script Example)**

To automate this process, developers often write Python or Bash scripts. These scripts can generate a specified number of fake commits, each with a custom date, and then push them to the GitHub repository.

### Python Script Example

A simple Python script could look like this:

```python
import subprocess
import time
from datetime import datetime, timedelta

# Configuration
repo_path = "/path/to/your/repo"  # Local Git repo path
start_date = datetime(2024, 1, 1)  # Start date for backdating commits
num_commits = 50  # Number of commits to create
commit_message = "Fake commit to inflate contribution graph"

# Function to make a commit with a specific date
def make_commit(commit_date):
    subprocess.run(["git", "add", "."])  # Stage all changes
    commit_date_str = commit_date.strftime("%a %b %d %H:%M:%S %Y")
    subprocess.run(["git", "commit", "--date", commit_date_str, "-m", commit_message])

# Navigate to the repository
subprocess.run(["cd", repo_path])

# Loop to create fake commits
for i in range(num_commits):
    commit_date = start_date + timedelta(days=i)
    make_commit(commit_date)
    time.sleep(1)  # Ensure a short delay between commits to avoid detection

# Push all commits to GitHub
subprocess.run(["git", "push", "origin", "main"])
```

This script will:

- Navigate to the local repository.
- Create a set number of fake commits (in this case, 50), each on a different date starting from January 1, 2024.
- Push those commits to GitHub.

### Bash Script Example

Alternatively, a simple Bash script can achieve the same goal:

```bash
#!/bin/bash

# Configuration
repo_path="/path/to/your/repo"
start_date="2024-01-01"
num_commits=50
commit_message="Fake commit for contribution graph"

# Navigate to the repository
cd $repo_path

# Loop to make fake commits
for i in $(seq 1 $num_commits); do
  commit_date=$(date -d "$start_date +$i days" "+%a %b %d %H:%M:%S %Y")
  git add .
  git commit --date="$commit_date" -m "$commit_message"
done

# Push commits to GitHub
git push origin main
```

This Bash script does the following:

- Navigates to the Git repository.
- Generates fake commits by manipulating the commit dates.
- Pushes the commits to GitHub.

---
## 5. **Tools and Libraries**

To streamline the process, developers may use tools like:

- **Cron jobs**: For scheduling commits at specific times.
- **GitHub APIs**: To trigger actions on GitHub from external scripts (though typically this is used for genuine contributions).
- **Other repositories**: Some developers might even create fake contributions to repositories they do not own, to diversify their contribution graph.

---
## 6. **Ethical Considerations**

Although it may be tempting to inflate your contributions for the sake of appearance, it’s important to recognize the ethical implications of such actions.

### GitHub's Stance

GitHub may identify suspicious patterns of activity, such as a sudden surge of commits within a short period of time, and could take actions like disabling accounts or flagging them for review. This could damage your reputation or cause your account to be suspended.

### The Impact of Fake Contributions

While artificially inflating your contribution graph may give the impression of activity, it doesn’t accurately reflect your skills or contributions. Potential employers or collaborators may notice the discrepancies, and it can undermine the trust others place in your work.

### Alternative Ways to Improve Contributions

Instead of faking activity, focus on genuine ways to boost your contribution graph:

- **Contribute to open source projects**.
- **Start personal projects** and share them publicly.
- **Participate in hackathons** or coding challenges.
- **Collaborate with others** in the development community.

These activities will not only improve your GitHub contribution graph but will also help you grow as a developer and build a genuine portfolio of work.

---

**Conclusion**

While auto-commit scripts can be an interesting technical challenge, it's crucial to weigh the ethical implications before deciding to use them. The temptation to inflate your contribution graph is understandable, but genuine, consistent effort and real contributions are always the best way to grow as a developer and build a trustworthy professional reputation.