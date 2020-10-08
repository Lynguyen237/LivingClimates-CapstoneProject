from requests.auth import HTTPBasicAuth
import requests

params = dict(key="key", lat=40.712776, lon=-74.005974)

url = "https://api.meteostat.net/v2/point/climate"

req = requests.get(url, params=params)
res = req.json()['data'] # res is a python dictionary
print(res)

# resource: https://www.digitalocean.com/community/tutorials/how-to-get-started-with-the-requests-library-in-python