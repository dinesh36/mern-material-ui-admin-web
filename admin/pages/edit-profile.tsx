import React from "react";
import EditForm from '../module/auth/EditForm/EditForm';
import { useRouter } from "next/router";

const EditProfile = () => {
  const router = useRouter();
  const { userId, name, email, profileImage } = router.query;

  return (
      <EditForm
          userId={userId as string}
          name={name as string}
          email={email as string}
          profileImage={profileImage as string}
      />
  );
};

export default EditProfile;

