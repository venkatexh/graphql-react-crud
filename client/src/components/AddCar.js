import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import {flowRight as compose} from 'lodash'
import { getBrandsQuery, addCarMutation } from '../queries/queries'
import { getCarsQuery } from '../queries/queries'

class AddCar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			year: '',
			brandId: ''
		}
	}
	displayBrands() {
		var data = this.props.getBrandsQuery
		if(data.loading) {
			return ( <option disabled>Loading brands</option> )
		} else {
			return data.brands.map(brand => {
				return ( <option key={brand.id} value={brand.id}>{brand.name}</option> )
			})
		}
	}
	
	submitForm(e) {
		e.preventDefault()
		this.props.addCarMutation({
			variables: {
				name: this.state.name,
				year: parseInt(this.state.year),
				brandId: this.state.brandId
			},
			refetchQueries: [{ query: getCarsQuery}]
		})
	}
	
	render() {
		return (
		<form id="add-car" onSubmit={this.submitForm.bind(this)} >
                <div className="field">
                    <label>Car name:</label>
                    <input type="text" onChange={(e) => this.setState({name: e.target.value})} />
                </div>
                <div className="field">
                    <label>Year:</label>
                    <input type="text" onChange={(e) => this.setState({year: e.target.value})} />
                </div>
                <div className="field">
                    <label>Brand:</label>
                    <select onChange={(e) => this.setState({brandId: e.target.value})}>
                        <option>Select brand</option>
                        { this.displayBrands() }
                    </select>
                </div>
                <button>+</button>

            </form>
		);
	}
}

export default compose(
	graphql(getBrandsQuery, {name: "getBrandsQuery"}),
	graphql(addCarMutation, {name: "addCarMutation"})
)(AddCar)