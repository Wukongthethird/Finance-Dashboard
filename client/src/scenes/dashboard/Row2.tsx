import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

//HARD CODED EXAMPLE DATA
const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

/**
 * Row2 Component
 *
 * Displays three data visualizations related to profit and revenue, prices and expenses, and goals.
 * Each chart is rendered using different chart types (LineChart, PieChart, and ScatterChart)
 * to show monthly financial data, including revenue, expenses, and profit.
 *
 * Uses data from the `useGetKpisQuery` and `useGetProductsQuery` API hook to fetch the financial data.
 *
 * Charts:
 * 1. Profit vs. Revenue (LineChart)
 * 2. Group A vs. Group B (PieChart)
 * 3. Product Prices vs. Expenses (ScatterChart)
 *
 * Uses Material UI for theming and `recharts` for chart rendering.
 * This component is rendered in the `index.tsx` file.
 * @returns JSX Element containing the three visualizations.
 */

const Row2 = () => {
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];

  // Formats data into each data points
  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);
  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price,
          expense,
        };
      })
    );
  }, [productData]);

  return (
    <>
      <DashboardBox gridArea={"d"}>
        <BoxHeader title="Profit and Revenue" sideText="+46" />
        {
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={operationalExpenses}
              margin={{
                top: 20,
                right: 0,
                left: -10,
                bottom: 55,
              }}
            >
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis
                dataKey="name"
                tickLine={false}
                style={{ fontSize: "10px" }}
              />
              <YAxis
                yAxisId={"left"}
                orientation="left"
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "10px" }}
              />
              <YAxis
                yAxisId={"right"}
                orientation="right"
                tickLine={false}
                axisLine={false}
                style={{ fontSize: "10px" }}
              />

              <Tooltip />

              <Line
                yAxisId={"left"}
                type="monotone"
                dataKey={"Non Operational Expenses"}
                stroke={palette.tertiary[500]}
              />
              <Line
                yAxisId={"right"}
                type="monotone"
                dataKey={"Operational Expenses"}
                stroke={palette.primary.main}
              />
            </LineChart>
          </ResponsiveContainer>
        }
      </DashboardBox>
      <DashboardBox gridArea={"e"}>
        <BoxHeader title="Operational Goals" />
        <FlexBetween mt=".25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{ top: 0, right: -10, left: 10, bottom: 0 }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          {/* {flexBasis is a better width} */}
          <Box ml="-.7rem" flexBasis={"40%"} textAlign={"center"}>
            <Typography variant="h5">Target Goals</Typography>
            <Typography m=".3rem 0" variant="h3" color={palette.primary[300]}>
              Turn them into Human
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea={"f"}>
        <BoxHeader title="Product Prices vs Expenses" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />

            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />

            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};
export default Row2;
