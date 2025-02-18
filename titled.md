```bash
┌──(kali㉿kali)-[~]
└─$ find /etc -name "*mail*"

┌──(kali㉿kali)-[~]
└─$ find / -type f -size +100M

┌──(kali㉿kali)-[~]
└─$ find . -mtime +30

┌──(kali㉿kali)-[~]
└─$ find . –mtime -5

┌──(kali㉿kali)-[~]
└─$ find / -type f -name *.tar.gz -size +100M -exec ls -l {}\;

┌──(kali㉿kali)-[~]
└─$ find / -type f -name *.tar.gz -size +100M -exec rm -f {}\;

┌──(kali㉿kali)-[~]
└─$ find /home/voldemort -type f -mtime +60 | xargs tar -cvf
/tmp/`date '+%d%m%Y'_archive.tar`


┌──(voldemort🔥IdeaPad)-[~]
└─$ cat nc.py > /dev/null
┌──(voldemort🔥IdeaPad)-[~]
└─$ ./nc.py /dev/null

┌──(voldemort🔥IdeaPad)-[~]
└─$ python3 nc.py /dev/null

┌──(voldemort🔥IdeaPad)-[~]
└─$ cat invalid-file-name.txt 2> /dev/null

┌──(voldemort🔥IdeaPad)-[~]
└─$ python3 nc.py 2> /dev/null

┌──(voldemort🔥IdeaPad)-[~]
└─$ 30 1 * * * command > /dev/null 2>&1


┌──(voldemort🔥IdeaPad)-[~]
└─$ cat name.txt
1 John
2 Dom
3 Eliot
4 Ram

┌──(voldemort🔥IdeaPad)-[~]
└─$ cat id.txt 
1 001
2 002
3 003
4 004
┌──(voldemort🔥IdeaPad)-[~]
└─$ join name.txt id.txt
1 John 001
2 Dom 002
3 Eliot 003
4 Ram 004


┌──(voldemort🔥IdeaPad)-[~]
└─$ cat name.txt
1 John
2 Dom
3 Eliot
4 Ram

┌──(voldemort🔥IdeaPad)-[~]
└─$ tr a-z A-Z < name.txt
1 JOHN
2 DOM
3 ELIOT
4 RAM


┌──(voldemort🔥IdeaPad)-[~]
└─$ cat NAME.txt 
1 JOHN
2 DOM
3 ELIOT
4 RAM

┌──(voldemort🔥IdeaPad)-[~]
└─$ tr A-Z a-z < NAME.txt 
1 john
2 dom
3 eliot
4 ram


```