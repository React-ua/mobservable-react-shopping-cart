import {extendObservable, autorun} from 'mobservable';
import * as Utils from '../utils';

export class ShopModel {
	constructor(key) {
		extendObservable(this,{
			key,
			articles: [],
			activeArticleCount: () =>
				this.articles.reduce(
					(sum, article) => sum + (article.inStock ? 1 : 0),
					0
				)
			,
			soldOut: () => this.articles.length - this.activeArticleCount
		});

		this.readFromLocalStorage();
		this.subscribeLocalStorageToModel();
	}

	readFromLocalStorage(model) {
		this.articles = Utils.getDataFromLocalStore(this.key).map(
			data => Article.fromJson(this, data)
		);
	}

	subscribeLocalStorageToModel(model) {
		autorun(() =>
			Utils.storeDataToLocalStore(this.key, this.articles.map(article => article.toJson()))
		);
	}

	addArticle (name, price, inStock = true ) {
		let arr = this.articles;
		arr[arr.length] = new Article(this, Utils.uuid(), name, price, inStock); // Add a element at the end of the array is easy with push(), but this way is more performant.
	}

	toggleAll (checked) {
		this.articles.forEach(
			article => article.inStock = checked
		);
	}


	clearSoldOut () {
		this.articles = this.articles.filter(
			article => article.inStock
		);
	}
}

export class Article {
	constructor(store,id, name, price, inStock) {
			this.store = store;
			extendObservable(this,{id,name, price, inStock });
	}

	destroy() {
		this.store.articles.remove(this);
	}

	setName(name) {
		this.name = name;
	}

	toJson() {
		return {
			id: this.id,
			name: this.name,
			price: this.price,
			inStock: this.inStock
		};
	}

	static fromJson(store, json) {
		return new Article(store, json.id, json.name, json.price, json.inStock);
	}
}

var autoNumber = 0;

export function  ShoppingCartEntry (article){
		this.id = autoNumber++;
		extendObservable(this, {article: article, amount:1,
			price: function() {
		            return this.article ? this.article.price * this.amount : 0;
		        }
		})
	}

export function ShoppingCart (){
		extendObservable(this, {
			 entries: [],
			 total: function () {
					 return (this.entries.reduce(function(sum, entry) {
							 return sum + entry.price;
					 }, 0));
			 }
	 })
	}
