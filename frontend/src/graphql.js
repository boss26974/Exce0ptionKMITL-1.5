import gql from "graphql-tag";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($record: CreateOneUserInput!) {
    createUser(record: $record) {
      recordId
    }
  }
`;
export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
      token
      role
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query currenUser {
    currentUser {
      studentid
      _id
    }
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation changePassword(
    $_id: MongoID!
    $old_password: String!
    $new_password: String!
  ) {
    changePassword(
      _id: $_id
      old_password: $old_password
      new_password: $new_password
    ) {
      status
      message
    }
  }
`;

export const CREATE_REPORT_MUTATION = gql`
  mutation createReport($record: CreateOneReportInput!) {
    createReport(record: $record) {
      recordId
    }
  }
`;

export const REPORTS_FROM_TYPE_QUERY = gql`
  query Reports($filter: FilterFindManyReportInput) {
    Reports(filter: $filter) {
      _id
      topic
      type
      description
      target
      condition_of_submission
      submission_status
      createdAt
    }
  }
`;

export const FORUMS_QUERY = gql`
  query Forums($limit: Int, $filter: FilterFindManyForumInput) {
    Forums(limit: $limit,filter: $filter, sort: _ID_DESC) {
      _id
      topic
      type
      image_path
      description
    }
  }
`;

export const FORUMS_PAGE_QUERY = gql`
  query Forums($filter: FilterFindManyForumInput) {
    Forums(filter: $filter, sort: _ID_DESC) {
      _id
      topic
      type
      description
      image_path
      author_id
      createdAt
    }
  }
`;

export const CURRENT_ADMIN_QUERY = gql`
  query currentAdmin {
    currentAdmin {
      _id
      name
      role_manage_admin_acc
    }
  }
`;

export const USER_ALL_QUERY = gql`
  query Users {
    Users {
      fname
      lname
      email
      studentid
      status
      _id
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation removeUser($deleteId: MongoID!) {
    removeUser(_id: $deleteId) {
      recordId
    }
  }
`;

export const EDIT_USER = gql`
    mutation updateUser ($id : MongoID!, $data: UpdateByIdUserInput!) {
        updateUser (_id: $id, record: $data) {
            recordId
        }
    }
`;

export const EDIT_FORUM = gql`
    mutation updateForum ($id : MongoID!, $data: UpdateByIdForumInput!) {
        updateForum (_id: $id, record: $data) {
            recordId
        }
    }
`

export const EDIT_REPORTS_MUTATION = gql`
    mutation updateReport ($id : MongoID!, $record : UpdateByIdReportInput!) {
        updateReport (_id: $id, record: $record){
          recordId
        }
    }
`

export const REMOVE_REPORTS_MUTATION = gql`
mutation removeReport ($id : MongoID!) {
  removeReport (_id: $id){
    recordId
  }
}
`
