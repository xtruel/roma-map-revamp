import { Users, Calendar, Trophy } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "250K+",
    label: "Romanisti nel Mondo",
  },
  {
    icon: Calendar,
    value: "97",
    label: "Anni di Storia",
  },
  {
    icon: Trophy,
    value: "13",
    label: "Trofei Vinti",
  },
];

const Stats = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="font-display text-5xl md:text-6xl text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
