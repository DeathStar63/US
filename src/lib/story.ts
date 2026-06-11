// ───────────────────────────────────────────────────────────────────────────
//  US ♥ — story config & content
//  Everything you'd want to edit lives here.
// ───────────────────────────────────────────────────────────────────────────

export const STORY_CONFIG = {
  // Her name — used in greetings.
  herName: "Ada",
  // Your name — shown in the closing signature.
  yourName: "Ayush",
  // The 6-digit PIN she'll enter to unlock the experience.
  // Change this to something meaningful (e.g. the date you met: "140622").
  pin: "251221",
  // Optional ambient music. Drop an mp3 into /public/ and set the path,
  // e.g. "/song.mp3". Leave as null to hide the music toggle entirely.
  musicSrc: null as string | null,
} as const;

// ── Scene model ──────────────────────────────────────────────────────────────

export type Interaction =
  | { kind: "continue"; label?: string }
  | { kind: "choice"; prompt: string; options: ChoiceOption[]; storageKey?: string }
  | { kind: "input"; prompt: string; placeholder?: string; storageKey: string }
  | { kind: "reveal"; label: string; hidden: string }
  | { kind: "flow-game" }
  | { kind: "flower-box" }
  | { kind: "finale"; signoff?: string };

export interface ChoiceOption {
  label: string;
  response: string;
}

export interface Scene {
  id: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  videoPoster?: string;
  videoVolume?: number;
  heading?: string;
  body?: string[];
  interaction?: Interaction;
  surprise?: "hearts" | "none";
  gifs?: string[];       // Giphy IDs → rendered as iframes
  gifUrls?: string[];    // direct image URLs → rendered as <img> tags (faster)
}

// ── The story ────────────────────────────────────────────────────────────────
// Photos: drop real images into /public/photos/ and update the `image` paths.
// Any path containing "placeholder" shows a soft pink frame until replaced.

