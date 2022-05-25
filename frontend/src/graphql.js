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

export const  FORUMS_QUERY = gql`
    query Forums ($limit : Int) {
        Forums (limit : $limit, sort : _ID_DESC) {
            _id
            topic
            type
            image_path
        }
    }
`

export const FORUMS_PAGE_QUERY = gql`
    query Forums ($filter : FilterFindManyForumInput) {
        Forums (filter : $filter, sort : _ID_DESC) {
            _id
            topic
            type
            description
            image_path
            author_id
            createdAt
        }
    } 
`