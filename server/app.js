const express = require("express")
const app = express()
const {graphqlHTTP} = require("express-graphql")
const schema = require("./schema/schema")
const mongoose = require("mongoose")
const cors = require("cors")

const uri = 'mongodb+srv://<name>:<password>@mycluster-fyzgz.mongodb.net/graphqlapp?retryWrites=true&w=majority'

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.log(err))

app.use(cors())

const port = 3001 

app.use('/graphql', graphqlHTTP({
	schema, // same as -> schema: schema     ES6 ;) //
	//graphiql: true
}))

app.listen(port, () => {
	console.log("Server now running...");
})