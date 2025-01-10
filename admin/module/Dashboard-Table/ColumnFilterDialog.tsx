import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  DialogActions,
  Button,
} from "@mui/material";

interface ColumnFilterDialogProps {
  columnVisibility: {
    name: boolean;
    email: boolean;
    profileImage: boolean;
  };
  setColumnVisibility: React.Dispatch<
    React.SetStateAction<{
      name: boolean;
      email: boolean;
      profileImage: boolean;
    }>
  >;
  columnFilterOpen: boolean;
  setColumnFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ColumnFilterDialog: React.FC<ColumnFilterDialogProps> = ({
  columnVisibility,
  setColumnVisibility,
  columnFilterOpen,
  setColumnFilterOpen,
}) => {
  const handleColumnToggle = (column: keyof typeof columnVisibility) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  return (
    <Dialog open={columnFilterOpen} onClose={() => setColumnFilterOpen(false)}>
      <DialogTitle>Edit Visible Columns</DialogTitle>
      <DialogContent>
        <FormGroup>
          {Object.keys(columnVisibility).map((key) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={
                    columnVisibility[key as keyof typeof columnVisibility]
                  }
                  disabled={key === "name"}
                  onChange={() =>
                    handleColumnToggle(key as keyof typeof columnVisibility)
                  }
                />
              }
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setColumnFilterOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColumnFilterDialog;
