import urllib.request
import json

username = "arjen.swellengrebel"
token = "CAACEdEose0cBAPcZArCo6JfiyfbM528GnIf1IwQOroc1Cfs4V3KHdMhMyQsoUUhRRbXLBIM3PdfWZBjZC7WQ3XBEoDAoPLr8SeqMx3gm01f1j9AxCFTGM8xKF6NGV9Jh5H7goxkyVOVjKgypHxGzsvoRNMjDP568pCTzecsQg6tp30EYGMd62gqsESnFagZBqR0ZB1gv36QZDZD"

url = "https://graph.facebook.com/"+username+"/feed?access_token="+token

response = urllib.request.urlopen(url)
content = response.read().decode(response.headers.get_content_charset())
JSONdata = json.loads(content)

print(JSONdata["data"][0]["message"])
