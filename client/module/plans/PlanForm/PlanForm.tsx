import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box } from '@mui/material';
import { Plan } from '../../../models/plan.type';
import { planFormBox, planFormBoxButton } from './PlanForm.style';
import { addPlan, editPlan } from '../../services/plan-services';
import { getFormDateString } from '../../../utils/date-utils';
import dayjs from 'dayjs';
import { AppForm, FieldGroup } from '../../shared/form';
import { planFormFields } from './PlanFormFields';

interface planFormProps {
  plan?: Plan;
  onAddSuccess: (plan: Plan) => void;
  onEditSuccess: (updatedplan: Plan) => void;
}

const PlanForm: React.FC<planFormProps> = ({
  plan,
  onAddSuccess,
  onEditSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      startDate: '',
      weeks: '',
      title: '',
      description: '',
    },
  });
  const { reset } = form;

  useEffect(() => {
    if (plan) {
      reset({
        startDate: getFormDateString(plan.startDate) || '',
        weeks: plan.weeks.toString() || '',
        title: plan.title || '',
        description: plan.description || '',
      });
    } else {
      reset({
        startDate: '',
        weeks: '',
        title: '',
        description: '',
      });
    }
  }, [plan, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const newplan: Plan = {
      id: plan ? plan.id : String(new Date().getTime()),
      startDate: dayjs(data.startDate).format('YYYY-MM-DD'),
      weeks: Number(data.weeks),
      title: data.title,
      description: data.description,
    };

    try {
      if (plan) {
        await editPlan(newplan);
        onEditSuccess(newplan);
      } else {
        await addPlan(newplan);
        onAddSuccess(newplan);
      }
      reset({
        startDate: '',
        weeks: '',
        title: '',
        description: '',
      });
    } catch {
      // Do nothing
    } finally {
      setLoading(false);
    }
  };

  const renderPlanFormSubmitButton = () => (
    <Button type="submit" variant="contained" disabled={loading}>
      {plan ? 'Update' : 'Save'}
    </Button>
  );

  return (
    <AppForm form={form} onSubmit={onSubmit} sx={planFormBox}>
      <FieldGroup formFields={planFormFields} />
      <Box sx={planFormBoxButton}>{renderPlanFormSubmitButton()}</Box>
    </AppForm>
  );
};

export default PlanForm;
