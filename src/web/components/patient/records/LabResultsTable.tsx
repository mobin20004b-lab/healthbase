import { useTranslations } from "next-intl";

interface LabResult {
  id: string;
  testName: string;
  result: number;
  unit: string;
  minRange: number;
  maxRange: number;
}

interface LabResultsTableProps {
  results: LabResult[];
}

export function LabResultsTable({ results }: LabResultsTableProps) {
  const t = useTranslations("Patient.records");

  const calculatePercentage = (result: number, min: number, max: number) => {
    // Add 10% padding on each side for visual representation of out-of-bounds
    const range = max - min;
    const padding = range / 8; // So total range is 80% of the bar, leaving exactly 10% padding on each side
    const paddedMin = min - padding;
    const paddedMax = max + padding;
    const totalPaddedRange = paddedMax - paddedMin;

    let percentage = ((result - paddedMin) / totalPaddedRange) * 100;

    // Clamp between 0 and 100
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    return percentage;
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-outline-variant">
            <th className="py-3 px-4 font-bold text-sm text-on-surface-variant">
              {t("testName")}
            </th>
            <th className="py-3 px-4 font-bold text-sm text-on-surface-variant">
              {t("result")}
            </th>
            <th className="py-3 px-4 font-bold text-sm text-on-surface-variant w-1/2 min-w-[200px]">
              {t("normalRange")}
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => {
            const isAbnormal = item.result < item.minRange || item.result > item.maxRange;
            const markerPosition = calculatePercentage(item.result, item.minRange, item.maxRange);
            // Visual range bar is a gradient bar (Green center, Grey edges)
            // Center green portion corresponds to minRange to maxRange
            // Left/Right gray edges represent the 10% padding

            return (
              <tr key={item.id} className="border-b border-outline-variant/50 hover:bg-surface-container/50 transition-colors">
                <td className="py-4 px-4 text-sm font-medium text-on-surface">
                  {item.testName}
                </td>
                <td className="py-4 px-4 text-sm font-bold">
                  <span className={isAbnormal ? "text-error" : "text-primary"}>
                    {item.result} {item.unit}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-on-surface-variant w-12 text-right">{item.minRange}</span>
                    <div className="relative flex-1 h-3 rounded-full bg-gradient-to-r from-surface-variant via-success to-surface-variant"
                         style={{ background: 'linear-gradient(to right, #9ca3af 0%, #9ca3af 10%, #22c55e 10%, #22c55e 90%, #9ca3af 90%, #9ca3af 100%)' }}>
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-on-surface"
                        style={{ left: `calc(${markerPosition}% - 6px)` }}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-xs text-on-surface-variant w-12">{item.maxRange}</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
