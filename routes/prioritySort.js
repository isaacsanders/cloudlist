var calculatePrior = require('./priorityCalculator');

module.exports = function(list){
	for(var i = 0; i < list.lenth; i++){
		var singleCriteria = list[i].criteria;
		list[i].priority =  calculatePrior(singleCriteria);
	}
	list.sort(function(a, b){return b.priority - a.priority});
	return list;
};