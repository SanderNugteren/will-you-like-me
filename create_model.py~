from sklearn import linear_model
import numpy as np
import math
import csv
import random

def build_model(csvFile):
    """
    This function uses a csv file created by the crawler to train a model
    (currently linear regression)
    """
    data = []
    likes = []
    #read in data and likes
    with open(csvFile, 'rb') as csvfile:
        csvReader = csv.reader(csvfile, delimiter=',', quotechar='|')
        header = csvReader.next()
        for row in csvReader:
            datarow = []
            #we assume the likes are in the last column of the csv
            for d in row[0:-1]:
                datarow.append(float(d))
            data.append(datarow)
            likes.append(float(row[-1]))
    #split data into a training and test set
    testSize = int(math.ceil(len(data)*0.1)) #take 20 percent of the data
    random.shuffle(data)
    trainData = data[:-testSize]
    testData = data[-testSize:]
    #do the same for the likes
    trainLikes = likes[:-testSize]
    testLikes = likes[-testSize:]
    #fit a model to the training data
    clf = linear_model.LinearRegression()
    clf.fit(trainData, trainLikes)
    #print the results
    print 'clf coef. learned: \n', clf.coef_
    print 'predictions: \n', clf.predict(testData)
    print 'Residual sum of squares: %.5f' % \
    np.mean((clf.predict(testData)-testLikes)**2)
    print 'Residual sum of errors: %.5f' % \
    np.mean((clf.predict(testData)-testLikes))
    print('Variance score: %.5f' % clf.score(testData, testLikes))

if __name__ == '__main__':
    build_model('processed-data.csv')
