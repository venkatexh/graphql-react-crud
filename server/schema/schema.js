const graphql = require("graphql")
const Brand = require("../models/brand")
const Car = require("../models/car")
const {
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLSchema, 
	GraphQLInt, 
	GraphQLID,
	GraphQLList,
	GraphQLNonNull
} = graphql

const _ = require('lodash')


/* const cars = [
	{ name: 'Nano', year: 2008, id: "1", brandId: "1"}
]

const brands = [
	{name: 'Tata', country: 'India', id: "1"}
] */

const carType = new GraphQLObjectType({
	name: 'Car',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		year: {
			type: GraphQLInt
		},
		brand: {
			type: brandType,
			resolve(parent, args) {
				//return _.find(brands, {id: parent.brandId})
				return Brand.findById(parent.brandId)
			}
		},
	})
})

const brandType = new GraphQLObjectType({
	name: 'Brand',
	fields: () => ({
		id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		country: {
			type: GraphQLString
		},
		cars: {
			type: new GraphQLList(carType),
			resolve(parent, args) {
				//return _.filter(cars, {brandId: parent.id})
				return Car.find({ brandId: parent.id})
			}
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		car: {
			type: carType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve(parent, args) {
				//return _.find(cars, {id: args.id})
				return Car.findById(args.id)
			}
		},
		brand: {
			type: brandType,
			args: {
				id: {
					type: GraphQLID
				}
			},
			resolve(parent, args){
				//return _.find(brands, {id: args.id})
				return Brand.findById(args.id)
			}
		},
		cars: {
			type: new GraphQLList(carType),
			resolve(parent, args) {
				//return cars
				return Car.find({})
			}
		},
		brands: {
			type: new GraphQLList(brandType),
			resolve(parent, args) {
				//return brands
				return Brand.find({})
			}
		}
		
	}
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addBrand: {
			type: brandType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString)},
				country: { type: new GraphQLNonNull(GraphQLString)}
			},
			resolve(parent, args) {
				let brand = new Brand({
					name: args.name,
					country: args.country
				})
				return brand.save()
			}
		},
		addCar: {
			type: carType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				year: { type: new GraphQLNonNull(GraphQLInt) },
				brandId: { type: new GraphQLNonNull(GraphQLID) }
			},
			resolve(parent, args) {
				let car = new Car({
					name: args.name,
					year: args.year,
					brandId: args.brandId
				})
				return car.save()
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
})