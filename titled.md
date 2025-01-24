```bash
┌──(kali㉿kali)-[~]
└─$ grep kali /etc/passwd
kali:x:1000:1000:,,,:/home/kali:/usr/bin/zsh

┌──(kali㉿kali)-[~]
└─$ grep -v kali /etc/passwd
root:x:0:0:root:/root:/usr/bin/zsh
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
    
┌──(kali㉿kali)-[~]
└─$ grep -c kali /etc/passwd
1

┌──(kali㉿kali)-[~]
└─$ grep -cv kali /etc/passwd
3

┌──(kali㉿kali)-[~]
└─$ grep -i kali /etc/passwd
kali:x:1000:1000:,,,:/home/kali:/usr/bin/zsh

┌──(kali㉿kali)-[~]
└─$ grep -i Kali /etc/passwd
kali:x:1000:1000:,,,:/home/kali:/usr/bin/zsh

┌──(kali㉿kali)-[~]
└─$ grep -ri kali /tmp      
/tmp/dir1/test.txt:Hi Kali,
/tmp/users.txt:Kali
/tmp/users.txt:Kali-Root

┌──(kali㉿kali)-[~]
└─$ grep -ril kali /tmp 
/tmp/dir1/test.txt
/tmp/users.txt

┌──(kali㉿kali)-[~]
└─$ grep "^Our" /tmp/dir1/text.txt
Our bruised arms hung up for monuments;
Our stern alarums changed to merry meetings,
Our dreadful marches to delightful measures.
                                                        
┌──(kali㉿kali)-[~]
└─$ grep ";$" /tmp/dir1/text.txt
Made glorious summer by this sun of York;
Now are our brows bound with victorious wreaths;
Our bruised arms hung up for monuments;
Grim-visaged war hath smooth his wrinkled front;
Nor made to court an amorous looking-glass;
To strut before a wanton ambling nymph;

┌──(kali㉿kali)-[~]
└─$ grep -c "^$" /tmp/dir1/text.txt /tmp/dir1/test.txt
/tmp/dir1/text.txt:2
/tmp/dir1/test.txt:0

┌──(kali㉿kali)-[~]
└─$ grep ".or" /tmp/dir1/text.txt                     
Made glorious summer by this sun of York;
Now are our brows bound with victorious wreaths;
Our bruised arms hung up for monuments;
But I, that am not shaped for sportive tricks,
Nor made to court an amorous looking-glass;
To strut before a wanton ambling nymph;
I, that am curtail of this fair proportion,

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