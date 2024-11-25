import React, { useEffect, useState, useCallback } from 'react';
import { Loader } from '../../shared/Loader';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { planModal } from '../../plans/PlanList/PlanList.style';
import { getPlanShareLink } from '../../services/plan-services';
import CloseIcon from '@mui/icons-material/Close';
import copyText from '../../../utils/copy-text';

type SharePlanLinkType = {
  openShareLinkModal: boolean;
  handleClosePopup: () => void;
  planId: string;
};

export const SharePlanLink = ({
  openShareLinkModal,
  handleClosePopup,
  planId,
}: SharePlanLinkType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shareLink, setShareLink] = useState<string>('');

  const generateLink = useCallback(async () => {
    try {
      setIsLoading(true);
      const link = await getPlanShareLink(planId);
      setShareLink(link);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    if (openShareLinkModal) {
      generateLink();
    }
  }, [openShareLinkModal, generateLink]);

  const copyLink = () => {
    copyText(shareLink);
    (window as any).__successMessage = 'Link is copied to clipboard';
    window.dispatchEvent(new Event('successMessage'));
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100px"
        >
          <Loader />
        </Box>
      );
    }

    return (
      <Box>
        <Box mt="20px" mb="20px">
          <TextField value={shareLink} />
        </Box>
        <Box display="flex" justifyContent="flex-end" mb="10px">
          <Button variant="contained" onClick={copyLink}>
            Copy Link
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Dialog
      open={openShareLinkModal}
      onClose={handleClosePopup}
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
        Share Link
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClosePopup}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{renderContent()}</DialogContent>
    </Dialog>
  );
};
