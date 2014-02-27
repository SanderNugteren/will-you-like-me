from sklearn import linear_model
import math
import csv

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
            print row[0], row[3]
            data.append([float(row[1])])
            likes.append(float(row[3]))
    #split data into a training and test set
    testSize = int(math.ceil(len(data)*0.1)) #take 10 percent of the data
    print len(data), testSize
    trainData = data[:-testSize]
    testData = data[-testSize:]
    print len(trainData),len(testData)
    #do the same for the likes
    trainLikes = data[:-testSize]
    testLikes = data[-testSize:]
    #fit a model to the training data
    clf = linear_model.LinearRegression()
    clf.fit(trainData, trainLikes)
    print 'clf coef. learned: ', clf.coef_
    # print the scores
    print clf.predict(testData)
    print('Variance score: %.2f' % clf.score(testData, testLikes))

if __name__ == '__main__':
    build_model('real-data.csv')
    #build_model('testcsv.csv')
