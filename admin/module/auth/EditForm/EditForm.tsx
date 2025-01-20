import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormCard from "../../shared/FormCard/FormCard";
import { AppForm, FieldGroup } from "../../shared/form";
import { editFormFields } from "./editFormField";
import { editUser, updateUserDetails } from "../../services/auth-services";
import { setUser } from "../../redux/slices/auth-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

interface EditFormProps {
  userId: string;
  name: string;
  email: string;
  profileImage: string;
}

const EditForm: React.FC<EditFormProps> = ({
  name,
  email,
  profileImage,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Set initial values based on props
  const defaultValues = {
    name,
    email,
    profileImage,
  };

  const form = useForm({
    defaultValues,
  });

  const { reset } = form;

  useEffect(() => {
    reset({
      name,
      email,
      profileImage,
    });
  }, [name, email, profileImage, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      const updatedData = await editUser(formData);
      console.log('updatedData -->',updatedData);
      dispatch(setUser({ user: updatedData }));
      updateUserDetails(updatedData);
      router.push("/");
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard title="Edit Profile">
      <AppForm
        form={form}
        onSubmit={onSubmit}
        submitButtonText="Update"
        isLoading={loading}
      >
        <FieldGroup
          formFields={editFormFields}
          displayLabel
          fieldSize={"medium"}
        />
      </AppForm>
    </FormCard>
  );
};

export default EditForm;
