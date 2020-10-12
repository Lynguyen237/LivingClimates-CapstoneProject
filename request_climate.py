from requests.auth import HTTPBasicAuth
import requests

url = "https://api.meteostat.net/v2/point/climate"

def get_climate(lat, lon):
    params = dict(key="key", lat=lat, lon=lon)
    req = requests.get(url, params=params)
    res = req.json() # res is a python dictionary
    return res

# print (get_climate(40.712776,-74.005974)) # New York

# params = dict(key="key", lat=40.712776, lon=-74.005974) # New York
# req = requests.get(url, params=params)
# res = req.json()['data'] # res is a python dictionary
# print(res)

# resource: https://www.digitalocean.com/community/tutorials/how-to-get-started-with-the-requests-library-in-python