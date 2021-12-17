import MainLayout from "../layout/MainLayout";

export interface DashboardProps {
}

export const Dashboard: React.FunctionComponent<DashboardProps> = ({
  ...props
}) => {
  return (
		<MainLayout>
			<h1>Dashboard</h1>
		</MainLayout>
  );
};

export default Dashboard;
