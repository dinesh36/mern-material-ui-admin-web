import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Plan } from '../../../models/plan.type';
import { PlanNote } from '../../../models/plan-note.type';
import { getPlanNotesList } from '../../services/plan-note-services';
import { noteColorOptions } from '../CalendarNoteModal/CalendarNoteModal.constant';
import { getPlan, getSharedPlan } from '../../services/plan-services';
import { Box } from '@mui/material';
import { Loader } from '../../shared/Loader';
import BreadCrumb from '../../layout/Breadcrumb/Breadcrumb';
import CalendarTitle from '../CalendarTitle/CalendarTitle';
import PlanCalendar from '../Calendar/Calendar';
import { centerContainer } from '../../layout/CommonStyles/CenterContainer.style';

const containerStyles = {
  ...centerContainer,
};

const CalendarWrapper = () => {
  const router = useRouter();
  const { planId, sharedPlanId } = router.query; // Get the dynamic plaId from the route
  const [plan, setPlan] = useState<Plan>({} as Plan);
  const [planNotes, setPlanNotes] = useState<PlanNote[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const fetchPlanNotes = async (pId = planId) => {
    try {
      const notesResponse = await getPlanNotesList(pId as string, !!pId);
      const updatedNotesResponse = notesResponse.map(
        (note: { color: string }) => {
          const colorOption = noteColorOptions.find(
            (option) => option.color === note.color
          );
          return {
            ...note,
            colorCode: colorOption?.colorCode || noteColorOptions[0].colorCode,
          };
        }
      );
      setPlanNotes(updatedNotesResponse);
    } catch {
      /** Do nothing */
    }
  };

  const fetchplanData = async () => {
    try {
      setIsLoading(true);
      const response = await getPlan(planId as string);
      setPlan(response);
      setIsLoading(false);
    } catch {
      /** Do nothing */
    }
  };

  const fetchSharedplanData = async () => {
    try {
      setIsLoading(true);
      const response = await getSharedPlan(sharedPlanId as string);
      setPlan(response);
      setIsLoading(false);
      return response as Plan;
    } catch {
      /** Do nothing */
    }
  };

  const fetchSharedplanDetails = async () => {
    const sharedplan = await fetchSharedplanData();
    await fetchPlanNotes(sharedplan?.id as string);
  };

  useEffect(() => {
    if (planId) {
      fetchplanData();
      fetchPlanNotes();
    }
    if (sharedPlanId) {
      fetchSharedplanDetails();
    }
    // eslint-disable-next-line
  }, [planId, sharedPlanId]);

  const renderLoading = () => {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="calc(100vh - 170px)"
      >
        <Loader />
      </Box>
    );
  };

  return (
    <Box sx={containerStyles}>
      {isLoading ? (
        renderLoading()
      ) : (
        <>
          <BreadCrumb />
          <CalendarTitle plan={plan} />
          <PlanCalendar
            plan={plan}
            planNotes={planNotes}
            fetchPlanNotes={fetchPlanNotes}
            isShared={!!sharedPlanId}
          />
        </>
      )}
    </Box>
  );
};

export default CalendarWrapper;
