from collections import namedtuple
import operator
import os
import csv
import json
import string

from numpy import char
from torch import CharStorage

BASE_STATS = {
    'health'    : 100.0,
    'strength'  : 10.0,
    'endurance' : 6.0
}

MIN_STATS = {
    'health'    : 33.0,
    'strength'  : 3.0,
    'endurance' : 2.0
}

ATTR_LIST = ['Steezy', 'Vegetarian', 'TikTok', 'Insomniac', 'Minecraft', 'Dog_Friendly', 'Oblivious', 'Dad_Joke']

ATTR_MODS = {
    'Steezy': {
        'h':     -4,
        's':      2,
        'e':    0.5
    },
    'Vegetarian': {
        'h':    3,
        's':   -0.5,
        'e':    1    
    },
    'TikTok': {
        'h':    2,
        's':   -2,
        'e':    1
    },
    'Insomniac': {
        'h':   -3,
        's':    1,
        'e':    2
    },
    'Minecraft': {
        'h':   -1,
        's':   -1,
        'e':    4
    },
    'Dog_Friendly': {
        'h':    3,
        's':   -2,
        'e':  1.5
    },
    'Oblivious': {
        'h':    3,
        's':    3,
        'e': -1.5
    },
    'Dad_Joke': {
        'h':    4,
        's':    3,
        'e':   -2
    },
    'Quirkiness': {
        'h':    2,
        's':    1,
        'e':  0.5
    }
}

def singleBattleSimulation(allCharData):
    chars = []
    for char in allCharData:
        chars.append(char)
    print(chars)

def runBattleSimulation(allCharData, samples):
    for i in range(samples):
        outcomeData = singleBattleSimulation(allCharData)

def formatCharacterStats(charInfo, charData):
    newCharInfo = {
        'NAME': charInfo['name'].upper(),
        'STATS': {},
        'ATTRIBUTES': {}
    }
    
    print('Character:', charInfo['name'])
    charAttr = charData['attributes']
    chatStat = {
        'health': charInfo['health'],
        'strength': charInfo['strength'],
        'endurance': charInfo['endurance']
    }
    sortedAttr = dict(sorted(charAttr.items(), key=operator.itemgetter(1)))
    sortedStat = dict(sorted(chatStat.items(), key=operator.itemgetter(1)))
    
    totalStats = 0
    for stat in reversed(sortedStat):
        print(f'> {stat.upper()} : {sortedStat[stat]}')
        newCharInfo['STATS'][stat.upper()] = sortedStat[stat]
        totalStats += sortedStat[stat]
    print(f'> TOTAL : {totalStats}')
    newCharInfo['STATS']['TOTAL'] = totalStats
    print()
    
    for attr in reversed(sortedAttr):
        print(f'> {attr} : {sortedAttr[attr]}')
        newCharInfo['ATTRIBUTES'][attr.upper()] = sortedAttr[attr]
    print()
    
    return newCharInfo

def calculateCharacterStats(charInfo, charData):
    for attr in charData['attributes']:
        attrValue = charData['attributes'][attr]
        attrMods = ATTR_MODS[attr]
        hltMod = attrMods['h']
        strMod = attrMods['s']
        endMod = attrMods['e']
        
        charInfo['health'] += hltMod * attrValue
        charInfo['strength'] += strMod * attrValue
        charInfo['endurance'] += endMod * attrValue
    for stat in ['health', 'strength', 'endurance']:
        if (charInfo[stat] < MIN_STATS[stat]):
            charInfo[stat] = MIN_STATS[stat]

def generateCharacter(charData):
    charInfo = {
        'name'      : charData['characterName'].upper(),
        'health'    : BASE_STATS['health'],
        'strength'  : BASE_STATS['strength'],
        'endurance' : BASE_STATS['endurance']
    }
    calculateCharacterStats(charInfo, charData)
    return formatCharacterStats(charInfo, charData)

def generateAllCharacters(subData):
    returnData = []
    for sub in subData:
        returnData.append(generateCharacter(sub))
    return returnData
        
def processSubmissions(fileName):
    with open (os.path.join(os.path.dirname(os.path.abspath(__file__)), fileName), 'r') as file:
        try:
            returnData = []
            reader = csv.reader(file)
            for row in reader:
                returnData.append(json.loads(row[3]))
        finally:
            file.close()
            return returnData

def main():
    submissionData = processSubmissions('submissions.csv')
    charactersData = generateAllCharacters(submissionData)
    
    # Export Character as JSON
    with open('characters.json', 'w') as charJson:
        charJson.write(str(json.dumps(charactersData, indent=4)))
        
    # Run Simulation
    runBattleSimulation(charactersData, 1)
    return



# Launch Program
main()