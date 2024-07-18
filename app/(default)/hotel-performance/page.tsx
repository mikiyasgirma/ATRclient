import { DataTable } from "./create-performance/data-table";

const HotelPerformance = () => {
  return (
    <div>
      <div className="pb-6 underline underline-offset-4 text-lg text-primary font-semibold">
        Hotels Performance
      </div>
      <DataTable />
    </div>
  );
};
export default HotelPerformance;
