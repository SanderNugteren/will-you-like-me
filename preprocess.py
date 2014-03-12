import csv
import string
import re
import collections

def preprocess(csvFile):
    # read csv
    with open(csvFile, 'rb') as csvfile:
        csvReader = csv.reader(csvfile, delimiter=',', quotechar='|')
        procCsv = open('processed-data.csv', 'w')
        csvWriter = csv.writer(procCsv)
        header = csvReader.next()
        allWords = set()
        allWordsCounting = collections.Counter()
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
                allWordsCounting[t] += 1
            postDicts.append(postDict)
            allWords |= tokens
        allWords = list(allWords)
        allWords = [i for i, v in allWordsCounting.most_common(10)]
        #make a new header with allWords and features from header
        #TODO add other features besides just the words
        newHeader = allWords
        newHeader.append(header[3])
        csvWriter.writerow(newHeader)
        for pD in xrange(len(postDicts)):
            row = []
            for w in allWords:
                row.append(1.0*(w in postDicts[pD]))
            row.append(likes[pD])
            csvWriter.writerow(row)
        print( "Preprocessing done." )

if __name__ == '__main__':
    preprocess('real-data.csv')
