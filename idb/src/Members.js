import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './Members.css';

export default class Members extends Component {
	constructor(props){
		super(props)
	}
  render() {
		let mapping = Object.keys(this.props.swe_data).map((item) =>
            <Col sm={12} md={4}>
                <div className="member-card">
                    <h3>{this.props.swe_data[item][0]} <br /></h3>
                    <p className="nickname">
                        {'"' + this.props.swe_data[item][7] + '"'}
                    </p>
                    <img src={require("./assets/images/about/" + this.props.swe_data[item][5])}
                         alt={this.props.swe_data[item][7]}
                         width='300' height='300' />

                    <br />
                    <p>{this.props.swe_data[item][6]}</p>
                    <p>{this.props.swe_data[item][4]}</p>
                    <p>
                        Commits: {this.props.swe_data[item][1]}<br />
                        Issues: {this.props.swe_data[item][2]}<br />
                        Unit Tests: {this.props.swe_data[item][3]}<br />
                    </p>
                </div>
            </Col>
        )
	return (
	  <Grid>
			<Row>
			{mapping}
			</Row>
	  </Grid>
	);
  }
}
