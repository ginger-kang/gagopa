import { createUser } from '../graphql/mutations';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getUser } from '../graphql/queries';

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
  try {
    await API.graphql(
      graphqlOperation(createUser, {
        input: { userId: userObj.attributes.sub },
      }),
    );
  } catch (error) {
    console.log(error);
  }
};
