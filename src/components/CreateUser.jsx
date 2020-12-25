import { createUser } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

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
