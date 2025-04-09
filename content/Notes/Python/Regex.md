---
title: Regex
aliases:
  - Regex
tags:
---
## **Regex Objects**

```python
>>> phoneNumRegex = re.compile(r'\d\d\d-\d\d\d-\d\d\d\d')
>>> mo = phoneNumRegex.search('My number is 415-555-4242.')
>>> print('Phone number found: ' + mo.group())
Phone number found: 415-555-4242
```

## **Grouping with Parentheses**
```python
>>> phoneNumRegex = re.compile(r'(\d\d\d)-(\d\d\d-\d\d\d\d)')
>>> mo = phoneNumRegex.search('My number is 415-555-4242.')
>>> mo.group(1)
'415'
>>> mo.group(2)
'555-4242'
>>> mo.group(0)
'415-555-4242'
>>> mo.group()
'415-555-4242'
```

```python
>>> mo.groups()
('415', '555-4242')
>>> areaCode, mainNumber = mo.groups()
>>> print(areaCode)
415
>>> print(mainNumber)
555-4242
```

```python
>>> phoneNumRegex = re.compile(r'(\(\d\d\d\)) (\d\d\d-\d\d\d\d)')
>>> mo = phoneNumRegex.search('My phone number is (415) 555-4242.')
>>> mo.group(1)
'(415)'
>>> mo.group(2)
'555-4242'
```

## **Matching Multiple Groups with the Pipe**
```python
>>> heroRegex = re.compile (r'Batman|Tina Fey')
>>> mo1 = heroRegex.search('Batman and Tina Fey.')
>>> mo1.group()
'Batman'
>>> mo2 = heroRegex.search('Tina Fey and Batman.')
>>> mo2.group()
'Tina Fey'
```

```python
>>> batRegex = re.compile(r'Bat(man|mobile|copter|bat)')
>>> mo = batRegex.search('Batmobile lost a wheel')
>>> mo.group()
'Batmobile'
>>> mo.group(1)
'mobile'
```


## **Optional Matching with the Question Mark**
```python
>>> batRegex = re.compile(r'Bat(wo)?man')
>>> mo1 = batRegex.search('The Adventures of Batman')
>>> mo1.group()
'Batman'
>>> mo2 = batRegex.search('The Adventures of Batwoman')
>>> mo2.group()
'Batwoman'
```

```python
>>> phoneRegex = re.compile(r'(\d\d\d-)?\d\d\d-\d\d\d\d')
>>> mo1 = phoneRegex.search('My number is 415-555-4242')
>>> mo1.group()
'415-555-4242'
>>> mo2 = phoneRegex.search('My number is 555-4242')
>>> mo2.group()
'555-4242'
```


## **Matching Zero or More with the Star**
```python
>>> batRegex = re.compile(r'Bat(wo)*man')
>>> mo1 = batRegex.search('The Adventures of Batman')
>>> mo1.group()
'Batman'
>>> mo2 = batRegex.search('The Adventures of Batwoman')
>>> mo2.group()
'Batwoman'
>>> mo3 = batRegex.search('The Adventures of Batwowowowoman')
>>> mo3.group()
'Batwowowowoman'
```

## **Matching One or More with the Plus**
```python
>>> batRegex = re.compile(r'Bat(wo)+man')
>>> mo1 = batRegex.search('The Adventures of Batwoman')
>>> mo1.group()
'Batwoman'
>>> mo2 = batRegex.search('The Adventures of Batwowowowoman')
>>> mo2.group()
'Batwowowowoman'
>>> mo3 = batRegex.search('The Adventures of Batman')
>>> mo3 == None
True
```

## **Matching Specific Repetitions with Curly Brackets**

>[!Note]
> Instead of one number, you can specify a range by writing a minimum, a comma, and a maximum in between the curly brackets. For example, the regex (Ha){3,5} will match 'HaHaHa', 'HaHaHaHa', and 'HaHaHaHaHa'.

```python
>>> haRegex = re.compile(r'(Ha){3}')
>>> mo1 = haRegex.search('HaHaHa')
>>> mo1.group()
'HaHaHa'
>>> mo2 = haRegex.search('Ha')
>>> mo2 == None
True
```


## **Greedy and Nongreedy Matching**
```python
>>> a = re.compile(r'(Ha){3,5}')
>>> b = a.search('HaHaHaHa')
>>> b.group()
'HaHaHaHa
>>> a = re.compile(r'(Ha){3,5}?')
>>> b = a.search('HaHaHaHa')
>>> b.group()
'HaHaHa'
>>> b = a.search('HaHaHaHaHaHa')
>>> b.group()
'HaHaHa'
>>> b = a.search('HaHa')
>>> b == None
True
```

## **The findall() Method**
```python
>>> phoneNumRegex = re.compile(r'\d\d\d-\d\d\d-\d\d\d\d') # has no groups
>>> phoneNumRegex.findall('Cell: 415-555-9999 Work: 212-555-0000')
['415-555-9999', '212-555-0000']

>>> phoneNumRegex = re.compile(r'(\d\d\d)-(\d\d\d)-(\d\d\d\d)') # has groups
>>> phoneNumRegex.findall('Cell: 415-555-9999 Work: 212-555-0000')
[('415', '555', '1122'), ('212', '555', '0000')]
```

