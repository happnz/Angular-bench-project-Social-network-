import UserProfileForUsersResponse from './UserProfileForUsersResponse';
import FriendResponse from './FriendResponse';
import {Relation} from './Relation';
import PostResponse from './PostResponse';

export default class UserProfileForFriendsResponse extends UserProfileForUsersResponse {
    constructor(
        id: number,
        name: string,
        lastName: string,
        friends: FriendResponse[],
        public posts: PostResponse[]
    ) {
        super(id, name, lastName, friends);
        this.relation = Relation.FRIEND;
    }
}
