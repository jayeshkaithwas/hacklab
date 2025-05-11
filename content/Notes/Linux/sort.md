---
title: sort
aliases:
  - sort
tags:
  - Linux
  - Bash
description: Sort command sorts the lines of a text file.
---
# Examples
---
```sh
voldemort@IdeaPad:~$ cat name.txt 
John:Marketing:5
Mike:Product:2
Anne:Sales:1
Tom:Support:4
Harry:Sales:3
```

## Sort Text in Ascending order
```sh
voldemort@IdeaPad:~$ sort name.txt 
Anne:Sales:1
Harry:Sales:3
John:Marketing:5
Mike:Product:2
Tom:Support:4
```

## Sort Text in Descending order
```sh
voldemort@IdeaPad:~$ sort -r name.txt 
Tom:Support:4
Mike:Product:2
John:Marketing:5
Harry:Sales:3
Anne:Sales:1
```

## Sort by delimiting first colon 
```sh
voldemort@IdeaPad:~$ sort -t: -k 2 name.txt 
John:Marketing:5
Mike:Product:2
Anne:Sales:1
Harry:Sales:3
Tom:Support:4
```

## Sort by delimiting first colon and suppress duplicates


## Sort by delimiting second colon
```sh
voldemort@IdeaPad:~$ sort -t: -k 3 name.txt 
Anne:Sales:1
Mike:Product:2
Harry:Sales:3
Tom:Support:4
John:Marketing:5
```


# Sort + uniq
---
```sh
voldemort@IdeaPad:~$ cat name.txt 
John:Marketing:5
Mike:Product:2
Anne:Sales:1
Tom:Support:4
Harry:Sales:3
Anne:Sales:1
Tom:Support:4
```

## Sort Unique entries
```sh
voldemort@IdeaPad:~$ sort -u name.txt 
Anne:Sales:1
Harry:Sales:3
John:Marketing:5
Mike:Product:2
Tom:Support:4
voldemort@IdeaPad:~$ sort name.txt | uniq
Anne:Sales:1
Harry:Sales:3
John:Marketing:5
Mike:Product:2
Tom:Support:4
```

## Sort and Count duplicate entries
```sh
voldemort@IdeaPad:~$ sort name.txt | uniq -c
      2 Anne:Sales:1
      1 Harry:Sales:3
      1 John:Marketing:5
      1 Mike:Product:2
      2 Tom:Support:4
```

## Sort and Display only duplicate entries
```sh
voldemort@IdeaPad:~$ sort name.txt | uniq -cd
      2 Anne:Sales:1
      2 Tom:Support:4
```