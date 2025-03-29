---
title: PEview
aliases:
  - PEview
tags:
  - Malware-Analysis
  - Windows
---
PEview is a lightweight, standalone application designed for examining the internal structure of Portable Executable (PE) files on Windows systems.
# Downloading and Installing PEview
---
- Download the application from the official website: [PEview Download](http://wjradburn.com/software/PEview.zip). 
- After downloading, extract the ZIP file to a directory of your choice. 
- Simply run `PEview.exe` to launch the program.

# Navigating the PEview Interface
---
Upon launching PEview, you'll be presented with a dual-pane interface:

- **Left Pane**: Displays a hierarchical tree view of the PE file's structure, including headers and sections.
- **Right Pane**: Shows detailed information corresponding to the item selected in the left pane.

	![[images/Pasted image 20250228125010.png]]

This intuitive layout allows users to easily navigate through different components of the PE file and inspect their properties.

# Analyzing a File

To analyze a file:

1. **Open a File**: Click on `File` in the menu bar and select `Open`, then choose the PE file you wish to examine.
2. **Explore the Structure**: Use the left pane to navigate through various sections such as DOS Header, NT Headers, and Section Headers.
3. **View Details**: Selecting an item in the left pane will display its detailed information in the right pane, including hexadecimal data and ASCII representations.

For example, examining the **Import Table** reveals functions that the executable imports from other libraries, which can provide insights into the program's functionality.

![[images/Pasted image 20250228125201.png]]

---
## Export Table
![[images/Pasted image 20250329124026.png]]
## Exported function with only an ordinal number
![[images/Pasted image 20250329124056.png]]
For a visual demonstration of PEview's capabilities, consider watching the following video:

- https://youtu.be/VCa1yeqCnCs?si=L30Sg6FfKZkFVt0f