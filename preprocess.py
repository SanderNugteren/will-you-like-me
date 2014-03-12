import csv
import string
import re

def preprocess(csvFile):
    # read csv
    with open(csvFile, 'rb') as csvfile:
        csvReader = csv.reader(csvfile, delimiter=',', quotechar='|')
        procCsv = open('processed-data.csv', 'w')
        csvWriter = csv.writer(procCsv)
        header = csvReader.next()
        allWords = set()
        postDicts = []
        likes = []
        for row in csvReader:
            datarow = []
            likes.append(row[3])
            post = row[0]
            post = re.sub('\s+', ' ', post).translate(None, string.punctuation)
            tokens = set()
            postDict = {}
            for token in post.split():
                t = token.lower()
                postDict[t] = 1
                tokens.add(t)
            postDicts.append(postDict)
            allWords |= tokens
        allWords = list(allWords)
        #make a new header with allWords and features from header
        #TODO add other features besides just the words
        newHeader = allWords[:200]
        newHeader.append(header[3])
        csvWriter.writerow(newHeader)
        for pD in xrange(len(postDicts)):
            row = []
            for w in allWords[:20]:
                row.append(1.0*(w in postDicts[pD]))
            row.append(likes[pD])
            csvWriter.writerow(row)

if __name__ == '__main__':
    preprocess('real-data.csv')
