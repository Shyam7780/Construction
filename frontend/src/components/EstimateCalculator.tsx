import { useEffect, useState } from 'react';

interface Rate {
  id: number;
  service_type: string;
  package_tier: string;
  rate_per_sqft: number;
  description: string;
}

export default function EstimateCalculator() {
  const [rates, setRates] = useState<Rate[]>([]);
  const [serviceType, setServiceType] = useState<'labor_only' | 'with_material' | 'remodeling'>('with_material');
  const [packageTier, setPackageTier] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [area, setArea] = useState(2500);
  const [estimate, setEstimate] = useState(0);
  const [currentRate, setCurrentRate] = useState<Rate | null>(null);

  useEffect(() => {
    fetch('/api/pricing').then(res => res.json()).then(setRates);
  }, []);

  useEffect(() => {
    if (!rates.length) return;

    let rate: Rate | undefined;

    if (serviceType === 'labor_only') {
      rate = rates.find(r => r.service_type === 'labor_only');
    } else if (serviceType === 'remodeling') {
      rate = rates.find(r => r.service_type === 'remodeling');
    } else {
      rate = rates.find(r => r.service_type === 'with_material' && r.package_tier === packageTier);
    }

    if (rate) {
      const total = Math.round(rate.rate_per_sqft * area);
      setEstimate(total);
      setCurrentRate(rate);
    }
  }, [serviceType, packageTier, area, rates]);

  const packages = [
    { tier: 'basic', label: 'Basic', color: 'border-gray-300' },
    { tier: 'standard', label: 'Standard', color: 'border-[#f59e0b]' },
    { tier: 'premium', label: 'Premium', color: 'border-[#1e3a5f]' }
  ];

  return (
    <section id="calculator" className="bg-white py-24 border-t">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-block px-4 py-1 bg-amber-100 text-[#f59e0b] text-xs tracking-[2px] font-semibold rounded mb-4">LIVE PRICING</div>
          <h2 className="text-6xl font-semibold tracking-[-2.5px] text-[#1e3a5f]">Estimate Your Project</h2>
          <p className="text-xl text-gray-600 mt-3 max-w-md mx-auto">Select your service and area to get an instant accurate quote.</p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Service Type Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { key: 'labor_only', label: 'Labor Only' },
              { key: 'with_material', label: 'With Material' },
              { key: 'remodeling', label: 'Remodeling' }
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setServiceType(s.key as any)}
                className={`px-9 py-3.5 text-sm font-medium rounded-2xl border transition-all ${serviceType === s.key ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Package Selection for With Material */}
          {serviceType === 'with_material' && (
            <div className="mb-10">
              <div className="text-center text-sm text-gray-500 mb-4 tracking-wider">CHOOSE YOUR PACKAGE</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => {
                  const rate = rates.find(r => r.service_type === 'with_material' && r.package_tier === pkg.tier);
                  const isSelected = packageTier === pkg.tier;
                  return (
                    <button
                      key={pkg.tier}
                      onClick={() => setPackageTier(pkg.tier as any)}
                      className={`p-6 border-2 rounded-2xl text-left transition-all ${isSelected ? pkg.color + ' bg-[#f8f9fb]' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="font-semibold text-xl tracking-tight">{pkg.label}</div>
                      <div className="mt-4 text-4xl font-semibold tabular-nums">₹{rate?.rate_per_sqft}</div>
                      <div className="text-sm text-gray-500">per sq ft</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Area Input */}
          <div className="bg-[#f8f9fb] rounded-3xl p-10 mb-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-500 mb-3">PROJECT SIZE</div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="800"
                    max="15000"
                    step="50"
                    value={area}
                    onChange={(e) => setArea(parseInt(e.target.value))}
                    className="flex-1 accent-[#f59e0b]"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(Math.max(800, Math.min(15000, parseInt(e.target.value) || 800)))}
                      className="w-24 border px-4 py-3 rounded-xl text-right font-semibold text-2xl tabular-nums"
                    />
                    <span className="text-gray-500 font-medium">sq ft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="bg-[#1e3a5f] text-white rounded-3xl p-12 text-center">
            <div className="uppercase text-xs tracking-[3px] text-white/60 mb-3">YOUR ESTIMATED COST</div>
            <div className="text-[92px] leading-none font-semibold tracking-[-6px] tabular-nums">
              ₹{estimate.toLocaleString('en-IN')}
            </div>
            
            {currentRate && (
              <div className="mt-4 text-xl text-white/70">
                ₹{currentRate.rate_per_sqft} per sq ft × {area} sq ft
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-white/20 max-w-md mx-auto text-white/70 text-[15px]">
              {currentRate?.description}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
