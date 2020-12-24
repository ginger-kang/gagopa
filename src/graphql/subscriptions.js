/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePicture = /* GraphQL */ `
  subscription OnCreatePicture {
    onCreatePicture {
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
export const onUpdatePicture = /* GraphQL */ `
  subscription OnUpdatePicture {
    onUpdatePicture {
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
export const onDeletePicture = /* GraphQL */ `
  subscription OnDeletePicture {
    onDeletePicture {
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
