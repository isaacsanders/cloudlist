/**
 * Created with JetBrains WebStorm.
 * User: FrancisMeng
 * Date: 14-2-8
 * Time: 上午7:56
 * To change this template use File | Settings | File Templates.
 */
exports.calculate_priority = function(criteria){
	return  criteria.upvote - criteria.downvote + 2*criteria.admin_upvote+ 2*criteria.starvation;
//		+ criteria.time_passed_percent*(criteria.upvote - criteria.downvote)
};