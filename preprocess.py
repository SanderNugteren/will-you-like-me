import csv
import string
import re
import collections
import datetime

def preprocess(csvFile):
    # read csv
    with open(csvFile, 'rb') as csvfile:
        csvReader = csv.reader(csvfile, delimiter=',', quotechar='|')
        procCsv = open('processed-data.csv', 'w')
        csvWriter = csv.writer(procCsv)
        header = csvReader.next()
        allWordsCounting = collections.Counter()
        postDicts = []
        postLengths = []
        postTimes = []
        likes = []
        for row in csvReader:
            datarow = []
            likes.append(row[3])
            post = row[0]
            post = re.sub('\s+', ' ', post).translate(None, string.punctuation)
            tokens = set()
            postDict = {}
            tokenList = post.split()
            for token in tokenList:
                t = token.lower()
                postDict[t] = 1
                tokens.add(t)
                allWordsCounting[t] += 1
            postDicts.append(postDict)
            postLengths.append(row[1])
            date = datetime.datetime.strptime(row[2][11:19], "%H:%M:%S")
            secs_since_midnight = (date - date.replace(hour=0, minute=0, second=0, microsecond=0)).total_seconds()
            postTimes.append(secs_since_midnight/3600) # HAHAHAHA
        allWords = [i for i, v in allWordsCounting.most_common(20)]
        #make a new header with allWords and features from header
        #TODO add other features besides just the words
        newHeader = allWords[:]
        # Can't forget about [:]! Otherwise the header is a pointer to allwords!
        newHeader.append("post length")
        newHeader.append("post time")
        newHeader.append(header[3])
        csvWriter.writerow(newHeader)
        for pD in xrange(len(postDicts)):
            row = []
            for w in allWords:
                row.append(1.0*(w in postDicts[pD]))
            row.append(postLengths[pD])
            row.append(postTimes[pD])
            row.append(likes[pD])
            csvWriter.writerow(row)
        print( "Preprocessing done." )

if __name__ == '__main__':
    preprocess('real-data.csv')
