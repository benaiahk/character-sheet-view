import './App.css';
import UseEmail from "./UseEmail";
import { React, useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import _ from 'lodash';
import { borderColor, fontSize } from '@mui/system';
import { TextField } from '@mui/material';

function App() {
  const attributeNames = ['Steezy', 'Vegetarian', 'TikTok', 'Insomniac', 'Minecraft', 'Dog_Friendly', 'Oblivious', 'Dad_Joke', 'Quirkiness'];
  const charJson = require('./data/characters.json');
  const outcomeJson = require('./data/outcomes.json');
  var charNames = [];
  charJson.forEach(
    (character) => {
      charNames.push(character.NAME)
    }
  )
  console.log({ charNames })

  const renderCharCards = () => {
    return charJson.map(
      (character) => {
        return (
          <div>
            <div className='container-form-question'>
              <Grid container>
                <Grid item xs={4}>
                  <span className='text-bebas text-l'>
                    {character.NAME}
                  </span>
                  <br />
                  <span className='text-louis text-m'>
                    Total: {character.STATS.TOTAL}
                  </span>
                </Grid>
                <Grid item xs={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Slider
                        aria-label='Example'
                        valueLabelDisplay='auto'
                        value={character.STATS.HEALTH}
                        max={300}
                        sx={{ color: 'red' }}
                        marks
                        step={10}
                      />
                    </Grid>
                    <Grid item>
                      <span className='text-m text-louis'>
                        {`${character.STATS.HEALTH} / 300`}
                      </span>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Slider
                        aria-label='Example'
                        valueLabelDisplay='auto'
                        value={character.STATS.STRENGTH}
                        max={50}
                        sx={{ color: 'purple' }}
                        marks
                        step={10}
                      />
                    </Grid>
                    <Grid item>
                      <span className='text-m text-louis'>
                        {`${character.STATS.STRENGTH} / 50`}
                      </span>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={10}>
                      <Slider
                        aria-label='Example'
                        valueLabelDisplay='auto'
                        value={character.STATS.AGILITY}
                        max={60}
                        sx={{ color: 'green' }}
                        marks
                        step={10}
                      />
                    </Grid>
                    <Grid item>
                      <span className='text-m text-louis'>
                        {`${character.STATS.AGILITY} / 60`}
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
            <br />
          </div>
        )
      }
    )
  }

  const renderDefeated = (targetName) => {
    return charNames
      .filter((name) => { return name !== targetName })
      .map(
        (name) => {
          var outcomeStats = _.get(outcomeJson, targetName);
          const { DEFEATED } = outcomeStats;
          const defeatCount = _.get(DEFEATED, name);
          return (
            <div style={{ marginBottom: '5px' }}>
              <Grid container>
                <Grid item xs={7}>
                  <span className='text-bebas text-m'>
                    {name}:
                  </span>
                </Grid>
                <Grid item xs={1}>
                  <span className='text-louis text-m' style={{ paddingLeft: '10px' }}>
                    {defeatCount}
                  </span>
                </Grid>
              </Grid>
            </div>
          )
        }
      )
  }

  const renderDefeatedBy = (targetName) => {
    return charNames
      .filter((name) => { return name !== targetName })
      .map(
        (name) => {
          var outcomeStats = _.get(outcomeJson, targetName);
          const { DEFEATED_BY } = outcomeStats;
          const defeatCount = _.get(DEFEATED_BY, name);
          return (
            <div style={{ marginBottom: '5px' }}>
              <Grid container>
                <Grid item xs={7}>
                  <span className='text-bebas text-m'>
                    {name}:
                  </span>
                </Grid>
                <Grid item xs={1}>
                  <span className='text-louis text-m' style={{ paddingLeft: '10px' }}>
                    {defeatCount}
                  </span>
                </Grid>
              </Grid>
            </div>
          )
        }
      )
  }

  const renderBattleStats = () => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return charJson.map(
      (character) => {
        var outcomeStats = _.get(outcomeJson, character.NAME);
        const { DEFEATED, DEFEATED_BY, DEFEATS, TOTAL_DAMAGE, TRIUMPHS, VICTORIES } = outcomeStats;

        var damageColor;
        if (TOTAL_DAMAGE > 200) {
          damageColor = { color: '#87c876' };
        } else if (TOTAL_DAMAGE > 100) {
          damageColor = { color: 'yellow' };
        } else {
          damageColor = { color: 'red' }
        }

        return (
          <div>
            <div className='container-form-question'>
              <Grid container>
                <Grid item xs={4}>
                  <span className='text-bebas text-l'>
                    {character.NAME}
                  </span>
                  <br />
                  <span className='text-louis text-m'>
                    Total Damage: <span style={damageColor}>{formatter.format(TOTAL_DAMAGE)}</span>
                  </span>
                </Grid>
                <Grid item xs={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <span className='text-m text-louis'>
                        Triumphs
                      </span>
                    </Grid>
                    <Grid item xs={8}>
                      <Slider
                        aria-label='Example'
                        valueLabelDisplay='auto'
                        value={TRIUMPHS}
                        max={120}
                        sx={{ color: 'gold' }}
                        marks
                        step={10}
                      />
                    </Grid>
                    <Grid item>
                      <span className='text-m text-louis'>
                        {TRIUMPHS}
                      </span>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <span className='text-m text-louis'>
                        Victories
                      </span>
                    </Grid>
                    <Grid item xs={8}>
                      <Slider
                        aria-label='Example'
                        valueLabelDisplay='auto'
                        value={VICTORIES}
                        max={1200}
                        sx={{ color: 'green' }}
                        marks
                        step={100}
                      />
                    </Grid>
                    <Grid item>
                      <span className='text-m text-louis'>
                        {VICTORIES}
                      </span>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <span className='text-m text-louis'>
                        Defeats
                      </span>
                    </Grid>
                    <Grid item xs={8}>
                      <Slider
                        aria-label='Example'
                        valueLabelDisplay='auto'
                        value={DEFEATS}
                        max={1200}
                        sx={{ color: 'red' }}
                        marks
                        step={100}
                      />
                    </Grid>
                    <Grid item>
                      <span className='text-m text-louis'>
                        {DEFEATS}
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <br />
              <hr style={{ width: '90%', margin: 'auto', opacity: '.2' }}></hr>
              <br /><br />
              <Grid container style={{marginLeft:'80px'}}>
                <Grid item xs={6}>
                  {renderDefeated(character.NAME)}
                </Grid>
                <Grid item xs={6}>
                  {renderDefeatedBy(character.NAME)}
                </Grid>
              </Grid>
            </div>
            <br />
          </div>
        )
      }
    )
  }

  const renderBestAttrCards = () => {
    return attributeNames.map(
      (attr) => {
        var bestAttrScoreChars = [];
        var bestAttrScore = 0;
        charJson.forEach(
          (character) => {
            const { ATTRIBUTES } = character;
            const attrScore = _.get(ATTRIBUTES, attr.toUpperCase())
            if (attrScore > bestAttrScore) {
              bestAttrScore = attrScore
            }
          }
        )
        charJson.forEach(
          (character) => {
            const { ATTRIBUTES } = character;
            const attrScore = _.get(ATTRIBUTES, attr.toUpperCase())
            if (attrScore === bestAttrScore) {
              bestAttrScoreChars.push(character.NAME);
            }
          }
        )
        var color;
        if (bestAttrScore > 8) {
          color = { color: '#87c876' };
        } else if (bestAttrScore > 5) {
          color = { color: 'yellow' };
        } else {
          color = { color: 'red' }
        }
        return (
          <div>
            <span className='text-bebas text-xl'>
              {attr.toUpperCase()} <span style={color}>({bestAttrScore})</span>
            </span>
            <br />
            <span className='text-louis text-l' style={color}>
              {bestAttrScoreChars.join(', ')}
            </span>
            <br /><br /><br />
          </div>
        )
      }
    )
  }

  const renderAttrStats = () => {
    return (
      <div>
        <div className='container-form-question'>
          {renderBestAttrCards()}
        </div>
      </div>
    )
  }

  return (
    <div className='container-main'>
      <div className='container-title'>
        <br />
        <span className='text-bebas text-xxl'>
          Personality <span style={{ color: '#87c876' }}>Survey</span>
        </span>
      </div>
      <div className='container-body' id='body'>
        <Stack>
          <div style={{ textAlign: 'center' }}>
            <span className='text-bebas text-xxl'>
              Player Characters
            </span>
            <hr style={{ width: '90%', margin: 'auto' }}></hr>
            <br /><br />
          </div>
          {renderCharCards()}
          <br /><br />
          <div style={{ textAlign: 'center' }}>
            <span className='text-bebas text-xxl'>
              Attribute Stats
            </span>
            <hr style={{ width: '90%', margin: 'auto' }}></hr>
            <br /><br />
          </div>
          {renderAttrStats()}
          <br /><br />
          <div style={{ textAlign: 'center' }}>
            <span className='text-bebas text-xxl'>
              Battle Outcomes
            </span>
            <hr style={{ width: '90%', margin: 'auto' }}></hr>
            <br /><br />
          </div>
          {renderBattleStats()}
          <div className='container-form-question'>
            
          </div>
        </Stack>
      </div>
    </div>
  );
}

export default App;
