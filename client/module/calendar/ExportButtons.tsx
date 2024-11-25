import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { exportToCsv } from '../../utils/export-to-csv';
import { PlanNote } from '../../models/plan-note.type';
import { Plan } from '../../models/plan.type';
import { IconButton } from '@mui/material';
import ShareIcon from '../icons/shareIcon';
import { SharePlanLink } from './SharePlanLink/SharePlanLink';
import { downloadPdf } from './utils/downloadPdf';

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  color: theme.palette.app.white,
  opacity: 1,
  border: `1px solid ${theme.palette.border.whiteButtonBorder}`,
  width: '58px',
  height: '40px',
  padding: '10px 20px',
  gap: '10px',
  borderRadius: '4px',
}));

interface ExportButtonProps {
  planNotes: PlanNote[];
  plan: Plan;
  isShared?: boolean;
}

const ExportButtons: React.FC<ExportButtonProps> = ({
  planNotes,
  plan,
  isShared = false,
}) => {
  const [isPDFDownloading, setIsPDFDownloading] = useState<boolean>(false);
  const [openShareLinkModal, setOpenShareLinkModal] = useState<boolean>(false);
  const handleExportCSV = () => {
    exportToCsv(plan, planNotes);
  };

  const handlePDFDownload = async () => {
    try {
      // setIsPDFDownloading(true);
      // await exportPdfForPlan(plan)
      downloadPdf(plan, planNotes);
    } catch {
    } finally {
      setIsPDFDownloading(false);
    }
  };

  const handleShareClick = () => {
    setOpenShareLinkModal(true);
  };

  return (
    <Stack spacing={2} direction="row" marginRight="20px">
      <SharePlanLink
        planId={plan.id as string}
        openShareLinkModal={openShareLinkModal}
        handleClosePopup={() => setOpenShareLinkModal(false)}
      />
      {!isShared && (
        <IconButtonStyle onClick={handleShareClick} aria-label="share">
          <ShareIcon />
        </IconButtonStyle>
      )}
      <Button variant="outlined" color="black" onClick={handleExportCSV}>
        Download CSV
      </Button>
      <Button
        variant="outlined"
        color="black"
        onClick={handlePDFDownload}
        disabled={isPDFDownloading}
      >
        Download PDF
      </Button>
    </Stack>
  );
};

export default ExportButtons;
