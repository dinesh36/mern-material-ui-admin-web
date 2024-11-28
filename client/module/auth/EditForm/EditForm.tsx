import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FormCard from '../../shared/FormCard/FormCard';
import { AppForm, FieldGroup } from '../../shared/form';
import { editFormFields } from './editFormField';
import {
  editUser,
  fetchUser,
  updateUserDetails,
} from '../../services/auth-services';
import { setUser } from '../../redux/slices/auth-slice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const EditForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    name: '',
    email: '',
    profileImage: '',
  };

  const form = useForm({
    defaultValues,
  });
  const { reset } = form;
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      let formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      const updatedData = await editUser(formData);
      dispatch(setUser({ user: updatedData }));
      updateUserDetails(updatedData);
      router.push('/');
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedUser = await fetchUser();

      reset({
        name: fetchedUser.name || '',
        email: fetchedUser.email || '',
        profileImage: fetchedUser.profileImage || '',
      });
    } catch {
    } finally {
      setLoading(false);
    }
  }, [reset]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

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
          fieldSize={'medium'}
        />
      </AppForm>
    </FormCard>
  );
};

export default EditForm;
