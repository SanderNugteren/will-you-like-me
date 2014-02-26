import urllib.request
import json
import csv

def crawl( username, token, limit ):

    username = turnUsernameIntoId(username)
    
    # Make a csv file on disk
    csvFile = open('real-data.csv', 'w', newline='')
    csvWriter = csv.writer(csvFile, quotechar = '|')
    csvWriter.writerow(["Message","Message Length","Time Posted",
                        "# Likes","# Shares","# Comments",
                        "Update Type","Link URL","Post URL"])
    
    # Create the URL needed
    url = "https://graph.facebook.com/"+username+"/feed?limit="+str(limit)+"&fields=message,created_time,shares,from,comments.limit(1).summary(true),type,link,actions,likes.limit(1).summary(true)&access_token="+token

    while( True ):

        print("Next page being processed.")
        response = urllib.request.urlopen(url)
        content = response.read().decode(response.headers.get_content_charset())
        JSONdata = json.loads(content)

        # Open the data in this JSON file
        for statusUpdate in JSONdata["data"]:
            # Retrieve all the relevant data from this status update
            if "message" in statusUpdate: message = statusUpdate["message"].encode('ascii','ignore')
            else: message = ""
            messageLength = len(message.split())
            time = statusUpdate["created_time"]
            likes = extractNumber("likes", statusUpdate)
            if "shares" in statusUpdate: shares = statusUpdate["shares"]["count"]
            else: shares = 0
            comments = extractNumber("comments", statusUpdate)
            updateType = statusUpdate["type"]
            if "link" in statusUpdate: linkURL = statusUpdate["link"]
            else: linkURL = ""
            if "actions" in statusUpdate: postURL = statusUpdate["actions"][0]["link"]
            else: postURL = ""
            # Write the data to the file
            if statusUpdate["from"]["id"] == username:
                csvWriter.writerow([message,messageLength,time,likes,shares,comments,updateType,linkURL,postURL])

        if "paging" in JSONdata: url = JSONdata["paging"]["next"]
        else: break

def extractNumber(category, statusUpdate):
    if category in statusUpdate: number = statusUpdate[category]["summary"]["total_count"]
    else: number = 0
    return number

def turnUsernameIntoId(username):
    url = "https://graph.facebook.com/"+username+"?fields=id"
    response = urllib.request.urlopen(url)
    content = response.read().decode(response.headers.get_content_charset())
    JSONdata = json.loads(content)
    return JSONdata["id"]

