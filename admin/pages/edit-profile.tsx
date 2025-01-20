import React from "react";
import { useRouter } from "next/router";
import EditForm from "@/module/auth/EditForm/EditForm";

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
