// const sql = require('better-sqlite3');
// const db = sql('meals.db');
const { sql } = require("@vercel/postgres");
const { NextResponse } = require("next/server");
// import { NextResponse } from "next/server";

// initData();
async function createTableMeals() {
   try {
      const result = await sql`CREATE TABLE IF NOT EXISTS tradingToolApp_posts (
                  id SERIAL PRIMARY KEY,
                  slug VARCHAR(255) NOT NULL UNIQUE,
                  title VARCHAR(255) NOT NULL,
                  excerpt VARCHAR(255),
                  postFormat VARCHAR(255) NOT NULL,
                  featureImg VARCHAR(255) NOT NULL,
                  date DATE,
                  cate VARCHAR(255) NOT NULL,
                  cate_img VARCHAR(255),
                  cate_bg VARCHAR(255),
                  tags TEXT[],
                  content TEXT NOT NULL,
                  author_name VARCHAR(255),
                  author_desg VARCHAR(255),
                  author_img VARCHAR(255),
                  author_bio VARCHAR(255),
                  author_social TEXT[],
                  story BOOLEAN DEFAULT FALSE,
                  trending BOOLEAN DEFAULT FALSE,
                  post_views INT DEFAULT 0,
                  post_share INT DEFAULT 0
                );`;
      return NextResponse.json({ result }, { status: 200 });
   } catch (error) {
      console.log("create database tradingToolApp_posts error: " + error)
      return NextResponse.json({ error }, { status: 500 });
   }
};

// async function insertMockData() {
//    try {

//       for (const meal of dummyMeals) {
//          await sql`INSERT INTO kitchenApp_meals (slug, title, image, imageURL, summary, instructions, creator, creator_email) VALUES (
//          ${meal.slug},
//          ${meal.title},
//          ${meal.image},
//          ${meal.imageURL},
//          ${meal.summary},
//          ${meal.instructions},
//          ${meal.creator},
//          ${meal.creator_email}
//       )`;
//       }
//       console.log("success!")

//    } catch (error) {
//       console.log(error)
//       return NextResponse.json({ error }, { status: 500 });
//    }

//    const meals = await sql`SELECT * FROM kitchenApp_meals;`;
//    console.log(meals)
//    //   return NextResponse.json({ meals }, { status: 200 });
// };

async function initData() {
   try {
      await createTableMeals();
      // await insertMockData();
      return NextResponse.json({ message: "succeeded!" }, { status: 200 });
   } catch (error) {
      console.log(error)
      return NextResponse.json({ error }, { status: 500 });
   }
}

initData();