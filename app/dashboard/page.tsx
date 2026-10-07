'use client';

import { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { calculateRetirementPlan, defaultRetirementInput, RetirementInput } from '@/lib/retirement';

const storageKey = 'age-gracefully-plan';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export default function DashboardPage() {
  const [form, setForm] = useState<RetirementInput>(defaultRetirementInput);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      try {
        setForm({ ...defaultRetirementInput, ...JSON.parse(saved) });
      } catch {
        // ignore invalid data
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(form));
  }, [form]);

  const results = useMemo(() => calculateRetirementPlan(form), [form]);

  const projectionData = useMemo(() => {
    const years = results.yearsToRetirement + 1;
    const data: { year: number; balance: number }[] = [];

    for (let i = 0; i < years; i += 1) {
      const balance =
        form.currentSavings * Math.pow(1 + form.expectedReturn / 100, i) +
        form.annualSavings * ((Math.pow(1 + form.expectedReturn / 100, i) - 1) / (form.expectedReturn / 100));

      data.push({
        year: form.currentAge + i,
        balance: Math.round(balance),
      });
    }

    return data;
  }, [form, results.yearsToRetirement]);

  const handleChange = (field: keyof RetirementInput, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  const applyScenario = (scenario: 'conservative' | 'balanced' | 'aggressive') => {
    const scenarios = {
      conservative: {
        annualSavings: 12000,
        expectedReturn: 5,
        annualExpenses: 52000,
      },
      balanced: {
        annualSavings: 20000,
        expectedReturn: 7,
        annualExpenses: 65000,
      },
      aggressive: {
        annualSavings: 30000,
        expectedReturn: 8.5,
        annualExpenses: 75000,
      },
    } as const;

    setForm((prev) => ({
      ...prev,
      ...scenarios[scenario],
    }));
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-50 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Age Gracefully</p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">Retirement planner</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {['conservative', 'balanced', 'aggressive'].map((scenario) => (
              <button
                key={scenario}
                type="button"
                onClick={() => applyScenario(scenario as 'conservative' | 'balanced' | 'aggressive')}
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-200 transition hover:border-sky-500 hover:text-sky-300"
              >
                {scenario}
              </button>
            ))}
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Years left" value={String(results.yearsToRetirement)} tone="sky" />
          <StatCard label="Projected nest egg" value={formatCurrency(results.projectedNestEgg)} tone="emerald" />
          <StatCard label="Target nest egg" value={formatCurrency(results.targetNestEgg)} tone="gold" />
          <StatCard label="Retirement score" value={`${results.retirementScore}/100`} tone="rose" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Plan inputs</p>
              <h2 className="mt-2 text-2xl font-bold">Your retirement profile</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Current age" value={form.currentAge} onChange={(v) => handleChange('currentAge', v)} />
              <Field label="Retirement age" value={form.retirementAge} onChange={(v) => handleChange('retirementAge', v)} />
              <Field label="Current savings" value={form.currentSavings} onChange={(v) => handleChange('currentSavings', v)} />
              <Field label="Annual savings" value={form.annualSavings} onChange={(v) => handleChange('annualSavings', v)} />
              <Field label="Annual income" value={form.annualIncome} onChange={(v) => handleChange('annualIncome', v)} />
              <Field label="Annual expenses" value={form.annualExpenses} onChange={(v) => handleChange('annualExpenses', v)} />
              <Field label="Expected return (%)" value={form.expectedReturn} onChange={(v) => handleChange('expectedReturn', v)} />
              <Field label="Inflation (%)" value={form.inflation} onChange={(v) => handleChange('inflation', v)} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Summary</p>
              <div className="mt-5 space-y-4">
                <SummaryRow label="Projected monthly income" value={formatCurrency(results.projectedMonthlyIncome)} />
                <SummaryRow label="Annual retirement need" value={formatCurrency(results.annualRetirementNeed)} />
                <SummaryRow label="Recommended monthly savings" value={formatCurrency(results.recommendedMonthlySavings)} />
                <SummaryRow label="Savings gap" value={formatCurrency(results.gap)} />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Insight</p>
              <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                {results.gap > 0 ? (
                  <>You’re currently short by {formatCurrency(results.gap)}. Boosting your annual savings or delaying retirement by a few years could bring your plan back on track.</>
                ) : (
                  <>You’re on a strong path. Your current plan is aligned with a comfortable retirement lifestyle and strong long-term confidence.</>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-400">Projected growth</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionData}>
                  <CartesianGrid stroke="#334155" strokeDasharray="4 4" />
                  <XAxis dataKey="year" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ background: '#0f172a', border: '1px solid #334155' }} />
                  <Line type="monotone" dataKey="balance" stroke="#7dd3fc" strokeWidth={3} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-soft">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-400">Savings mix</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Current', value: form.currentSavings },
                  { name: 'Annual', value: form.annualSavings * results.yearsToRetirement },
                  { name: 'Target', value: results.targetNestEgg },
                ]}>
                  <CartesianGrid stroke="#334155" strokeDasharray="4 4" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ background: '#0f172a', border: '1px solid #334155' }} />
                  <Bar dataKey="value" fill="#7dd3fc" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  tone: 'sky' | 'emerald' | 'gold' | 'rose';
};

function StatCard({ label, value, tone }: StatCardProps) {
  const toneClasses = {
    sky: 'border-sky-500/30 bg-sky-500/10 text-sky-200',
    emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
    gold: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-200',
    rose: 'border-rose-500/30 bg-rose-500/10 text-rose-200',
  };

  return (
    <div className={`rounded-2xl border p-5 shadow-soft ${toneClasses[tone]}`}>
      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{label}</p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: number;
  onChange: (value: string) => void;
};

function Field({ label, value, onChange }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-slate-300">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-sky-500"
      />
    </label>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-sm">
      <span className="text-slate-300">{label}</span>
      <strong className="text-lg text-white">{value}</strong>
    </div>
  );
}
