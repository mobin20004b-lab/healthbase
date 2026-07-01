import { Card } from '@/web/components/ui/card';
import { useTranslations } from 'next-intl';

interface LabResult {
  id: string;
  name: string;
  value: number;
  unit: string;
  minNormal: number;
  maxNormal: number;
  date: string;
}

const mockResults: LabResult[] = [
  { id: '1', name: 'Hemoglobin A1C', value: 5.4, unit: '%', minNormal: 4.0, maxNormal: 5.6, date: '2023-10-25' },
  { id: '2', name: 'Total Cholesterol', value: 185, unit: 'mg/dL', minNormal: 125, maxNormal: 200, date: '2023-10-25' },
  { id: '3', name: 'LDL Cholesterol', value: 115, unit: 'mg/dL', minNormal: 0, maxNormal: 99, date: '2023-10-25' }, // Out of range
  { id: '4', name: 'HDL Cholesterol', value: 55, unit: 'mg/dL', minNormal: 40, maxNormal: 100, date: '2023-10-25' },
  { id: '5', name: 'Triglycerides', value: 120, unit: 'mg/dL', minNormal: 0, maxNormal: 149, date: '2023-10-25' },
];

export function LabResultsTable() {
  const t = useTranslations('Patient');

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">{t('recentLabResults') || 'Recent Lab Results'}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-on-surface-variant uppercase bg-surface-container-low border-b">
            <tr>
              <th scope="col" className="px-6 py-3">Test Name</th>
              <th scope="col" className="px-6 py-3">Result</th>
              <th scope="col" className="px-6 py-3">Reference Range</th>
              <th scope="col" className="px-6 py-3 w-64">Visual Indicator</th>
              <th scope="col" className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockResults.map((result) => {
              const range = result.maxNormal - result.minNormal;
              // Expand the visual range slightly to show out-of-bounds results
              const visualMin = result.minNormal - range * 0.5;
              const visualMax = result.maxNormal + range * 0.5;
              const visualRange = visualMax - visualMin;

              const isNormal = result.value >= result.minNormal && result.value <= result.maxNormal;

              // Calculate percentages for CSS
              let markerPercent = ((result.value - visualMin) / visualRange) * 100;
              // Clamp between 0 and 100
              markerPercent = Math.max(0, Math.min(100, markerPercent));

              const normalStartPercent = ((result.minNormal - visualMin) / visualRange) * 100;
              const normalEndPercent = ((result.maxNormal - visualMin) / visualRange) * 100;

              return (
                <tr key={result.id} className="bg-surface border-b hover:bg-surface-container-low/50">
                  <td className="px-6 py-4 font-medium">{result.name}</td>
                  <td className={`px-6 py-4 font-bold ${isNormal ? 'text-on-surface' : 'text-error'}`}>
                    {result.value} {result.unit}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">
                    {result.minNormal} - {result.maxNormal} {result.unit}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                       {/* Normal Range Gradient Bar */}
                       <div
                         className="absolute top-0 h-full bg-gradient-to-r from-success/50 via-success to-success/50"
                         style={{
                           left: `${normalStartPercent}%`,
                           width: `${normalEndPercent - normalStartPercent}%`
                         }}
                       />
                       {/* Value Marker */}
                       <div
                         className={`absolute top-0 w-1.5 h-full transform -translate-x-1/2 ${isNormal ? 'bg-primary' : 'bg-error'}`}
                         style={{ left: `${markerPercent}%` }}
                       />
                       {/* Small triangle at the top of the marker */}
                       <div
                         className={`absolute -top-1 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] transform -translate-x-1/2 ${isNormal ? 'border-t-primary' : 'border-t-error'}`}
                         style={{ left: `${markerPercent}%` }}
                       />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant whitespace-nowrap">
                    {new Date(result.date).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
