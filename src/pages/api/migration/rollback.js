const { sql } = require("@vercel/postgres");
const { NextResponse } = require("next/server");

async function rollbackData() {
    try {
        await sql`DROP TABLE tradingToolApp_posts`;
        return NextResponse.json({ message: "Drop table tradingToolApp_posts succeeded!" }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 });
    }

};
rollbackData();
