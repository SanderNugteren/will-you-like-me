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
            print row[0:-1], row[-1]
            #data.append([float(row[1])])
            #likes.append(float(row[3]))
            datarow = []
            #we assume the likes are in the last column of the csv
            for d in row[0:-1]:
                datarow.append(float(d))
            data.append(datarow)
            likes.append(float(row[-1]))
    #split data into a training and test set
    testSize = int(math.ceil(len(data)*0.2)) #take 10 percent of the data
    #TODO shuffle data
    print len(data), testSize
    trainData = data[:-testSize]
    testData = data[-testSize:]
    print len(trainData),len(testData)
    #do the same for the likes
    trainLikes = likes[:-testSize]
    testLikes = likes[-testSize:]
    #fit a model to the training data
    clf = linear_model.LinearRegression()
    clf.fit(trainData, trainLikes)
    print 'clf coef. learned: ', clf.coef_
    # print the scores
    print 'predictions: ', clf.predict(testData)
    print clf.predict(testData), testLikes
    print('Variance score: %.5f' % clf.score(testData, testLikes))

if __name__ == '__main__':
    #build_model('real-data.csv')
    build_model('testcsv.csv')
