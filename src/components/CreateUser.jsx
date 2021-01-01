import { createUser } from '../graphql/mutations';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUser } from '../graphql/queries';
import config from '../aws-exports';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = config;

export const getCurrentUserInfo = async () => {
  const user = await Auth.currentAuthenticatedUser();
  const hasUser = await API.graphql(
    graphqlOperation(getUser, { userId: user.attributes.sub }),
  );

  if (!hasUser.data.getUser) {
    checkUser(user);
  }
};

const checkUser = (userObj) => {
  if (userObj) {
    CreateUser(userObj);
  }
};

export const CreateUser = async (userObj) => {
  const url = `https://${bucket}.s3.${region}.amazonaws.com/public/defaultAvatar.png`;
  const avatar = {
    bucket: 'mytravel-picture13646-dev',
    key: `public/defaultAvatar.png`,
    uri: url,
  };
  try {
    await API.graphql(
      graphqlOperation(createUser, {
        input: {
          userId: userObj.attributes.sub,
          username: userObj.username,
          email: userObj.attributes.email,
          avatar: avatar,
        },
      }),
    );
  } catch (error) {
    console.log(error);
  }
};
