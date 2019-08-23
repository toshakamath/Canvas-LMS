const graphql = require('graphql');
var singletonDb = require("../Connection");
const _ = require('lodash');
const bcrypt = require("bcrypt");
const saltRounds = 10;
var generateToken = require("../tokens").generateToken;

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        type: { type: GraphQLString },
        phone: { type: GraphQLString },
        gender: { type: GraphQLString },
        aboutme: { type: GraphQLString },
        city: { type: GraphQLString },
        company: { type: GraphQLString },
        languages: { type: GraphQLString },
        school: { type: GraphQLString },
        hometown: { type: GraphQLString },
        image: { type: GraphQLString }
    })
});

// const loginResult = new GraphQLObjectType({
//     name: 'loginResult',
//     fields: () => ({
//         result: { type: GraphQLBoolean },
//         userdata: { type: UserType }
//     })
// });

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { email: { type: GraphQLString }, type: { type: GraphQLString } },
            async resolve(parent, args) {
                let db = await singletonDb.getInstance();
                let user = await db.collection('userdetails').findOne({ email: args.email, type: args.type })
                console.log("USERRRRRR: ", user);
                return user;
            }
        },
        users: {
            type: new GraphQLList(UserType),
            async resolve(parent, args) {
                let db = await singletonDb.getInstance();
                let users = await db.collection('userdetails').find({}).toArray();
                return users;
            }
        },
        userlogin: {
            type: UserType,
            args: { email: { type: GraphQLString }, password: { type: GraphQLString } },
            async resolve(parent, args) {
                console.log("inside user login", args);
                let db = await singletonDb.getInstance();
                let user = await db.collection('userdetails').findOne({ email: args.email })
                console.log("USER find obj: ",user);
                if(user){
                    bcrypt.compare(args.password, user.password, function (err,result) {
                        if (result) {
                          delete user.password;
                        //   var token = generateToken(user.email);
                        //   var returnobj = { userdata: user, token: token};
                        //   console.log("returnobj: ", returnobj)
                        //   return returnobj;
                        console.log("returnobj: ", user)
                            return user;
                        }
                        else{
                            return {message: "Password is incorrect"}
                        }
                      });
                }
                else{
                    return {message: "User is not present in the db please sign up"}
                }
            }
        }
    }
});

const UserMutation = new GraphQLObjectType({
    name: 'UserMutation',
    fields: {
        updateUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                type: { type: GraphQLString },
                phone: { type: GraphQLString },
                gender: { type: GraphQLString },
                aboutme: { type: GraphQLString },
                city: { type: GraphQLString },
                company: { type: GraphQLString },
                languages: { type: GraphQLString },
                school: { type: GraphQLString },
                hometown: { type: GraphQLString },
                image: { type: GraphQLString }
            },
            async resolve(parent, args) {
                let toUpdate = await {
                    name: args.name||"",
                    phone: args.phone || "",
                    aboutme: args.aboutme || "",
                    city: args.city || "",
                    company: args.company || "",
                    school: args.school || "",
                    hometown: args.hometown || "",
                    languages: args.languages || "",
                    gender: args.gender || ""
                }
                let db = await singletonDb.getInstance();
                let updateUser = await db.collection('userdetails')
                    .findOneAndUpdate(
                        { email: args.email },
                        {
                            $set: toUpdate
                        }, {
                            returnOriginal: false
                        })
                console.log("USERRRRRR: ", updateUser);
                return updateUser;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: UserMutation
});