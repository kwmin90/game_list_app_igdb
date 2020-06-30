export class Item {
    id: number;
    cover: {
        id: number;
        url: string;
    };
    name: string;
    platforms: [{
        id: number;
        name: string;
    }];
    summary: string;
}