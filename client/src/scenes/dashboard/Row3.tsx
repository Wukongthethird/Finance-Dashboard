import DashboardBox from "@/components/DashboardBox";
import React from "react";

const Row3: React.FC = () => {
  return (
    <>
      <DashboardBox gridArea={"g"}></DashboardBox>
      <DashboardBox gridArea={"h"}></DashboardBox>
      <DashboardBox gridArea={"i"}></DashboardBox>
      <DashboardBox gridArea={"j"}></DashboardBox>
    </>
  );
};
export default Row3;
