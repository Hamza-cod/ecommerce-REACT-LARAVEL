import { BarChart } from '@tremor/react';



export function BarChartExampleWithCustomTooltip({data}) {
 

  const customTooltip = (props) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return ( 
      <div className="w-full rounded-tremor-default border  border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown">
        {payload.map((category, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5 ">
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.dataKey}</p>
              <p className="font-medium text-tremor-content-emphasis">
                {category.value} orders
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Average Orders
      </h3>
      <BarChart
        className="mt-4 h-72 w-full"
        data={data}
        index="date"
        categories={['count']}
        colors={['blue']}
        yAxisWidth={30}
        customTooltip={customTooltip}
      />
    </>
  );
}