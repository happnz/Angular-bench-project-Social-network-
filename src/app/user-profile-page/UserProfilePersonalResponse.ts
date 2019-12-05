import PostResponse from './PostResponse';
import FriendResponse from './FriendResponse';
import UserProfileForFriendsResponse from './UserProfileForFriendsResponse';
import {Relation} from './Relation';

export default class UserProfilePersonalResponse extends UserProfileForFriendsResponse {
    constructor(
        id: number,
        name: string,
        lastName: string,
        friends: FriendResponse[],
        posts: PostResponse[],
        public friendRequests: FriendResponse[]
    ) {
        super(id, name, lastName, friends, posts);
        this.relation = Relation.PERSONAL;
    }
}
