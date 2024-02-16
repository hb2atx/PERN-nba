const jsonschema = require("jsonschema");
const express = require("express");
const db = require("../db");
const router = express.Router();

/////////////// Define your routes here ///////////////////////

router.get("/", (req, res) => {
    res.send("Player Route");
  });

//////////// Get stats for a specific player by name //////////////////////////

router.get("/stats/:name", async function (req, res, next) {
    const playerName = decodeURIComponent(req.params.name.replace(/\+/g, ' '));

    try {
        const playerStats = await db.query(
            `SELECT * FROM players_stats WHERE players_name = $1`,
            [playerName]
        );

        if (playerStats.rows.length === 0) {
            return res.status(404).json({ message: `No stats found for the specified player: ${playerName}` });
        }

        const playerStatistics = playerStats.rows[0];

        return res.json({ player: playerStatistics });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;