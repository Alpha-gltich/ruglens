import Dashboard from "./Dashboard";

const TOKEN_NAMES = [
  "BlackRock BUIDL",
  "Ondo Yield Assets",
  "Circle USYC",
  "Centrifuge Protocol",
  "RealT Tokens",
  "Tether Gold",
  "WisdomTree",
  "Hastra",
];

type Protocol = {
  name: string;
  tvl: number;
  tags?: string[];
  chains?: string[];
};

async function getRwaTokens(): Promise<Protocol[]> {
  const res = await fetch("https://api.llama.fi/protocols", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch protocols: ${res.status}`);
  }

  const data: Protocol[] = await res.json();

  return data.filter((protocol) => TOKEN_NAMES.includes(protocol.name));
}

export default async function Home() {
  const tokens = await getRwaTokens();

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-8">RugLens</h1>
        <Dashboard tokens={tokens} />
      </div>
    </div>
  );
}