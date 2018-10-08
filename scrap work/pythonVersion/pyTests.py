from summoner import Summoner
import requests
API ="RGAPI-ec977eae-5a24-4d11-b78f-974a43db0d23"
user = Summoner()
user.summonerName = input("Summoner Name?")

#type(summonnerName)

payload = {'api_key': API }

strGetbyName = 'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'

strAppendname = strGetbyName+user.summonerName
response = requests.get(strAppendname, params=payload)
print("URL")
print(response.url)
print("STATUS_CODE")
print(response.status_code)
print("CONTENTS")
print(response.text)

user.data1 = json.loads(response.text)





