import _ from 'lodash';
import cat from './utilities';


console.log(cat.say());

function component() {
	const element = document.createElement('div');
	const array = ['Hello', 'webpack', '!!'];
	element.innerHTML = _.join(array, ' ');
	return element;
}

document.body.appendChild(component());