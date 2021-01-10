/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPicture = /* GraphQL */ `
  query GetPicture($id: ID!) {
    getPicture(id: $id) {
      id
      authorId
      city
      title
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
        username
        email
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
      likes {
        items {
          id
          pictureId
          userId
          createdAt
          updatedAt
        }
        nextToken
      }
      comments {
        items {
          id
          pictureId
          authorId
          text
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPictures = /* GraphQL */ `
  query ListPictures(
    $filter: ModelPictureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPictures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authorId
        city
        title
        location
        author {
          userId
          username
          email
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
        likes {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($userId: ID!) {
    getUser(userId: $userId) {
      userId
      pictures {
        items {
          id
          authorId
          city
          title
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
      username
      email
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $userId: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
        username
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      pictureId
      authorId
      text
      likes {
        items {
          id
          userId
          pictureId
          commentId
          createdAt
          updatedAt
        }
        nextToken
      }
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
        username
        email
        createdAt
        updatedAt
      }
      picture {
        id
        authorId
        city
        title
        location
        author {
          userId
          username
          email
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
        likes {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pictureId
        authorId
        text
        likes {
          nextToken
        }
        author {
          userId
          username
          email
          createdAt
          updatedAt
        }
        picture {
          id
          authorId
          city
          title
          location
          instagram
          description
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMenu = /* GraphQL */ `
  query GetMenu($id: ID!) {
    getMenu(id: $id) {
      id
      city
      tag
      content
      thumbnail {
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
export const listMenus = /* GraphQL */ `
  query ListMenus(
    $filter: ModelMenuFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMenus(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        city
        tag
        content
        thumbnail {
          bucket
          region
          key
          uri
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPictureLike = /* GraphQL */ `
  query GetPictureLike($id: ID!) {
    getPictureLike(id: $id) {
      id
      pictureId
      userId
      user {
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
        username
        email
        createdAt
        updatedAt
      }
      picture {
        id
        authorId
        city
        title
        location
        author {
          userId
          username
          email
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
        likes {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPictureLikes = /* GraphQL */ `
  query ListPictureLikes(
    $filter: ModelPictureLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPictureLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pictureId
        userId
        user {
          userId
          username
          email
          createdAt
          updatedAt
        }
        picture {
          id
          authorId
          city
          title
          location
          instagram
          description
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCommentLike = /* GraphQL */ `
  query GetCommentLike($id: ID!) {
    getCommentLike(id: $id) {
      id
      userId
      pictureId
      commentId
      user {
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
        username
        email
        createdAt
        updatedAt
      }
      picture {
        id
        authorId
        city
        title
        location
        author {
          userId
          username
          email
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
        likes {
          nextToken
        }
        comments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCommentLikes = /* GraphQL */ `
  query ListCommentLikes(
    $filter: ModelCommentLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        pictureId
        commentId
        user {
          userId
          username
          email
          createdAt
          updatedAt
        }
        picture {
          id
          authorId
          city
          title
          location
          instagram
          description
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const likesByUser = /* GraphQL */ `
  query LikesByUser(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPictureLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likesByUser(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pictureId
        userId
        user {
          userId
          username
          email
          createdAt
          updatedAt
        }
        picture {
          id
          authorId
          city
          title
          location
          instagram
          description
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
