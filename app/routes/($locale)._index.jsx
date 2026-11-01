
export const meta = () => {
  return [
    {title: 'Snohomishire | Heritage Fruit Trees & Orchard Plants'},
    {
      name: 'description',
      content:
        'Discover heritage fruit growing with Snohomishire. Grafted apple trees, apple scions, grape cuttings, and fig cuttings for home gardeners and orchard growers.',
    },
  ];
};

const offerings = [
  {
    number: '01',
    title: 'Grafted Apple Trees',
    description:
      'A thoughtful start to your own orchard, with grafted apple trees selected for fruit growers and home gardens.',
  },
  {
    number: '02',
    title: 'Apple Grafting Scions',
    description:
      'Explore the traditional art of grafting and bring new varieties to your existing trees.',
  },
  {
    number: '03',
    title: 'Grape Cuttings',
    description:
      'Grow your own vines and add another dimension to your home garden or small orchard.',
  },
  {
    number: '04',
    title: 'Fig Cuttings',
    description:
      'Discover the pleasure of growing figs and adding something special to your garden.',
  },
];

export default function Homepage() {
  return (
    <main className="bg-[#f6f2e8] text-[#243b2d]">
      <div className="border-b border-[#d9d2c2] bg-[#243b2d] px-6 py-3 text-center text-xs tracking-[0.2em] text-[#f6f2e8] uppercase">
        A little more orchard in everyday life
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
       <a href="/" className="flex items-center">
  <img
    src="/images/snohomishire-logo.png"
    alt="Snohomishire — Fruit Trees & Scions"
    className="h-32 w-auto max-w-[480px] object-contain"
  />
</a>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          <a href="#story" className="transition hover:text-[#a65b36]">
            Our Story
          </a>
          <a href="#offerings" className="transition hover:text-[#a65b36]">
            The Nursery
          </a>
          <a href="#growing" className="transition hover:text-[#a65b36]">
            Growing Notes
          </a>
        </nav>

        <a
          href="#offerings"
          className="border border-[#243b2d] px-5 py-3 text-xs tracking-[0.12em] uppercase transition hover:bg-[#243b2d] hover:text-[#f6f2e8]"
        >
          Explore
        </a>
      </header>

      <section className="relative overflow-hidden bg-[#243b2d] px-6 py-24 text-[#f6f2e8] md:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="mb-7 text-xs tracking-[0.28em] text-[#d9b58b] uppercase">
            Heritage plants · Orchard traditions · Thoughtful growing
          </p>

          <h1 className="max-w-4xl text-5xl leading-[1.08] font-medium tracking-tight md:text-7xl">
            Grow something
            <br />
            worth passing on.
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-[#e2dfd3] md:text-lg">
            Welcome to Snohomishire, a nursery inspired by the enduring
            pleasure of growing fruit. Discover the traditions, plants, and
            possibilities behind a garden of your own.
          </p>

          <a
            href="#offerings"
            className="mt-10 inline-block border border-[#d9b58b] px-7 py-4 text-xs tracking-[0.16em] text-[#f6f2e8] uppercase transition hover:bg-[#d9b58b] hover:text-[#243b2d]"
          >
            Discover the nursery
          </a>

          <div className="mt-20 border-t border-[#607064] pt-5 text-xs tracking-[0.18em] text-[#d9b58b] uppercase">
            Rooted in tradition. Grown for tomorrow.
          </div>
        </div>
      </section>

      <section id="story" className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:gap-24">
          <div>
            <p className="mb-5 text-xs tracking-[0.22em] text-[#a65b36] uppercase">
              The Snohomishire approach
            </p>
            <h2 className="text-4xl leading-tight font-medium md:text-5xl">
              The good things
              <br />
              take root slowly.
            </h2>
          </div>

          <div className="max-w-xl self-end">
            <p className="text-lg leading-9 text-[#536052]">
              There is something special about planting a fruit tree. It is
              an investment in seasons to come, a connection to generations
              of gardeners, and an invitation to slow down and grow.
            </p>
            <p className="mt-5 leading-8 text-[#536052]">
              Snohomishire celebrates heritage varieties, traditional
              grafting knowledge, and the simple satisfaction of growing
              something yourself.
            </p>
          </div>
        </div>
      </section>

      <section id="offerings" className="bg-[#eae5d8] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="mb-5 text-xs tracking-[0.22em] text-[#a65b36] uppercase">
              What we grow
            </p>
            <h2 className="text-4xl font-medium md:text-5xl">
              A nursery for the curious grower.
            </h2>
            <p className="mt-6 leading-8 text-[#536052]">
              From starting an orchard to experimenting with grafting,
              explore the kinds of plants and growing traditions at the
              heart of Snohomishire.
            </p>
          </div>

          <div className="grid gap-px bg-[#c9c2b3] sm:grid-cols-2">
            {offerings.map((item) => (
              <article
                key={item.number}
                className="bg-[#f6f2e8] p-8 md:p-11"
              >
                <p className="mb-12 text-xs tracking-[0.2em] text-[#a65b36]">
                  {item.number}
                </p>
                <h3 className="text-2xl font-medium">{item.title}</h3>
                <p className="mt-4 max-w-md leading-7 text-[#647064]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-8 text-sm text-[#647064]">
            Our online product catalog is being prepared. Check back as the
            nursery lineup takes shape.
          </p>
        </div>
      </section>

      <section id="growing" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs tracking-[0.22em] text-[#a65b36] uppercase">
            A grower's perspective
          </p>
          <h2 className="text-4xl leading-tight font-medium md:text-5xl">
            Good growing begins with good knowledge.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-9 text-[#647064]">
            Every orchard has a story. We believe in sharing the knowledge
            behind the plants: the varieties, the seasons, the craft of
            grafting, and the little details that make growing rewarding.
          </p>
        </div>
      </section>

      <footer className="bg-[#243b2d] px-6 py-14 text-[#f6f2e8]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="text-xl font-semibold tracking-[0.12em]">
              SNOHOMISHIRE
            </p>
            <p className="mt-3 text-sm text-[#c8cbbd]">
              Heritage plants. Thoughtful growing.
            </p>
          </div>

          <div className="text-sm text-[#c8cbbd]">
            <p>Growing something good, one season at a time.</p>
            <p className="mt-3">© {new Date().getFullYear()} Snohomishire</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
