/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPicture = /* GraphQL */ `
  query GetPicture($id: ID!) {
    getPicture(id: $id) {
      id
      authorId
      country
      city
      title
      location
      createdAt
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
        introduce
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
        country
        city
        title
        location
        createdAt
        author {
          userId
          username
          email
          introduce
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
          country
          city
          title
          location
          createdAt
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
      introduce
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
        introduce
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
      createdAt
      reactions {
        items {
          id
          userId
          pictureId
          commentId
          emoji
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
        introduce
        createdAt
        updatedAt
      }
      picture {
        id
        authorId
        country
        city
        title
        location
        createdAt
        author {
          userId
          username
          email
          introduce
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
        updatedAt
      }
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
        createdAt
        reactions {
          nextToken
        }
        author {
          userId
          avatar {
            bucket
            region
            key
            uri
          }
          username
          email
          introduce
          createdAt
          updatedAt
        }
        picture {
          id
          authorId
          country
          city
          title
          location
          createdAt
          instagram
          description
          updatedAt
        }
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
        introduce
        createdAt
        updatedAt
      }
      picture {
        id
        authorId
        country
        city
        title
        location
        createdAt
        author {
          userId
          username
          email
          introduce
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
          introduce
          createdAt
          updatedAt
        }
        picture {
          id
          authorId
          country
          city
          title
          location
          createdAt
          instagram
          description
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCommentReaction = /* GraphQL */ `
  query GetCommentReaction($id: ID!) {
    getCommentReaction(id: $id) {
      id
      userId
      pictureId
      commentId
      emoji
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
        introduce
        createdAt
        updatedAt
      }
      picture {
        id
        authorId
        country
        city
        title
        location
        createdAt
        author {
          userId
          username
          email
          introduce
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
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCommentReactions = /* GraphQL */ `
  query ListCommentReactions(
    $filter: ModelCommentReactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommentReactions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        pictureId
        commentId
        emoji
        user {
          userId
          username
          email
          introduce
          createdAt
          updatedAt
        }
        picture {
          id
          authorId
          country
          city
          title
          location
          createdAt
          instagram
          description
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const picturesByDate = /* GraphQL */ `
  query PicturesByDate(
    $city: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPictureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    picturesByDate(
      city: $city
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        authorId
        country
        city
        title
        location
        createdAt
        author {
          userId
          avatar {
            bucket
            region
            key
            uri
          }
          username
          email
          introduce
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
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentsByDate = /* GraphQL */ `
  query CommentsByDate(
    $pictureId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByDate(
      pictureId: $pictureId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pictureId
        authorId
        text
        createdAt
        reactions {
          items {
            commentId
            emoji
            id
            user {
              avatar {
                bucket
                key
                region
                uri
              }
            }
            userId
            pictureId
          }
          nextToken
        }
        author {
          userId
          avatar {
            bucket
            region
            key
            uri
          }
          username
          email
          introduce
          createdAt
          updatedAt
        }
        picture {
          id
          authorId
          country
          city
          title
          location
          createdAt
          instagram
          description
          updatedAt
        }
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
          avatar {
            bucket
            region
            key
            uri
          }
          introduce
          createdAt
          updatedAt
        }
        picture {
          id
          authorId
          country
          city
          title
          location
          createdAt
          author {
            userId
            username
            email
            createdAt
            updatedAt
          }
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
          instagram
          description
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchPictures = /* GraphQL */ `
  query SearchPictures(
    $filter: SearchablePictureFilterInput
    $sort: SearchablePictureSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchPictures(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        authorId
        country
        city
        title
        location
        createdAt
        author {
          userId
          username
          email
          introduce
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
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: SearchableUserSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
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
        introduce
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
