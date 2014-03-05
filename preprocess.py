import nltk
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
        for row in csvReader:
            print row[0:-1], row[-1]
            datarow = []
            #we assume the likes are in the last column of the csv
            post = row[0]
            post = re.sub('\s+', ' ', post).translate(None, string.punctuation)
            tokens = set()
            postDict = {}
            for token in nltk.word_tokenize(post):
                t = token.lower()
                postDict[t] = 1
                tokens.add(t)
            postDicts.append(postDict)
            allWords |= tokens
        allWords = list(allWords)
        #TODO make a new header with allWords and features from header
        for w in allWords:
            print w
        print len(allWords)
        for postDict in postDicts:
            row = []
            for w in allWords:
                row.append(1.0*(w in postDict))
            #TODO write line in output

if __name__ == '__main__':
    preprocess('real-data.csv')
