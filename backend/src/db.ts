require('dotenv').config();

import mongoose, { ConnectOptions, Document } from "mongoose";
const value = process.env.DATABASE_URI as string

mongoose.connect(value, {useNewUrlParser: true, useUnifiedTopology: true} as ConnectOptions)
    .then(() => console.log("Connected to MongoDB...."))
    .catch((err) => console.log("Could not connect to MongoDB...", err))

interface IUser extends Document {
    username: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

interface IContent extends Document {
    link: string,
    type: string,
    title: string,
    tags: mongoose.Types.ObjectId[],
    userId: mongoose.Types.ObjectId
}

const contentSchema = new mongoose.Schema<IContent>({
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Video", "Document", "Link", "Tweet"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true})

interface ITag extends Document {
    title: string
}

const tagSchema = new mongoose.Schema<ITag>({
    title: {
        type: String,
        required: true
    }
})

interface ILink extends Document {
    hash: string,
    type: string,
    userId: mongoose.Types.ObjectId
}

const linkSchema = new mongoose.Schema<ILink>({
    hash: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true})

export const User = mongoose.model<IUser>('User', userSchema)
export const Content = mongoose.model<IContent>('Content', contentSchema)
export const Tag = mongoose.model<ITag>('Tag', tagSchema)
export const Link = mongoose.model<ILink>('Link', linkSchema)