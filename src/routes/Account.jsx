import React, { useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { UserContext } from '../App';
import { getUser } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

const AccountContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 70px;
`;

const AccountWrap = styled.div`
  width: 800px;
  background: hotpink;
  margin: 0 auto 0 auto;
`;

const Account = () => {
  const { userObj, refreshUser } = useContext(UserContext);

  const fetchUsers = useCallback(async () => {
    const data = await API.graphql(
      graphqlOperation(getUser, { userId: userObj.attributes.sub }),
    );
    console.log(data.data.getUser);
  }, [userObj]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <Navigation show={true} />
      <AccountContainer>
        <AccountWrap></AccountWrap>
      </AccountContainer>
    </>
  );
};

export default Account;
