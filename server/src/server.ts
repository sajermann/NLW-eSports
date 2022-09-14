import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { convertHoursToMinutes } from "./utils/convertHoursToMinutes";
import { convertMinutesToHours } from "./utils/convertMinutesToHours";
const app = express();

app.use(cors());
app.use(express.json());
const prisma = new PrismaClient({ log: ["query"] });

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return res.json(games);
});

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      weekDays: body.weekDays.join(","),
      useVoiceChannel: body.useVoiceChannel,
      yearsPlaying: body.yearsPlaying,
      hourStart: convertHoursToMinutes(body.hourStart),
      hourEnd: convertHoursToMinutes(body.hourEnd),
      discord: body.discord,
    },
  });

  return res.status(201).json(ad);
});

app.get("/ads", (req, res) => {
  return res.json([]);
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
        hourStart: convertMinutesToHours(ad.hourStart),
        hourEnd: convertMinutesToHours(ad.hourEnd),
      };
    })
  );
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    where: {
      id: adId,
    },
  });

  return res.json({
    discord: ad.discord,
  });
});

app.listen(3333);
