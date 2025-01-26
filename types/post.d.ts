import { CommentLikes, Like, User,Comment } from "@prisma/client"

export type ExtendedPost = Post & { 
    author : User, 
    comments : Comment[], 
    likes : Like[]
    commentLikes : CommentLikes[]

}


export type ProfilePost = Post & { 
    followers : User[], 
    following : User[], 
    
    author : User, 
    comments : Comment[], 
    likes : Like[]
    commentLikes : CommentLikes[]
}
 