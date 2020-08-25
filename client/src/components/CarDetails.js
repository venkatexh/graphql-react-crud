import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getSingleCarQuery } from '../queries/queries'


class CarDetails extends Component {
	displayCarDetails() {
		const { car } = this.props.data
		if(car) {
			return (
			<div>
				<h2>{car.name}</h2>
				<p>{car.year}</p>
				<p>{car.brand.name}</p>
				<p>All {car.brand.name} cars:</p>
				<ul className='other-cars'>
					{
						car.brand.cars.map(item => {
							return <li key={item.id}>{item.name}</li>
						})
						}
				</ul>
			</div>
			)
		} else {
			return (
			<div>No car selected</div>
			)
		}
	}
	render() {
		//console.log(this.props)
		return (
		<div id="car-details">
			{this.displayCarDetails()}
		</div>
		);
	}
}

export default graphql(getSingleCarQuery, {
	options: (props) => {
		return {
			variables: {
				id: props.carId
			}
		}
	}
})(CarDetails)