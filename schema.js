const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require("graphql");
const axios = require("axios");

// const CharacterType = new GraphQLObjectType({
//   name: "Character",
//   fields: () => ({
//     name: { type: GraphQLString },
//     height: { type: GraphQLInt },
//     gender: { type: GraphQLString },
//     films: { type: FilmType }
//   })
// });
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    rocket: { type: RocketType }
  })
});

// const FilmType = new GraphQLObjectType({
//   name: "Film",
//   fields: () => ({
//     title: { type: GraphQLString },
//     episode_id: { type: GraphQLInt },
//     director: { type: GraphQLString }
//   })
// });
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

//root query - create endpoints that have resolvers that will resolve our data
// const RootQuery = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     characters: {
//       //get a list/array of all the characters
//       type: new GraphQLList(CharacterType),
//       //resolver: function that takes in 2 params, parents and args
//       resolve(parent, args) {
//         //where we get our data
//         return axios.get("https://swapi.co/api/people/1").then(res => res.data);
//       }
//     }
//   }
// });
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      //get a list/array of all the characters
      type: new GraphQLList(LaunchType),
      //resolver: function that takes in 2 params, parents and args
      resolve(parent, args) {
        //where we get our data
        return axios
          .get("https://api.spacexdata.com/v3/launches/")
          .then(res => res.data);
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
      }
    },
    rockets: {
      //get a list/array of all the characters
      type: new GraphQLList(RocketType),
      //resolver: function that takes in 2 params, parents and args
      resolve(parent, args) {
        //where we get our data
        return axios
          .get("https://api.spacexdata.com/v3/rockets/")
          .then(res => res.data);
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery
});
