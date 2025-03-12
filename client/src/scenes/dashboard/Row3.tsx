import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

/**
 * Row3 Component
 *
 * Data Organization.
 * Lists out recent transactions and products sold.
 * Expense breakdown key expenditures
 *
 * Uses data from the `useGetKpisQuery` , `useGetProductsQuery` and `useGetProductsQuery` .
 * Uses Material UI for theming and `recharts` for chart rendering.
 * This component is rendered in the `index.tsx` file.
 * @returns JSX Element containing the three visualizations.
 */
const Row3: React.FC = () => {
  const { palette } = useTheme();
  const { data: transactionData } = useGetTransactionsQuery();
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const pieColors = [palette.primary[800], palette.primary[500]];

  //Format Data
  const pieChartdata = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory)
        .filter(([key, value]) => {
          if (value) {
            return [key, value];
          }
        })
        .map(([key, value]) => {
          return [
            {
              name: key,
              value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        });
    }
  }, [kpiData]);

  // Formats and styles columns headers
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
          title="transactions drop"
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
      <DashboardBox gridArea={"i"}>
        <BoxHeader title="expense breakdown by category" />
        <FlexBetween mt="-.7rem" gap="0.5rem" p="0 1rem" textAlign={"center"}>
          {pieChartdata?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>

              <Typography mb={`1rem`} variant="h5">
                {data[0].name}
              </Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea={"j"}>
        <BoxHeader title="Overall Summary" />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
          ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
          molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
          sed. In volutpat nullam at est id cum pulvinar nunc.
        </Typography>
      </DashboardBox>
    </>
  );
};
export default Row3;
