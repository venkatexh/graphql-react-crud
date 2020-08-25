import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getCarsQuery } from '../queries/queries'
import CarDetails from './CarDetails'

class CarList extends Component {
	constructor(props){
	super(props)
		this.state = {
			selected: null
		}
	}
	displayCars() {
		var data = this.props.data
		if(data.loading) {
			return (<div>Loading cars..</div>)
		} else {
			return data.cars.map(car => {
				//console.log(car.id)
				return (
					<li key={car.id} onClick={(e) => this.setState({selected: car.id})}> {car.name} </li>
				)
			});
		}
	}
	render() {
		return (
		<div>
			<ul>
				{ this.displayCars() }
			</ul>
			<CarDetails carId={this.state.selected} />
		</div>
		);
	}
}

export default graphql(getCarsQuery)(CarList)