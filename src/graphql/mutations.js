/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPicture = /* GraphQL */ `
  mutation CreatePicture(
    $input: CreatePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    createPicture(input: $input, condition: $condition) {
      id
      authorId
      city
      location
      author {
        userId
        pictures {
          nextToken
        }
        avatar {
          bucket
          region
          key
          uri
        }
        createdAt
        updatedAt
      }
      instagram
      description
      attachment {
        bucket
        region
        key
        uri
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePicture = /* GraphQL */ `
  mutation UpdatePicture(
    $input: UpdatePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    updatePicture(input: $input, condition: $condition) {
      id
      authorId
      city
      location
      author {
        userId
        pictures {
          nextToken
        }
        avatar {
          bucket
          region
          key
          uri
        }
        createdAt
        updatedAt
      }
      instagram
      description
      attachment {
        bucket
        region
        key
        uri
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePicture = /* GraphQL */ `
  mutation DeletePicture(
    $input: DeletePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    deletePicture(input: $input, condition: $condition) {
      id
      authorId
      city
      location
      author {
        userId
        pictures {
          nextToken
        }
        avatar {
          bucket
          region
          key
          uri
        }
        createdAt
        updatedAt
      }
      instagram
      description
      attachment {
        bucket
        region
        key
        uri
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      userId
      pictures {
        items {
          id
          authorId
          city
          location
          instagram
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      avatar {
        bucket
        region
        key
        uri
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      userId
      pictures {
        items {
          id
          authorId
          city
          location
          instagram
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      avatar {
        bucket
        region
        key
        uri
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      userId
      pictures {
        items {
          id
          authorId
          city
          location
          instagram
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      avatar {
        bucket
        region
        key
        uri
      }
      createdAt
      updatedAt
    }
  }
`;
