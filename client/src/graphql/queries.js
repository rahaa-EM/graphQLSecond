import { gql } from '@apollo/client';
// ==========================================

// GET_PEOPLE query =========================
export const GET_PEOPLE = gql`
query {
    people {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
        personId
      }
    }
  }
`

// GET_CARS query ===========================
// export const GET_CARS = gql`
//  query {
//      cars {
//          id
//          year
//          make
//          model
//          price
//      }
//  }
// `
// ===========================================
// MUTATIONS==================================
// ===========================================

// ADD_PERSON mutation =======================
export const ADD_PERSON = gql`
    mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
        addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
`;

// REMOVE_PERSON mutation ====================
export const REMOVE_PERSON = gql`
    mutation RemovePerson($id: String!) {
        removePerson(id: $id) {
            id
            firstName
            lastName
        }
    }
`;

// UPDATE_PERSON mutation ====================
export const UPDATE_PERSON = gql`
    mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
        updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
`;

// ADD_CAR mutation ==========================
export const ADD_CAR = gql`
    mutation AddCar($id: String!, $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
        addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
            id
            year
            make
            model
            price
            personId
        }
    }
`;

// REMOVE_CAR mutation =======================
export const REMOVE_CAR = gql`
    mutation RemoveCar($id: String!) {
        removeCar(id: $id) {
            id
            year
            make
            model
            price
            personId
        }
    }
`;

// UPDATE_CAR mutation =======================
export const UPDATE_CAR = gql`
    mutation UpdateCar($id: String!, $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
        updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
            id
            year
            make
            model
            price
            personId
        }
    }
`;

