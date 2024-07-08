import React from "react";

type Props = {};

const UserProfile = ({ params }: any) => {
  return <div>{params.id}</div>;
};

export default UserProfile;
