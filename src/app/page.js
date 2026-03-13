"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const menuItems = [
    {
      label: "checkout my resume",
      key: "r",
      path: "/resume",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <line x1="10" x2="8" y1="9" y2="9" />
        </svg>
      ),
    },
    {
      label: "view my projects",
      key: "p",
      path: "/projects",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
      ),
    },
    {
      label: "contact",
      key: "c",
      path: "/callMeMaybe",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      label: "blog",
      key: "b",
      path: "/blog",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      label: "quit",
      key: "q",
      path: "/quit",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const menuItem = menuItems.find((item) => item.key === key);
      if (menuItem) {
        router.push(menuItem.path);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, menuItems]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="text-center mb-24">
        <h1 className="group flex justify-center font-playwrite text-4xl md:text-8xl text-yellow tracking-tighter transition-all hover:scale-105 cursor-default drop-shadow-[0_0_20px_rgba(255,199,119,0.9)] drop-shadow-[0_0_40px_rgba(255,199,119,0.4)]">
          Ka
          <span className="inline-flex transition-all duration-500 overflow-hidden max-w-[1em] group-hover:max-w-0 group-hover:opacity-0">
            z
          </span>
          <span className="inline-flex transition-all duration-500 overflow-hidden max-w-0 opacity-0 group-hover:max-w-[2em] group-hover:opacity-100">
            sh
          </span>
          's Server
        </h1>
      </div>

      <nav className="flex flex-col gap-4 w-full max-w-md font-jetbrains">
        {menuItems.map((item) => (
          <div
            key={item.key}
            onClick={() => router.push(item.path)}
            className="group flex items-center justify-between py-0.5 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-blue2 group-hover:opacity-80 scale-75">
                {item.icon}
              </span>
              <span className="text-xs text-blue2 transition-colors uppercase tracking-widest">
                {item.label}
              </span>
            </div>
            <span className="text-[10px] text-yellow opacity-60 group-hover:opacity-100 transition-opacity ml-4 font-bold">
              [{item.key}]
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
}
