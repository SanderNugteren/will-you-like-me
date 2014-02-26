from sklearn import linear_model
import csv

def build_model(csvFile):
    data = []
    likes = []
    with open(csvFile, 'rb') as csvfile:
        csvReader = csv.reader(csvfile, delimiter=',', quotechar='|')
        header = csvReader.next()
        for row in csvReader:
            print row[1], row[3]
            data.append([float(row[1])])
            likes.append(float(row[3]))
    clf = linear_model.LinearRegression()
    clf.fit (data, likes)
    print 'clf coef. learned: ', clf.coef_

if __name__ == '__main__':
    build_model('real-data.csv')
