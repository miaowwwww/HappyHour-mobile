import { userHttpServer } from '../api/HttpServer.js';
import Toast from '../components/Toast.js';

/* 通过id 获取某用户 */
export const PERSON_FETCHBYID = 'PERSON_FETCHBYID';
export const personFetchById = (id) => (dispatch, getState) => {
	userHttpServer.personFetchById(id)
		.then( ({person}) => {
			const { user } = getState();
			if(user && user._id ) {
				person.isUser =  user._id == person._id;
				person.isFollow = (user.starUser.indexOf(person._id) > -1);
			}
			dispatch(personFetchByIdEnd(person))
		})
		.catch(err => Toast.show({text: err.toString()}))
}
function personFetchByIdEnd(person) {
	return {
		type: PERSON_FETCHBYID,
		person
	}
}

/* 关注、取消关注用户 */
export const PERSON_FOLLOW = 'PERSON_FOLLOW';
export const personFollow = (personId) => (dispatch, getState) => {
	const { user } = getState();
	dispatch(personFollowEnd(personId));
	userHttpServer.personFollow(user._id, personId)
		.then( ({ok}) => {Toast.show({text: ok, time: 500})})
		.catch( err => Toast.show({text: err.toString()}))
}
function personFollowEnd (personId) {
	return {
		type: PERSON_FOLLOW,
		personId
	}
}