import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  BarChart,
  Bar,
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
  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        };
      })
    );
  }, [data]);
  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [data]);

  return (
    <>
      <DashboardBox gridArea={"a"}>
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="Subhuman behaviors"
          sideText="+46"
        />
        {revenueExpenses! && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={revenueExpenses}
              margin={{
                top: 15,
                right: 25,
                left: -10,
                bottom: 60,
              }}
            >
              <defs>
                {/**REVENUE GRADIENT */}
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.5}
                  />

                  <stop
                    offset="95%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.5}
                  />
                </linearGradient>
                {/**EXPENSES GRADIENT */}
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.5}
                  />

                  <stop
                    offset="95%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.5}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                tickLine={false}
                style={{ fontSize: "10px" }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ strokeWidth: "0px" }}
                style={{ fontSize: "10px" }}
                domain={[8000, 24000]}
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

      <DashboardBox gridArea={"b"}>
        <BoxHeader
          title="Profit and Revenue"
          subtitle="Subhuman behaviors"
          sideText="+46"
        />
        {revenueExpenses! && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              // width={500}
              // height={400}
              data={revenueProfit}
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
              <Legend
                height={20}
                wrapperStyle={{
                  margin: "0 0 10px 0",
                }}
              />
              <Line
                yAxisId={"left"}
                type="monotone"
                dataKey={"profit"}
                stroke={palette.tertiary[500]}
              />
              <Line
                yAxisId={"right"}
                type="monotone"
                dataKey={"revenue"}
                stroke={palette.primary.main}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </DashboardBox>
      <DashboardBox gridArea={"c"}>
        <BoxHeader
          title="Revenue by Month"
          subtitle="subhuman goals"
          sideText="+4%"
        />
        {revenue && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={revenue}
              margin={{
                top: 17,
                right: 15,
                left: -5,
                bottom: 58,
              }}
            >
              <defs>
                {/**REVENUE GRADIENT */}
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.8}
                  />

                  <stop
                    offset="95%"
                    stopColor={palette.primary[300]}
                    stopOpacity={0.5}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "10px" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                style={{ fontSize: "10px" }}
              />
              <Tooltip />

              <Bar dataKey="revenue" fill="url(#colorRevenue)" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </DashboardBox>
    </>
  );
};
export default Row1;