## **Character Classes**

| Shorthand character class | Represents                                                                        |
| ------------------------- | --------------------------------------------------------------------------------- |
| \d                        | Any numeric digit from 0 to 9.                                                    |
| \D                        | And character that is *not* a numeric digit from 0 to 9.                          |
| \w                        | Any letter, numeric digit, or the underscore character.                           |
| \W                        | Any character that is *not* a letter, numeric digit, or the underscore character. |
| \s                        | Any space, tab, or newline character.                                             |
| \S                        | Any character that is *not* a space, tab, or newline.                             |

```python
>>> a = re.compile(r'\d+\s\w+')
>>> a.findall('12 drummers, 11 pipers, 10 lords, 9 ladies, 8 maids, 7 swans, 6 geese, 5 rings, 4 birds, 3 hens, 2 doves, 1 partridge')
['12 drummers', '11 pipers', '10 lords', '9 ladies', '8 maids', '7 swans', '6 geese', '5 rings', '4 birds', '3 hens', '2 doves', '1 partridge']
```

Expression `\d+\s\w+` will match text that has one or more **numeric digits** **(\d+)**, followed by a **whitespace** character **(\s)**, followed by one or more **letter/digit/underscore** characters **(\w+)**.

```python
>>> a = re.compile(r'[aeiouAEIOU]')
>>> a.findall('Life is binary: zeros and ones.')
['i', 'e', 'i', 'i', 'a', 'e', 'o', 'a', 'o', 'e']

# ^
>>> a = re.compile(r'[^aeiouAEIOU]')
>>> a.findall('Life is binary: zeros and ones.')
['L', 'f', ' ', 's', ' ', 'b', 'n', 'r', 'y', ':', ' ', 'z', 'r', 's', ' ', 'n', 'd', ' ', 'n', 's', '.']
```

## **Caret (^) and Dollar Sign ($)** 

**Caret symbol (^)** can be used at the start of a regex to indicate that a match must occur at the beginning of the searched text. Likewise, you can put a **dollar sign ($)** at the end of the regex to indicate the string must end with this regex pattern.

```python
>>> a = re.compile(r'^Hello')
>>> a.search('Hello world!')
<_sre.SRE_Match object; span=(0, 5), match='Hello'>

>>> endsWithNumber = re.compile(r'\d$')
>>> endsWithNumber.search('Your number is 42')
<_sre.SRE_Match object; span=(16, 17), match='2'>

>>> wholeStringIsNum = re.compile(r'^\d+$')
>>> wholeStringIsNum.search('1234567890')
<_sre.SRE_Match object; span=(0, 10), match='1234567890'>
```

## **Wildcard Character (.)**

The ***. (or dot)*** character in a regular expression is called a **wildcard** and will match any character except for a newline.

```python
>>> a = re.compile(r'.ing')
>>> a.findall('She is better at painting than at drawing')
['painting', 'drawing']

#Dot-Star
>>> a = re.compile(r'First Name: (.*) Last Name: (.*)')
>>> b = a.search('First Name: Jayesh Last Name: Kaithwas')
>>> b.group(1)
'Jayesh'
>>> b.group(2)
'Kaithwas'

# Greedy mode : In greedy mode it will always try to match as much text as possible.

>>> nongreedy = re.compile(r'<.*?>')
>>> a = nongreedy.search('<To serve man> for dinner.>')
>>> a.group()
'<To serve man>'

>>> greedy = re.compile(r'<.*>')
>>> a = greedy.search('<To serve man> for dinner.>')
>>> a.group()
'<To serve man> for dinner.>'

# Newlines with the Dot Character
>>> noNewlineRegex = re.compile('.*')
>>> a.search('She is better at painting than at drawing.\nThey practice guitar by playing every night.\nShe learns French by listening to radio broadcasts').group()
'She is better at painting than at drawing.'
>>> newlin
>>> eRegex = re.compile('.*', re.DOTALL)
>>> a.search('She is better at painting than at drawing.\nThey practice guitar by playing every night.\nShe learns French by listening to radio broadcasts').group()
'She is better at painting than at drawing.\nThey practice guitar by playing every night.\nShe learns French by listening to radio broadcasts'
```

## **Summery**

| Symbol                   | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `?`                      | Matches zero or one of the preceding group.              |
| `*`                      | Matches zero or more of the preceding group.             |
| `+`                      | Matches one or more of the preceding group.              |
| `{n}`                    | Matches exactly n of the preceding group.                |
| `{n,}`                   | Matches n or more of the preceding group.                |
| `{,m}`                   | Matches 0 or m of the preceding group.                   |
| `{n,m}`                  | Matches at least n and at most m of the preceding group. |
| `{n,m}?` or `*?` or `+?` | Performs a nongreedy match of the preceding group.       |
| `^spam`                  | Matches the string begin with spam.                      |
| `spam$`                  | Matches the string ends with spam.                       |
| `.`                      | Matches any character, except newline characters.        |

