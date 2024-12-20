import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AppForm, FieldGroup } from '../../shared/form';
import FormCard from '../../shared/FormCard/FormCard';
import { changePasswordFormFields } from '@mern/ui-shared';
import { changePassword } from '../../services/auth-services';
import { useRouter } from 'next/router';

const ChangePasswordForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onSubmit = async () => {
    setLoading(true);
    const formData = form.getValues();
    try {
      await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      router.push('/');
    } catch {
      // do nothing
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard title="Change Password">
      <AppForm
        form={form}
        onSubmit={onSubmit}
        submitButtonText="Change Password"
        isLoading={loading}
      >
        <FieldGroup
          formFields={changePasswordFormFields}
          displayLabel
          fieldSize={'medium'}
        />
      </AppForm>
    </FormCard>
  );
};

export default ChangePasswordForm;
