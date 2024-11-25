import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PlanForm from '../PlanForm/PlanForm';
import { Plan } from '../../../models/plan.type';
import { getPlanList, deletePlan } from '../../services/plan-services';
import { planContainer, planContentTitle, planModal } from './PlanList.style';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Loader } from '../../shared/Loader';
import DeleteConfirmationDialog from '../../shared/DeleteConfirmationDialog/DeleteConfirmationDialog';
import EmptyMessageIcon from '../../icons/EmptyMessageIcon';
import PlanCard from '../PlanCard/PlanCard';

const PlanList: React.FC = () => {
  const [plans, setplans] = useState<Plan[]>([]);
  const [editingplan, setEditingplan] = useState<Plan | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [planToDelete, setplanToDelete] = useState<string | null>(null);
  const router = useRouter();

  const fetchplanmes = async () => {
    setIsLoading(true);
    try {
      const fetchedplans = await getPlanList();
      setplans(fetchedplans);
    } catch {
      /* Do nothing */
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchplanmes();
  }, []);

  const handleDeleteConfirm = async () => {
    if (planToDelete) {
      try {
        await deletePlan(planToDelete);
        fetchplanmes();
      } catch {
        // Do nothing
      } finally {
        setDeleteDialogOpen(false);
        setplanToDelete(null);
      }
    }
  };

  const handleDeleteClick = (planId: string) => {
    setplanToDelete(planId);
    setDeleteDialogOpen(true);
  };

  const onEditplan = async (plan: Plan) => {
    setEditingplan(plan);
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleAddClick = () => {
    setEditingplan(null);
    setIsEditing(false);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleEditSuccess = () => {
    fetchplanmes();
    handleModalClose();
  };

  const handleAddSuccess = () => {
    fetchplanmes();
    handleModalClose();
  };

  const renderHeader = () => (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={3.75}
      mb={3.75}
    >
      <Typography variant="h4" sx={planContentTitle}>
        Plan
      </Typography>
      <Button variant="contained" onClick={handleAddClick}>
        Add Plan
      </Button>
    </Box>
  );

  const CustomDialogContent = styled(DialogContent)({
    paddingBottom: '30px',
  });

  const renderDialog = () => (
    <Dialog
      open={openModal}
      onClose={handleModalClose}
      PaperProps={{
        style: {
          width: '514px',
          maxWidth: '514px',
          borderRadius: '12px',
          paddingTop: '30px',
        },
      }}
    >
      <DialogTitle sx={planModal}>
        {isEditing ? 'Edit Plan' : 'Add Plan'}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleModalClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <CustomDialogContent>
        <PlanForm
          plan={editingplan || undefined}
          onAddSuccess={handleAddSuccess}
          onEditSuccess={handleEditSuccess}
        />
      </CustomDialogContent>
    </Dialog>
  );

  const handleCardClick = (plan: Plan) => {
    router.push(`/plan/${plan.id}/calendar`);
  };

  const renderplanList = () => (
    <Grid container spacing={3}>
      {plans.map((plan) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={plan.id}>
          <PlanCard
            plan={plan}
            onCardClick={() => handleCardClick(plan)}
            onEditClick={() => onEditplan(plan)}
            onDeleteClick={() => {
              if (plan.id) {
                handleDeleteClick(plan.id);
              }
            }}
          />
        </Grid>
      ))}
    </Grid>
  );

  const renderLoading = () => (
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

  const renderEmptyMessage = () => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="calc(100vh - 170px)"
    >
      <Box>
        <EmptyMessageIcon width={150} height={90} />
      </Box>
      <Typography mt={'20px'} fontWeight={'700'}>
        No Plan added!
      </Typography>
    </Box>
  );

  const renderContent = () => {
    if (isLoading) {
      return renderLoading();
    }
    if (plans.length) {
      return renderplanList();
    } else {
      return renderEmptyMessage();
    }
  };

  const renderDeleteConfirmModal = () => {
    return (
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to delete this plan?"
      />
    );
  };

  return (
    <Box sx={planContainer}>
      {renderHeader()}
      {renderDialog()}
      {renderContent()}
      {renderDeleteConfirmModal()}
    </Box>
  );
};

export default PlanList;
