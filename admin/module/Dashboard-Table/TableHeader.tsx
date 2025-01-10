import React from "react";
import {
  TableCell,
  TableRow,
  TableSortLabel,
} from "@mui/material";

interface TableHeaderProps {
  sortField: "name" | "email";
  sortDirection: "asc" | "desc";
  handleSort: (field: "name" | "email") => void;
  setColumnFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  sortField,
  sortDirection,
  handleSort,
}) => (
  <TableRow>
    <TableCell>Profile Image</TableCell>
    <TableCell>
      <TableSortLabel
        active={sortField === "name"}
        direction={sortField === "name" ? sortDirection : "asc"}
        onClick={() => handleSort("name")}
      >
        Username
      </TableSortLabel>
    </TableCell>
    <TableCell>
      <TableSortLabel
        active={sortField === "email"}
        direction={sortField === "email" ? sortDirection : "asc"}
        onClick={() => handleSort("email")}
      >
        Email
      </TableSortLabel>
    </TableCell>
    <TableCell>
      <TableSortLabel hideSortIcon>Actions</TableSortLabel>
    </TableCell>
  </TableRow>
);

export default TableHeader;
