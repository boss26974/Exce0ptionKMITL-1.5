import gql from 'graphql-tag'

export const CREATE_USER_MUTATION = gql`
    mutation createUser ($record : CreateOneUserInput!) {
        createUser (record: $record) {
            recordId
          }
    }
`
export const LOGIN_MUTATION = gql`
    mutation login ($email : String!, $password : String!) {
        login (email : $email, password : $password) {
            status
            message
            token
            role
        }
    }
`

export const CURRENT_USER_QUERY = gql`
    query currenUser {
        currentUser {
            studentid
            _id
        }
    }
`

export const CHANGE_PASSWORD_MUTATION = gql`
    mutation changePassword ($_id : MongoID!, $old_password : String!, $new_password : String!) {
        changePassword (_id : $_id, old_password : $old_password, new_password : $new_password) {
            status
            message
        }
    }
`

export const CREATE_REPORT_MUTATION = gql`
    mutation createReport ($record : CreateOneReportInput!) {
        createReport (record : $record) {
            recordId
        }
    }
`

export const REPORTS_FROM_TYPE_QUERY = gql`
    query Reports ($filter : FilterFindManyReportInput) {
        Reports (filter : $filter) {
            _id
            topic
            type
            description
            submission_status
        }
    }
`