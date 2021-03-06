/* eslint-disable no-unused-vars */
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {GridList} from 'material-ui/GridList'
import {Timeline} from 'react-twitter-widgets'
import RepresentativeInstance from '../Representatives/RepresentativeInstance'
/* eslint-enable no-unused-vars */

import '../../assets/css/App.css'
import '../../assets/css/PoliticalPartyDetails.css'
import '../../assets/css/District.css'

import allParties from '../../assets/all-parties.json'
import repsInfo from '../../assets/all-reps-endpoint.json'

export default class PoliticalPartyDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false,
      error: false,
      party: {},
      num_reps: 0,
      reps: {},
      districts: []
    }
  }

  componentWillMount () {
    this.setState({ready: false})

    let thisParty = {}
    for (let i = 0; i < allParties.length; i++) {
      if (allParties[i]['name'].toUpperCase().startsWith(
        this.props.match.params.name.toUpperCase())) {
        thisParty = allParties[i]
      }
    }
    this.setState({party: thisParty})

    let censusJSON = require('../../assets/data/census_data.json')
    let repsMap = {}
    let districtsArr = []
    let repCount = 0
    Object.keys(repsInfo).forEach(function (key) {
      if (thisParty['name'].startsWith(repsInfo[key]['party'])) {
        let result = repsInfo[key]
        repsMap[key] = result
        repCount += 1

        let districtName = 'District ' + result['district']
        let censusDistrict = censusJSON[result['state']][result['district']]
        let population = censusDistrict['population']['total']
        let repName = result['firstName'] + ' ' + result['lastName']
        let party = 'Democratic'
        let cssColor = 'light-blue'
        if (result['party'] === 'Republican') {
          party = 'Republican'
          cssColor = 'light-red'
        } else if (result['party'] === 'Libertarian') {
          party = 'Libertarian'
          cssColor = 'light-yellow'
        }

        districtsArr.push({'district': result['district'],
          'state': result['state'],
          'districtName': districtName,
          'population': population,
          'party': party,
          'cssColor': cssColor,
          'rep': repName,
          'rep_id': result['bioguide']})
      }
    })

    districtsArr.sort(function (a, b) {
      return parseInt(a.district, 10) - parseInt(b.district, 10)
    })
    this.setState({num_reps: repCount,
      reps: repsMap,
      districts: districtsArr,
      ready: true})
  }

  render () {
    const styles = {
      divStyle: {
        paddingTop: '50px'
      },
      imgStyle: {
        width: '10%'
      },
      partyColor: {
        color: this.state.party['color']
      },
      progressStyle: {
        width: ((this.state.num_reps / 4) * 100) + '%',
        backgroundImage: 'none',
        backgroundColor: this.state.party['color']
      }
    }

    let controlText = ''
    if (this.state.num_reps > 0) {
      controlText = this.state.num_reps + '/4'
    }

    let repsGrid = Object.keys(this.state.reps).map((key) =>
      <div class='col-sm-3 party-rep-card'>
        <RepresentativeInstance key={key} rep={this.state.reps[key]} />
      </div>
    )

    let districtsGrid = this.state.districts.map((district) =>
      <Link to={`/districts/${district['state']}/${district['district']}`}>
        <div class='col-sm-3 party-rep-card'>
          <div className={'district-card ' + district.cssColor}>
            <h3><b>{district.districtName}</b></h3>
            <h5><b>Population: </b>{district.population}</h5>
            <br />
            <h4><b>Representative:</b></h4>
            <h4>{district.rep}</h4>
            <img src={'https://theunitedstates.io/images/congress/225x275/' +
              district['rep_id'] + '.jpg'}
            alt={district.name}
            className='rep_img' />
            <br />
            <br />
            <h4>Party: {district.party}</h4>
          </div>
        </div>
      </Link>
    )

    return (
      <div style={styles.divStyle} className='App'>
        <div class='container'>
          <div class='party-header'>
            <img src={require('../../assets/images/parties/' +
              this.state.party['name'] + '-full.png')}
            style={styles.imgStyle}
            alt={this.state.party['name']} />
            <h1>{this.state.party['name']} Party</h1>
          </div>

          <div class='row party-info-top'>
            <div class='col-sm-5 col-sm-offset-1 party-info'>
              <p>
                <span class='party-info-header'>Party chair:</span>
                {this.state.party['chair']}
              </p>
              <p>
                <span class='party-info-header'>Formation date:</span>
                {this.state.party['formation_date']}
              </p>
              <p>
                <span class='party-info-header'>Party color:</span>
                <span style={styles.partyColor}>
                  {this.state.party['color']}
                </span>
              </p>
              <p>
                <span class='party-info-header'>Website:</span>
                <a href={this.state.party['website']}>
                  {this.state.party['website']}
                </a>
              </p>
              <p class='party-info-header'>House Control:</p>
              <div class='progress'>
                <div class='progress-bar' role='progressbar'
                  style={styles.progressStyle}
                  aria-valuenow='50' aria-valuemin='0'
                  aria-valuemax='435'>
                  {controlText}
                </div>
              </div>
            </div>

            <div class='col-sm-5'>
              <Timeline dataSource={{sourceType: 'profile',
                screenName: this.state.party['twitter_handle']}}
              options={{username: this.state.party['twitter_handle'],
                height: '300'}} />
            </div>
          </div>

          <div className='row party-media'>
            <div className='col-sm-6'>
              <h4><b>YouTube Channel</b></h4>
              <h4>{this.state.party['youtube']}</h4>
              <iframe width='353' height='200'
                src={'http://www.youtube.com/embed?max-results=1&controls=0&' +
                  'showinfo=0&rel=0&listType=user_uploads&list=' +
                  this.state.party['youtube']}
                frameborder='10' allowfullscreen
                title={this.props.match.params.name + ' YouTube Channel'}
              >
              </iframe>
            </div>

            <div className='col-sm-6'>
              <h4><b>Office Location:</b></h4>
              <h4>{this.state.party['office']}</h4>
              <iframe width='353' height='200'
                frameborder='0' style={{border: '0'}}
                src={'https://www.google.com/maps/embed/v1/place?key=AIzaSyDO' +
                  'CxZVfWFVpzzAC8tEIi3ulzNzXbOdsyY&q=' +
                  this.state.party['office']}
                allowfullscreen
                title={this.props.match.params.name + ' Google Maps Location'}>
              </iframe>
            </div>
          </div>

          <div>
            <h3 class='rep-header'>Representatives</h3>
            <div class='row'>
              {repsGrid}
            </div>
          </div>

          <div>
            <h3 class='rep-header'>Districts</h3>
            <div class='row'>
              {districtsGrid}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
