import { getUser } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../graphql/mutations';

export const getUserById = async (id) => {
  let user;
  try {
    const data = await API.graphql(graphqlOperation(getUser, { userId: id }));
    user = await data.data.getUser;
  } catch (error) {
    console.log(error);
  }
  return user;
};

export const updateUserData = async (id, inputData) => {
  try {
    await API.graphql(graphqlOperation(updateUser, { input: inputData }));
  } catch (error) {
    console.log(error);
  }
};
