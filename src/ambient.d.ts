
declare namespace API {
    type Health = {
        healthQuality: number;
        comments: Comment[];
    }

    type Comment = {
        isPositive: boolean;
        description: string;
    }

    type Branch = {
        name: string;
        health: Health;
        comments: Comment[];
    }

    type Repository = {
        id: number;
        name: string;
        branches: Branch[];
    }

    type PullRequest = {
        name: string;
        health: Health;
    }

}