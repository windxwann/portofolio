"use client";

import { useEffect, useState } from "react";
import { Profile } from "@/types";
import { Code, Coffee, Rocket, Heart } from "lucide-react";

export default function About() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState([
    { icon: Code, label: "PROJECTS", value: "..." },
    { icon: Coffee, label: "COFFEE", value: "∞" },
    { icon: Rocket, label: "EXP YEARS", value: "..." },
    { icon: Heart, label: "CLIENTS", value: "..." },
  ]);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data));

    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats([
          { icon: Code, label: "PROJECTS", value: data.projects },
          { icon: Coffee, label: "COFFEE", value: data.coffee },
          { icon: Rocket, label: "EXP YEARS", value: data.expYears },
          { icon: Heart, label: "CLIENTS", value: data.clients },
        ]);
      });
  }, []);

  return (
    <section id="about" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-pokedex-dark rounded-2xl border-4 border-black shadow-[8px_8px_0_#000] overflow-hidden">
        {/* Section header */}
        <div className="bg-pokedex-blue px-6 py-3 border-b-4 border-black flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-pokedex-screen border-2 border-black blink" />
          <span className="font-press-start text-white text-xs tracking-widest">POKEDEX DATALOG</span>
        </div>

        <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Bio */}
          <div className="flex flex-col gap-4">
            <div className="bg-pokedex-screen-dark rounded-lg p-5 border-4 border-black shadow-[inset_0_0_10px_rgba(0,0,0,0.5),4px_4px_0_#000] relative scanlines">
              <p className="font-press-start text-[9px] text-pokedex-screen opacity-60 mb-3 tracking-widest">WHO AM I?</p>
              <p className="font-vt323 text-pokedex-screen text-xl leading-loose">
                {profile?.description ??
                  "I'm a passionate full-stack developer with a love for creating beautiful and functional web applications. My journey in programming started several years ago and I've been leveling up ever since."}
              </p>
              {profile?.bio && (
                <p className="font-vt323 text-pokedex-screen text-xl leading-loose mt-3">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>

          {/* Right: Stats */}
          <div className="flex flex-col gap-4">
            <p className="font-press-start text-pokedex-yellow text-xs tracking-widest">TRAINER STATS:</p>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-pokedex-light rounded-lg p-5 retro-border-light text-center hover:translate-y-[-2px] transition-transform"
                  >
                    <Icon className="w-8 h-8 text-pokedex-red mx-auto mb-2" />
                    <div className="font-press-start text-2xl text-pokedex-black mb-1">{stat.value}</div>
                    <div className="font-press-start text-[9px] text-pokedex-gray tracking-wider">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="retro-btn bg-pokedex-red text-white px-6 py-3 font-press-start text-xs text-center mt-2"
            >
              ► CHALLENGE ME!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
