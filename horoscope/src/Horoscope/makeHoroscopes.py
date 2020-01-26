from datetime import date
import json

horoscopes = {"Aries": "", "Taurus": "", "Gemini": "",
              "Cancer": "", "Leo": "", "Virgo": "", "Libra": "", "Scorpio": "",
              "Sagittarius": "", "Capricorn": "", "Aquarius": "", "Pisces": ""}

today = date.today().strftime("%b-%d-%Y")

for sign in horoscopes:
    horoscopes[sign] = input(sign + ":")

horoscopeData = {"date": today, "horoscopes": horoscopes}

with open("horoscopes.json", "w+") as f:
    json.dump(horoscopeData, f)
