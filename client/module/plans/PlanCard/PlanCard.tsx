import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import EditPlanIcon from '../../icons/EditPlanIcon';
import DeletePlanIcon from '../../icons/DeletePlanIcon';
import CalendarIcon from '../../icons/CalendarIcon';
import { Plan } from '../../../models/plan.type';
import { getPlanDateString } from '../../../utils/date-utils';
import { planFormCalendarIcon } from '../PlanList/PlanList.style';
import { useTheme } from '@mui/material/styles';

interface PlanCardProps {
  plan: Plan;
  onEditClick: (plan: Plan) => void;
  onDeleteClick: (planId: string) => void;
  onCardClick: (plan: Plan) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  onEditClick,
  onDeleteClick,
  onCardClick,
}) => {
  const theme = useTheme();

  const renderTitle = (title: string) => (
    <Typography variant="h6">{title}</Typography>
  );

  const renderDescription = (description: string) => (
    <Typography variant="body2" paragraph height="60px">
      {description}
    </Typography>
  );

  const renderCalendarIcon = () => (
    <Box sx={planFormCalendarIcon}>
      <CalendarIcon width={20} height={20} fill={theme.palette.fill.gray} />
    </Box>
  );

  const renderDateAndWeek = (startDate: string, weeks: number) => (
    <Typography variant="body2" style={{ fontWeight: '700' }}>
      {getPlanDateString(startDate)} | {weeks} Weeks
    </Typography>
  );

  const renderCardContent = () => {
    return (
      <>
        <CardContent>
          {renderTitle(plan.title)}
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            flex={1}
          >
            {renderDescription(plan.description || '')}
            <Box display="flex" alignItems="center">
              {renderCalendarIcon()}
              {renderDateAndWeek(plan.startDate, plan.weeks)}
            </Box>
          </Box>
        </CardContent>
      </>
    );
  };

  const renderEditplanCTA = () => (
    <IconButton
      size="small"
      color="inherit"
      onClick={(event) => {
        event.stopPropagation();
        onEditClick(plan);
      }}
      aria-label="edit"
    >
      <EditPlanIcon />
    </IconButton>
  );

  const renderDeleteplanCTA = () => (
    <IconButton
      size="small"
      color="inherit"
      onClick={(event) => {
        event.stopPropagation();
        if (plan.id) {
          onDeleteClick(plan.id);
        }
      }}
      aria-label="delete"
    >
      <DeletePlanIcon />
    </IconButton>
  );

  const renderCardActions = () => {
    return (
      <>
        <CardActions>
          {renderEditplanCTA()}
          {renderDeleteplanCTA()}
        </CardActions>
      </>
    );
  };

  return (
    <Card onClick={() => onCardClick(plan)}>
      {renderCardContent()}
      {renderCardActions()}
    </Card>
  );
};

export default PlanCard;
