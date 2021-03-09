/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePicture = /* GraphQL */ `
  subscription OnCreatePicture {
    onCreatePicture {
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
export const onUpdatePicture = /* GraphQL */ `
  subscription OnUpdatePicture {
    onUpdatePicture {
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
export const onDeletePicture = /* GraphQL */ `
  subscription OnDeletePicture {
    onDeletePicture {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateMenu = /* GraphQL */ `
  subscription OnCreateMenu {
    onCreateMenu {
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
export const onUpdateMenu = /* GraphQL */ `
  subscription OnUpdateMenu {
    onUpdateMenu {
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
export const onDeleteMenu = /* GraphQL */ `
  subscription OnDeleteMenu {
    onDeleteMenu {
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
export const onCreatePictureLike = /* GraphQL */ `
  subscription OnCreatePictureLike {
    onCreatePictureLike {
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
export const onUpdatePictureLike = /* GraphQL */ `
  subscription OnUpdatePictureLike {
    onUpdatePictureLike {
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
export const onDeletePictureLike = /* GraphQL */ `
  subscription OnDeletePictureLike {
    onDeletePictureLike {
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
export const onCreateCommentReaction = /* GraphQL */ `
  subscription OnCreateCommentReaction {
    onCreateCommentReaction {
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
export const onUpdateCommentReaction = /* GraphQL */ `
  subscription OnUpdateCommentReaction {
    onUpdateCommentReaction {
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
export const onDeleteCommentReaction = /* GraphQL */ `
  subscription OnDeleteCommentReaction {
    onDeleteCommentReaction {
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
