import { gql } from 'apollo-boost';

const getUsersQuery = gql`
{
    users {
      name
      email
      password
      type
      phone
      gender
      aboutme
      city
      company
      languages
      school
      hometown
    } 
  }
`;
const getUserQuery = gql`
    query user($email: String, $type: String) {
          user(email: $email, type: $type){
              name
              email
              password
              type
              phone
              gender
              aboutme
              city
              company
              languages
              school
              hometown
    }
  }
`;
const getLogin = gql`
query userlogin($email: String, $password: String){
      userlogin(email: $email, password: $password){
              name
              email
              type
              phone
              gender
              aboutme
              city
              company
              languages
              school
              hometown
        }
    }`


export { getUsersQuery, getUserQuery, getLogin };