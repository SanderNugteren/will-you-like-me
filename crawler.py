import urllib.request
import json
import csv

def crawl( username, token, limit ):

    # Create the URL and request a JSON file from facebook
    url = "https://graph.facebook.com/"+username+"/feed?limit="+str(limit)+"&access_token="+token
    response = urllib.request.urlopen(url)
    content = response.read().decode(response.headers.get_content_charset())
    JSONdata = json.loads(content)

    # Open the data in this JSON file 
    with open('real-data.csv', 'w', newline='') as csvFile:

        # Make a csv file on disk
        csvWriter = csv.writer(csvFile)
        csvWriter.writerow(["Message","Time Posted",
                            "# Likes","# Shares","# Comments",
                            "Update Type","Link URL","Post URL"])

        for statusUpdate in JSONdata["data"]:
            # Retrieve all the relevant data from this status update
            if "message" in statusUpdate: message = statusUpdate["message"].encode('ascii','ignore')
            else: message = ""
            time = statusUpdate["created_time"]
            if "likes" in statusUpdate: likes = len(statusUpdate["likes"]["data"])
            else: likes = 0
            if "shares" in statusUpdate: shares = statusUpdate["shares"]["count"]
            else: shares = 0
            if "comments" in statusUpdate: comments = len(statusUpdate["comments"]["data"])
            else: comments = 0
            updateType = statusUpdate["type"]
            if "link" in statusUpdate: linkURL = statusUpdate["link"]
            else: link = ""
            if "actions" in statusUpdate: postURL = statusUpdate["actions"][0]["link"]
            else: postURL = ""
            # Write the data to the file
            csvWriter.writerow([message,time,likes,shares,comments,updateType,linkURL,postURL])
