import { pgTable, serial, text, varchar, date,timestamp } from "drizzle-orm/pg-core";

export const mockinterview = pgTable('mockinterview', {
    id: serial('id').primaryKey(),
    jsonMockresp: text('jsonMockResp').notNull(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdby: varchar('createby').notNull(),
    createdat: varchar('createdat'),
    mockid: varchar('mockid').notNull(),
});

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockidref: varchar('mockid').notNull(),
    question: varchar('question').notNull(),
    correctans: text('correctans'),
    userAnswer: text('userAnswer'),
    feedback: text('feedback'),
    rating: varchar('rating'),
    useremail: varchar('useremail'),
    createdat: varchar('createdat'),
    date: date('date').notNull(),
});

export const UserReviews = pgTable('user_reviews', {
    id: serial('id').primaryKey(),
    reviewText: text('review_text'),
    username: varchar('username', { length: 100 }),
    userEmail: varchar('user_email', { length: 100 }),
    avatarUrl: varchar('avatar_url', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow(),
  });