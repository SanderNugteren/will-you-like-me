import urllib.request
import json
import csv

def crawl( username, token ):

    url = "https://graph.facebook.com/"+username+"/feed?access_token="+token
    
    response = urllib.request.urlopen(url)
    content = response.read().decode(response.headers.get_content_charset())
    JSONdata = json.loads(content)

    with open('real-data.csv', 'w', newline='') as csvFile:
        csvWriter = csv.writer(csvFile)
        csvWriter.writerow(["Link Title","Message","Time Posted (PST)",
                            "# Likes","# Shares","Has Question?",
                            "Update Type","Link URL","Post URL"])
        for statusUpdate in JSONdata["data"]:
            title = statusUpdate["actions"][0]["name"]
            message = statusUpdate["message"]
            time = statusUpdate["created_time"]
            if "likes" in statusUpdate:
                likes = len(statusUpdate["likes"]["data"])
            else: likes = 0
            if "shares" in statusUpdate:
                shares = len(statusUpdate["shares"]["data"])
            else: shares = 0
            question = "Figure it out yourself"
            updateType = statusUpdate["type"]
            link = statusUpdate["link"]
            postURL = statusUpdate["actions"][0]["link"]
            csvWriter.writerow([title,message,time,likes,shares,question,
                                updateType,link,postURL])
