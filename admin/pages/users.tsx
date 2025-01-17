import React, {StrictMode, useEffect, useMemo, useState} from "react";

import type { ColDef, RowSelectionOptions } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import {User} from "@/models/auth.type";
import {getUserDetails} from "@/module/services/auth-services";

ModuleRegistry.registerModules([AllCommunityModule]);


const rowSelection: RowSelectionOptions = {
    mode: "multiRow",
    headerCheckbox: false,
};

const GridExample = () => {
    const [userDetails, setUserDetails] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            const fetchedUsers = await getUserDetails();
            setUserDetails(fetchedUsers);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);


    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: "name", editable: true, cellEditor: "agSelectCellEditor" },
        { field: "email" },
        { field: "profileImage" },
    ]);

    const defaultColDef = useMemo(() => {
        return {
            filter: "agTextColumnFilter",
            floatingFilter: true,
        };
    }, []);

    return (
        <div style={{ height: 500 }}>
            <AgGridReact
                rowData={userDetails}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowSelection={rowSelection}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10, 25, 50]}
            />
        </div>
    );
};

export default GridExample;