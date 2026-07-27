const podcasts = [
  {
    id: 1,
    title: "React Podcast",
    description: "Learn React from beginner to advanced.",
    image: "https://picsum.photos/600/300",
    seasons: [
      {
        id: 1,
        title: "Season 1",
        episodes: [
          {
            id: 1,
            title: "Introduction to React",
            description: "Welcome to React.",
            audio:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          },
          {
            id: 2,
            title: "JSX Basics",
            description: "Understanding JSX.",
            audio:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          },
        ],
      },
      {
        id: 2,
        title: "Season 2",
        episodes: [
          {
            id: 3,
            title: "React Hooks",
            description: "Using useState and useEffect.",
            audio:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          },
        ],
      },
    ],
  },
];

export default podcasts;