import {gql} from 'apollo-boost'

const getCarsQuery = gql`
{
	cars {
		name
		year
		id
	}
}`

const getSingleCarQuery = gql`
	query($id: ID){
		car(id: $id) {
			id
			name
			year
			brand{
				name
				country
				id
				cars{
					name
					id
				}
			}
		}
	}
`

const getBrandsQuery = gql`
{
	brands {
		name
		country
		id
}
}`

const addCarMutation = gql`
	mutation($name: String!, $year: Int! $brandId: ID!) {
		addCar(name: $name, year: $year, brandId: $brandId){
			name
			id
	}
}`

export { getBrandsQuery, getCarsQuery, addCarMutation, getSingleCarQuery }