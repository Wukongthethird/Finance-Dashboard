import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Label,
} from "recharts";

import regression, { DataPoint } from "regression";

/**
 *
 * A component that displays a revenue projection chart using a simple linear regression model.
 * The component shows actual revenue, a regression line, and predicted revenue projection for the next year.
 *
 * @returns {JSX.Element} The JSX code representing the Predictions component
 */

const Predictions: React.FC = () => {
  const { palette } = useTheme();
  // Toggles prediction line
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  const formatData = useMemo(() => {
    if (!kpiData) {
      return [];
    }
    const monthData = kpiData[0].monthlyData;

    // fomatted = shape [ [index,revenue], ......]
    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        // do it like this because of regression library
        return [i, revenue];
      }
    );

    // Generate the regression line based on actual revenue data
    const regressionLine = regression.linear(formatted);

    // Formats data to be displayed in the chart
    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpiData]);

  return (
    <DashboardBox width="100%" height={"100%"} p="1rem" overflow={"hidden"}>
      <FlexBetween m="1rem 2.5rem" gap="1.5rem">
        <Box>
          <Typography variant="h3">Revenue Projection</Typography>
          <Typography variant="h6">
            Revenue simple linear regression model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)",
          }}
        >
          Show Year Projection
        </Button>
      </FlexBetween>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formatData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="Month" offset={-5} position={"insideBottom"} />
          </XAxis>
          <YAxis
            tickFormatter={(v) => `${v}`}
            axisLine={{ strokeWidth: "10px" }}
            style={{ fontSize: "10px" }}
          >
            <Label
              value="Revenue in USD"
              offset={-5}
              angle={-90}
              position={"insideLeft"}
            />
          </YAxis>

          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey={"Actual Revenue"}
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type="monotone"
            dataKey={"Regression Line"}
            stroke={"#8884d8"}
            dot={false}
          />
          {isPredictions && (
            <Line
              //   strokeDasharray="5 5"
              dataKey={"Predicted Revenue"}
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};
export default Predictions;
