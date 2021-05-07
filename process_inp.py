import sys
import string
import re

text = sys.argv[1]
text = text.lower()
text = re.sub(r'\d', '', text)

punctuations = '''!()-[]{};:'"\,<>/?@#$%^&*_~'''

clean_text = "";
for c in text:
    if c not in punctuations:
        clean_text += c

#print(clean_text)

requirements = ['experience', 'javascript', 'node.js', 'sql', '.net', 'php', 'c++', 'c ', 'machine learning', 'nodejs', 'java', 'python']

rating = 0;
print("Skills : ")
for skill in requirements:
    if skill in clean_text:
        rating += 1
        print(skill)

#print(rating)
ans = (rating*100)/len(requirements)
print ans
if ans/10 == 0:
    print 2
elif ans/100 == 1:
    print 4
else:
    print 3