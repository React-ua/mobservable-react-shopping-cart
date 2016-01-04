import {extendObservable} from 'mobservable';

export const ALL_ARTICLES = 'all';
export const ACTIVE_ARTICLES = 'active';
export const SOLDOUT_ARTICLES  = 'completed';
export const LAST_ARTICLES  = 'last';


export default class ViewModel {
	constructor() {
		extendObservable(this,{
			 articleBeingEdited: null,
			 articleFilter: ALL_ARTICLES
		});
	}
}