export const SCENES: Scene[] = [
  {
    id: "open",
    heading: `Hi, ${STORY_CONFIG.herName}.`,
    body: [
      "There's something I've wanted to say properly, not half-right in a text.",
      "So I made you this. It's only a few minutes. Take it slow — there's nothing to fix here, just something I need you to read.",
    ],
    surprise: "hearts",
    interaction: { kind: "continue", label: "Okay, I'm listening" },
  },
  {
    id: "what-this-is",
    heading: "Before we begin —",
    body: [
      "What this is:",
      "__GIF_0__",
      "A way for me to truly know you — to understand you, not just assume I do. A warm, safe space for you to say whatever's been sitting on your heart. Something to help us stay right here, in the present, not spiraling into every what-if.",
      "A way for me to hold your space better — so you can take time for yourself without feeling guilty for it. A way for us to find our balance: feeling whole on our own, and coming to each other because we want to, not because we have to.",
      "A way to heal — gently, slowly, with each other beside us. Taking things as they come, one at a time.",
      "What this is not:",
      "__GIF_1__",
      "Me asking more of you. Me asking for your time or energy right now. A self-sabotage. Us pushing each other away. A reason to make any big decisions today. Something to blame yourself — or us — for.",
      "A sign that something between us is broken. Me loving you any less. Something to carry alone. Something to be afraid of. The beginning of an ending.",
      "Just read it with an open heart. That's all.",
    ],
    gifs: [
      "k84qZt3FhtWZLKZ5k1",
      "nR4L10XlJcSeQ",
    ],
    interaction: { kind: "continue", label: "Okay" },
  },
  {
    id: "depend",
    heading: "I've been thinking about us.",
    body: [
      "Our lives depend a lot on each other — and I don't think they should.",
      "I think we each need our own part of life. A place where you enjoy your own time and feel content on your own first — and then, after a tiring day, we come together. And that time means even more because of it.",
    ],
    interaction: { kind: "continue", label: "Keep going" },
  },
  {
    id: "boundaries-truth",
    heading: "You once said something I can't forget.",
    body: [
      `"I don't know who I am without you."`,
      "And it's true — I think for both of us. We never really set boundaries. And the few we did set, we crossed them anyway, out of love, telling ourselves it was okay.",
    ],
    interaction: { kind: "continue", label: "Continue" },
  },
  {
    id: "dehradun",
    heading: "I hope Dehradun gave you what you needed.",
    body: [
      "I hope you felt alive there. That you breathed easier, laughed without any weight on you — and remembered what it feels like to just be you.",
      "And if you want more of that — more time, more space, more trips like that — I want you to have it. Even now that you're back. That space doesn't have to end here. I'm ready to give it after too.",
    ],
    interaction: { kind: "continue", label: "Keep going" },
  },
  {
    id: "acknowledge",
    heading: "I want to acknowledge what you've been feeling.",
    body: [
      "You want to learn how to be happy alone first. That's not just valid — it's important, and I'm glad you're honest enough with yourself to say it.",
      "You feel like I love you so much, and you can't give it back the same way right now. That's okay. You don't have to. I'm not keeping score.",
      "You need time — and this doesn't have to be a hard, final decision. Take all of it. If you want more time alone before we even slowly start talking again, that's okay too. I know you've already thought about all of this. I just want you to hear that I've heard it.",
    ],
    interaction: { kind: "continue", label: "There's more" },
  },
  {
    id: "clear-space",
    heading: "About not reaching out during your trip —",
    body: [
      "I understand. With me even just in a text, you'd end up thinking about us. We'd find our way back to each other, and you'd lose yourself in it again — loop back, and feel lost all over again.",
      "So yes — you needed that clean, clear space. It makes complete sense.",
      "But I believe this time would be different. With real, kept boundaries — not ones we quietly cross out of love — you could have yourself, and still have us.",
    ],
    interaction: { kind: "continue", label: "I'm still here" },
  },
  {
    id: "flow-game",
    heading: "Take a little break.",
    body: ["You've been reading a lot. This one's just for fun — I know you love it."],
    interaction: { kind: "flow-game" },
  },
  {
    id: "flower-box",
    heading: "And something for you.",
    body: ["Open it."],
    interaction: { kind: "flower-box" },
  },
  {
    id: "pune",
    image: "/photos/pune.jpg",
    imageAlt: "Us, back in Pune",
    heading: "Remember Pune, in the beginning?",
    body: [
      "We'd meet once a day, spend real, good time together — and then you'd go home, and we wouldn't even text or call. We just met again the next day.",
      "You went to college, spent time with your friends, then came to me. You went home, did your chores, studied, did the things you love — without me in all of it.",
      "And we were good. We were full.",
    ],
    interaction: { kind: "continue", label: "I remember" },
  },
  {
    id: "fuller",
    heading: "And that's what made it so beautiful.",
    body: [
      "We were full without each other at first — and then when you entered my life, and I yours, you made it even more fun, more full. We had things to do by ourselves, and then on top of that we had each other. Quality time that we genuinely enjoyed. Not a replacement — a lovely add on.",
      "But with time, people change. Things change. Bonds change. We shouldn't be stuck with the old ways — we should keep altering things with how we feel in that moment.",
      "Right now I know you feel lost. So I would love for us to give you more time for yourself.",
    ],
    interaction: { kind: "continue", label: "Keep going" },
  },
  {
    id: "me",
    video: "/videos/me.mp4",
    videoPoster: "/videos/me-poster.jpg",
    imageAlt: "Me, being honest",
    heading: "And I have to be honest about me too.",
    body: [
      "I think I need space for myself as well. Lately I've been feeling low. Without talking to you, my day feels strange — I feel lonely.",
      "Even when I could talk to other people, I don't — I'd rather talk to you. And if you're busy, I feel bad that I didn't get to. I don't really have friends here anymore.",
      "If you've noticed, I spend most of my time after work on a Gmeet with you. I don't want to put all of that weight on you — that isn't fair to either of us.",
    ],
    surprise: "hearts",
    interaction: { kind: "continue", label: "Keep going" },
  },
  {
    id: "happy",
    heading: "And honestly — I haven't been happy.",
    body: [
      "That's strange for me to say, because I'm an optimistic person at heart. I genuinely believe life is supposed to be full and bright. I love people. I love meeting them, talking to them, making them laugh.",
      "But lately I've lost the confidence to do any of that. To walk up to someone new. To make a friend. To just be in a room and feel like myself. I don't know exactly when that happened.",
      "I'm also afraid of losing you. You're the best thing that's happened to me — and I think that fear has made me hold on tighter than I should. In trying not to lose you, I've been slowly losing myself.",
      "After work, you've become my only reason to feel something good. I know that isn't fair to you. And it isn't fair to me either.",
      "I want to feel better — genuinely, from the inside. Because I believe that when I'm happy, the people around me feel it too. Especially you. I want to bring you joy, not ask you for it.",
      "I love you more than I can put into words. I've always waited for you — and I always will. But I don't want to keep waiting at the cost of disappearing from myself.",
      "I want us to be happy together. But I think we need to be happy on our own first.",
    ],
    interaction: { kind: "continue", label: "I hear you" },
  },
  {
    id: "bumble",
    heading: "You are in everything I am.",
    body: [
      "On Bumble. You said you liked my smile.",
      "I was new to Pune then — living alone in a flat, didn't know anyone, still figuring out what this city even was. I had no one there.",
      "And then you showed up. You became the reason I had something to smile about. You gave me a 'someone' when I had none. You made Pune beautiful — a city I was starting to feel lost in suddenly had a reason to feel like home.",
      "You made me feel like I wasn't alone.",
      "I miss that smile too, Ada. The one you noticed first. I want to find it again — not just for you, but for me.",
      "You are the reason I am who I am today. Your habits became mine. The things you love, I found myself loving too. The way I talk, the things I notice, the small parts of how I move through the world — so much of it has you in it.",
      "Some things I learned from you. Some things we built together. Some things we just quietly took from each other without even realising. You've become a part of me — a part of who I am.",
      "And we are different people. Different upbringings, different minds, different ways of seeing things. But that's exactly what keeps pulling me in. I always want to know more about you. Every difference gives me a new reason to respect you — and another reason to love you.",
      "And honestly — I am afraid of losing you. Because losing you feels like I'm losing a part of myself…",
    ],
    interaction: { kind: "continue", label: "Keep going" },
  },
  {
    id: "reveal-note",
    heading: "So here's what I really want you to know.",
    body: ["Tap to read it."],
    interaction: {
      kind: "reveal",
      label: "Open the note",
      // Write your most personal line here ↓
      hidden:
        "I don't want you to shrink to be loved by me — and I don't want to lean my whole world on you either. I want us both whole on our own, and then together.",
    },
  },
  {
    id: "cats",
    video: "/videos/cat-funny.mp4",
    videoVolume: 0.4,
    heading: "Okay but also —",
    body: ["Look at these funny cats. I hope they make you smile and your heart a little lighter."],
    gifUrls: [
      "https://media.giphy.com/media/uyfgCPQeCjYMVxt2m3/giphy.mp4",
      "https://media.giphy.com/media/125E8v90blHqtr4HrB/giphy.mp4",
      "https://media.giphy.com/media/v3Rb7dGuvkmaRi6qei/giphy.mp4",
    ],
    interaction: { kind: "continue", label: "Okay I'm better now" },
  },
  {
    id: "boundaries",
    heading: "So here's what I'd love us to try.",
    body: [
      "Our own lives first — your friends, your studies, the things that are only yours. Mine too: I'll work on building a life here that isn't just us.",
      "Then real, set time together — when we both actually feel like it. Not every day if that's too much. Even once a week, if that's what feels right. Dedicated time we both look forward to, not time we fall into out of routine.",
      "I want to ask you — what do you want to do for yourself? What would you want to do with me? You tell me your boundaries. I'll keep them.",
      "And we get to say 'I need space' without it ever meaning something is wrong.",
    ],
    interaction: { kind: "continue", label: "I like that" },
  },
  {
    id: "planning",
    heading: "\"Tab ki tab sochenge\" — let's leave that behind.",
    body: [
      "We've always winged it. Told ourselves we'd figure it out when we got there. Sometimes it was beautiful. But sometimes it wasn't — and the parts where it wasn't, we both got hurt quietly.",
      "I'd love for us to actually plan things. Set boundaries we genuinely keep. Know what to expect from each other — not as a rule, but as a way of caring better.",
      "I know I haven't always met your expectations. I want to change that. Planning with our happiness first, feeling content first — not winging it and hoping things don't take wrong turns. That's what I want for us.",
    ],
    interaction: { kind: "continue", label: "Me too" },
  },
  {
    id: "input-need",
    heading: "Now I want to hear you.",
    body: [
      "What do you need from me to feel more like yourself again? Say it plainly — I really want to know.",
    ],
    interaction: {
      kind: "input",
      prompt: "Type whatever's true.",
      placeholder: "I need…",
      storageKey: "need",
    },
  },
  {
    id: "input-you",
    video: "/videos/you.mp4",
    videoPoster: "/videos/you-poster.jpg",
    imageAlt: "You, being completely you",
    heading: "And one more.",
    body: [
      "What's something that's just yours — that makes you feel like you, with or without me?",
    ],
    interaction: {
      kind: "input",
      prompt: "There are no small answers here.",
      placeholder: "When I'm most myself, I'm…",
      storageKey: "yourself",
    },
  },
  {
    id: "ask",
    heading: "So — gently —",
    body: [
      "Can we try this, together? No pressure, no grand promises. Just a little more space, and a lot more honesty.",
    ],
    interaction: {
      kind: "choice",
      prompt: "However you feel is okay.",
      storageKey: "answer",
      options: [
        { label: "I would like to try but I need space first.", response: "Take all the space you need. I'll be here." },
        { label: "I need time to think about it.", response: "Take all the time you want. I'm not going anywhere." },
        { label: "Let's talk first.", response: "Yes. Whenever you're ready, I'm here." },
      ],
    },
  },
  {
    id: "finale",
    heading: `Thank you for reading, ${STORY_CONFIG.herName}.`,
    body: [
      "Whatever happens next, I want you to feel like the most 'you' you've ever been — and I want to be better for myself too.",
      "Here's what you told me along the way. I'm keeping it close.",
    ],
    surprise: "hearts",
    interaction: { kind: "finale", signoff: `Always, ${STORY_CONFIG.yourName}` },
  },
];
