interface StatsCardProps {
  title: string;
  count: number | string;
}

const ListStatisticsCard = ({ title, count }: StatsCardProps) => {
  return (
    <div className={`rounded-lg p-6 shadow-sm border border-gray-200`}>
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <p className={`text-3xl font-bold`}>{count}</p>
    </div>
  );
};

export default ListStatisticsCard;
