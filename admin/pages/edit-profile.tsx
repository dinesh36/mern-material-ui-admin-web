import React, { useEffect, useState } from "react";
import EditForm from "@/module/auth/EditForm/EditForm";
import { User } from "@/models/auth.type";

const EditProfile = () => {
  const [userDetail, setUserDetail] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("editUser");
    if (storedUser) {
      setUserDetail(JSON.parse(storedUser));
    }
  }, []);

  return userDetail ? (
      <EditForm
          userId={userDetail._id}
          name={userDetail.name}
          email={userDetail.email}
          profileImage={userDetail.profileImage}
      />
  ) : null;
};

export default EditProfile;
