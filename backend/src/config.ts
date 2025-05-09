
export function getShareId(userId: string){
    return `${userId}4P`
}

export function getHashAndType(hash: string){
    const userId = hash.split("4P")[0]
    
    return userId
}