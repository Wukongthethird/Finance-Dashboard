import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React from "react";

const Row3: React.FC = () => {
  const { palette } = useTheme();
  const { data: transactionData } = useGetTransactionsQuery();
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
      // renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      // eslint-disable-next-line
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  return (
    <>
      <DashboardBox gridArea={"g"}>
        <BoxHeader
          title="product drop"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt=".5rem"
          p=".5rem"
          height="75%"
          //targets children element
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            rows={productData || []}
            columns={productColumns}
            hideFooter={true}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea={"h"}>
        <BoxHeader
          title="product drop"
          sideText={`${transactionData?.length} transaction`}
        />
        <Box
          mt="1rem"
          p=".5rem"
          height="80%"
          //targets children element
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            rows={transactionData || []}
            columns={transactionColumns}
            hideFooter={true}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea={"i"}></DashboardBox>
      <DashboardBox gridArea={"j"}></DashboardBox>
    </>
  );
};
export default Row3;
