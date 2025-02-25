import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// type Row1Props = {};

const Row1: React.FC = () => {
  const { data } = useGetKpisQuery();
  console.log("🚀 ~ data:", data);
  const { palette } = useTheme();

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);
  console.log("🚀 ~ revenueExpenses ~ revenueExpenses:", revenueExpenses);

  return (
    <>
      <DashboardBox gridArea={"a"}>
        {revenueExpenses! && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={revenueExpenses}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                style={{ fontSize: "10px" }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ strokeWidth: "0px" }}
                style={{ fontSize: "10px" }}
                domain={[8000, 23000]}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={palette.primary.main}
                fillOpacity={1}
                dot={true}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke={palette.primary.main}
                fillOpacity={1}
                dot={true}
                fill="url(#colorExpenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </DashboardBox>

      <DashboardBox gridArea={"b"}></DashboardBox>
      <DashboardBox gridArea={"c"}></DashboardBox>
    </>
  );
};
export default Row1;
