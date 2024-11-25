import React from 'react';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { activeText, breadcrumbContainer, planLink } from './Breadcrumb.style';
import BreadCrumbIcon from '../../icons/BreadCrumIcon';

const BreadCrumb: React.FC = () => {
  return (
    <Box sx={breadcrumbContainer} display="flex" alignItems="center">
      <Breadcrumbs separator={<BreadCrumbIcon />} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/" sx={planLink}>
          Plan
        </Link>
        <Typography sx={activeText} color="text.primary">
          Calendar
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCrumb;
