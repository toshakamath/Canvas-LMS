
import { gql } from 'apollo-boost';

const updateUserMutation = gql`
    mutation updateUser($em: String, $type: String, $name: String, $phone: String, $aboutme: String, $city: String, $company: String, $school: String, $hometown: String, $languages: String, $gender: String)
        {
        updateUser(email: $em, type: $type, name: $name, phone:$phone, aboutme:$aboutme, city:$city, company:$company, school:$school, hometown:$hometown, languages:$languages, gender:$gender)
            {
                name
                phone
                aboutme
                city
                company
                school
                hometown
                languages
                gender
                email
            }
        }
`;

export { updateUserMutation };

