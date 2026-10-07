import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.22),transparent_30%),linear-gradient(180deg,#090d18,#0f172a_55%,#111827)] text-slate-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 via-cyan-400 to-emerald-400 text-lg font-bold text-slate-950">
            AG
          </div>
          <div>
            <div className="text-lg font-bold">Age Gracefully</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-300">
          <Link href="#features" className="hover:text-white">Features</Link>
          <Link href="#benefits" className="hover:text-white">Benefits</Link>
          <Link href="/dashboard" className="rounded-full border border-sky-400/50 bg-sky-500/10 px-4 py-2 text-sky-200 transition hover:bg-sky-500/20">
            Launch planner
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-20 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-sky-200">
            Retirement planning made calmer
          </p>
          <h1 className="max-w-xl text-5xl font-black tracking-tight text-white md:text-6xl">
            Plan a brighter next chapter.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Age Gracefully helps you model your retirement goals, stress-test your plan, and build confidence around the lifestyle you want in your later years.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/dashboard" className="rounded-full bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400">
              Start planning
            </Link>
            <Link href="#features" className="rounded-full border border-slate-700 bg-slate-900/60 px-6 py-3 font-semibold text-slate-100 transition hover:border-slate-600">
              Explore features
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-300">
            <div>
              <div className="text-2xl font-bold text-white">$0</div>
              <div>to start</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">3x</div>
              <div>smarter scenarios</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">12+</div>
              <div>retirement tactics</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-soft">
          <div className="rounded-2xl border border-slate-700 bg-slate-950/80 p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Retirement snapshot</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Your plan</h2>
              </div>
              <div className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300">On track</div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-900 p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Projected nest egg</div>
                <div className="mt-2 text-3xl font-bold text-white">$1.42M</div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-900 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Monthly income</div>
                  <div className="mt-2 text-xl font-bold text-sky-300">$7,200</div>
                </div>
                <div className="rounded-2xl bg-slate-900 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Years left</div>
                  <div className="mt-2 text-xl font-bold text-gold">30</div>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-sky-500/10 to-emerald-500/10 p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-300">Retirement score</span>
                  <span className="font-semibold text-white">87/100</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800">
                  <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-sky-400 to-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Features</p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Everything you need for a confident retirement plan.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Scenario planning',
              text: 'Compare conservative, balanced, and aggressive paths so you can make confident decisions.',
            },
            {
              title: 'Personalized recommendations',
              text: 'See how small changes in savings or timing influence your retirement lifestyle.',
            },
            {
              title: 'Lifestyle planning',
              text: 'Align your finances with travel, healthcare, family, and home goals for your future life.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="mb-4 h-12 w-12 rounded-2xl bg-gradient-to-br from-sky-500/20 to-emerald-500/20" />
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="benefits" className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border border-sky-500/20 bg-sky-500/5 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-sky-200">Why people choose it</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Feel calmer about the years ahead.</h2>
            </div>
            <div className="space-y-4 text-slate-200">
              <p>• Build a realistic retirement timeline from your current age and savings.</p>
              <p>• Model lifestyle, income, and spending assumptions without financial jargon.</p>
              <p>• Set goals that support health, purpose, and excitement in your next chapter.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 px-6 py-8 text-center text-sm text-slate-400">
        © 2025 Age Gracefully. Planning your future with clarity and purpose.
      </footer>
    </main>
  );
}
