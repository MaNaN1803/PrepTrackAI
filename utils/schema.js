import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"

export const mockinterview=pgTable('mockinterview',{
    id:serial('id').primaryKey(),
    jsonMockresp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdby:varchar('createby').notNull(),
    createdat:varchar('createdat'),
    mockid:varchar('mockid').notNull(), 
})